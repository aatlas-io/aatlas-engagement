import { getVersion } from 'react-native-device-info';
import { SET_USER_API } from '../constants';
import { globalData } from '../helpers';

export const setUser = async ({
  user_id = '',
  name = '',
  email = '',
}: {
  user_id?: string;
  name?: string;
  email?: string;
}) => {
  const { getGlobalData } = globalData();

  try {
    let { appId, appSecret, anonymousUserId } = getGlobalData();
    if (!appSecret) {
      throw new Error(
        '@aatlas/engagement app is not initialized. Please follow the documentation'
      );
    }

    if (!anonymousUserId) {
      throw new Error('Organization user does not exist');
    }

    await fetch(SET_USER_API, {
      method: 'POST',
      headers: {
        'x-app-secret': appSecret,
      },
      body: JSON.stringify({
        app_id: appId,
        user_id,
        name,
        email,
        anonymous_user_id: anonymousUserId,
        app_version: getVersion(),
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Aatlas setUser failed: ', error.message);
    } else {
      console.error('Aatlas setUser failed: ', error);
    }
  }

  return null;
};
