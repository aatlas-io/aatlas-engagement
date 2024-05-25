import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import { AppState, Alert } from 'react-native';
import isEqual from 'lodash.isequal';
import { ENGAGEMENT_API } from '../constants';
import { globalData } from '../helpers';

const { setGlobalData } = globalData();

const AatlasServiceContext = createContext<ConfigType>({
  appConfig: null,
});

AatlasServiceContext.displayName = 'useAatlasServiceContext';

export const useAatlasService = () => {
  const context = useContext(AatlasServiceContext);

  if (!context) {
    throw new Error('Children should be wrapped inside AatlasProvider');
  }

  return context;
};

export const AatlasProvider = ({
  appId,
  appSecret,
  children,
}: {
  appId: number;
  appSecret: string;
  children: ReactNode;
}) => {
  const [appConfig, setAppConfig] = useState<AppConfigType | null>(null);
  const appState = useRef(AppState.currentState);
  setGlobalData({ appId, appSecret });

  const getAppConfig = useCallback(async () => {
    if (!appId || !appSecret) {
      Alert.alert('Error', 'Invalid appEnvId or appSecret', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      try {
        const response = await fetch(ENGAGEMENT_API, {
          method: 'POST',
          headers: {
            'x-app-secret': appSecret,
          },
          body: JSON.stringify({ id: appId }),
        });
        const json: AppConfigType = await response.json();
        if (!isEqual(json, appConfig)) {
          setAppConfig(json);
        }
      } catch (error) {
        console.error('Failed to fetch engagement config: ', error);
      }
    }
  }, [appConfig, appSecret, appId]);

  useEffect(() => {
    if (!appConfig) {
      getAppConfig();
    }
  }, [appConfig, getAppConfig]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getAppConfig();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [getAppConfig]);

  const values = useMemo(() => ({ appConfig }), [appConfig]);

  return (
    <AatlasServiceContext.Provider value={values}>
      {children}
    </AatlasServiceContext.Provider>
  );
};
