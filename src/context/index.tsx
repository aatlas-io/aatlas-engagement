import React, { useContext, createContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AppState, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';
import isEqual from 'lodash.isequal';
import { ENGAGEMENT_API, IN_APP_GUIDE_SEEN_API, SEND_FEEDBACK_API, SET_USER_API } from '../constants';
import { aatlasFetch } from '../utils';

const AatlasServiceContext = createContext<ConfigType>({
  appConfig: null,
  setUser: async ({ user_id, name, email }) => {
    console.log({ user_id, name, email });
  },
  updateInAppGuidesSeenStatus: async (data) => {
    console.log(data);
  },
  resetInAppGuides: () => {},
  sendFeedback: async (data) => {
    console.log(data);
  },
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
  appKey,
  appSecret,
  children,
}: {
  appKey: string;
  appSecret: string;
  children: ReactNode;
}) => {
  const [appConfig, setAppConfig] = useState<AppConfigType | null>(null);
  const appState = useRef(AppState.currentState);
  const [userDetails, setUserDetails] = useState<{
    user_id?: string;
    name?: string;
    email?: string;
  }>({ user_id: '', name: '', email: '' });

  const resetInAppGuides = useCallback(() => {
    setAppConfig({ in_app_guides: [] });
  }, []);

  const setUser = useCallback(
    ({ user_id, name, email }: { user_id?: string; name?: string; email?: string }) => {
      setUserDetails({ user_id, name, email });
    },
    [setUserDetails]
  );

  const updateUser = useCallback(
    async ({ user_id = '', name = '', email = '' }: { user_id?: string; name?: string; email?: string }) => {
      await aatlasFetch({
        appKey,
        appSecret,
        url: SET_USER_API,
        body: {
          app_key: appKey,
          user_id,
          name,
          email,
          app_version: VersionCheck.getCurrentVersion(),
          platform: Platform.OS,
        },
        scope: 'updateUser',
      });
    },
    [appSecret, appKey]
  );

  const getAppConfig = useCallback(async () => {
    const data: AppConfigType = await aatlasFetch({
      appKey,
      appSecret,
      url: ENGAGEMENT_API,
      body: {
        app_key: appKey,
        app_version: VersionCheck.getCurrentVersion(),
        platform: Platform.OS,
      },
      scope: 'getAppConfig',
    });

    if (data) {
      if (!isEqual(data, appConfig)) {
        setAppConfig(data);
      }
    }

    if (userDetails?.user_id || userDetails?.name || userDetails?.email) {
      updateUser(userDetails);
    }
  }, [appConfig, appSecret, appKey, userDetails, updateUser]);

  const updateInAppGuidesSeenStatus = useCallback(
    async (data: InAppGuidesStatus) => {
      await aatlasFetch({
        appKey,
        appSecret,
        url: IN_APP_GUIDE_SEEN_API,
        body: {
          app_key: appKey,
          in_app_guide_ids: data,
          platform: Platform.OS,
        },
        scope: 'updateInAppGuidesSeenStatus',
      });
    },
    [appSecret, appKey]
  );

  const sendFeedback = useCallback(
    async ({ message, type }: FeedbackType) => {
      await aatlasFetch({
        appKey,
        appSecret,
        url: SEND_FEEDBACK_API,
        body: {
          app_key: appKey,
          message,
          type,
          platform: Platform.OS,
        },
        scope: 'sendFeedback',
      });
    },
    [appSecret, appKey]
  );

  useEffect(() => {
    if (!appConfig) {
      getAppConfig();
    }
  }, [appConfig, getAppConfig]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        getAppConfig();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [getAppConfig]);

  const values = useMemo(
    () => ({
      appConfig,
      updateInAppGuidesSeenStatus,
      setUser,
      resetInAppGuides,
      sendFeedback,
    }),
    [appConfig, updateInAppGuidesSeenStatus, setUser, resetInAppGuides, sendFeedback]
  );

  return <AatlasServiceContext.Provider value={values}>{children}</AatlasServiceContext.Provider>;
};
