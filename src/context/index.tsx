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
import { getVersion } from 'react-native-device-info';
import isEqual from 'lodash.isequal';
import { ENGAGEMENT_API } from '../constants';
import { globalData } from '../helpers';

const { setAppData, getAnonymousUserId } = globalData();

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
  setAppData({ appId, appSecret });

  const getAppConfig = useCallback(async () => {
    if (!appId || !appSecret) {
      Alert.alert('Error', 'Invalid appEnvId or appSecret', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      try {
        const anonymous_user_id = await getAnonymousUserId();
        const response = await fetch(ENGAGEMENT_API, {
          method: 'POST',
          headers: {
            'x-app-secret': appSecret,
          },
          body: JSON.stringify({
            app_id: appId,
            app_version: getVersion(),
            anonymous_user_id,
          }),
        });

        const json: AppConfigType = await response.json();

        if (!response.ok) {
          throw new Error(JSON.stringify(json));
        }

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
