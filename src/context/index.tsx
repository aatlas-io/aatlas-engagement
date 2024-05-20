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

const ConfigServiceContext = createContext<ConfigType>({
  appConfig: null,
});

ConfigServiceContext.displayName = 'useConfigServiceContext';

export const useConfigService = () => {
  const context = useContext(ConfigServiceContext);

  if (!context) {
    throw new Error('Children should be wrapped inside ConfigProvider');
  }

  return context;
};

export const ConfigProvider = ({
  appEnvId,
  appSecret,
  children,
}: {
  appEnvId: number;
  appSecret: string;
  children: ReactNode;
}) => {
  const [appConfig, setAppConfig] = useState<AppConfigType | null>(null);
  const appState = useRef(AppState.currentState);

  const getAppConfig = useCallback(async () => {
    if (!appEnvId || !appSecret) {
      Alert.alert('Error', 'Invalid appEnvId or appSecret', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      try {
        const response = await fetch(
          'https://fbc3-2600-1700-8d70-14b0-e148-3f3d-889b-b633.ngrok-free.app/api/engagement',
          {
            method: 'POST',
            headers: {
              'x-app-secret': appSecret,
            },
            body: JSON.stringify({ app_env_id: appEnvId }),
          }
        );
        const json: AppConfigType = await response.json();
        if (!isEqual(json, appConfig)) {
          setAppConfig(json);
        }
      } catch (error) {
        console.error('Failed to fetch engagement config: ', error);
      }
    }
  }, [appConfig, appSecret, appEnvId]);

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
    <ConfigServiceContext.Provider value={values}>
      {children}
    </ConfigServiceContext.Provider>
  );
};
