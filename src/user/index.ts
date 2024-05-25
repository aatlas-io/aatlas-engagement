import { SET_USER_API } from '../constants';
import { globalData } from '../helpers';

export const setUser = async ({
  user_id,
  name = '',
  email = '',
}: {
  user_id: string;
  name?: string;
  email?: string;
}) => {
  const { getGlobalData } = globalData();

  if (!user_id) {
    console.error('user_id is required for Aatlas setUser');
  } else if (!getGlobalData()?.appSecret) {
    console.error(
      '@aatlas/engagement app is not initialized. Please follow the documentation'
    );
  } else {
    try {
      await fetch(SET_USER_API, {
        method: 'POST',
        headers: {
          'x-app-secret': getGlobalData()?.appSecret,
        },
        body: JSON.stringify({ user_id, name, email }),
      });
    } catch (error) {
      console.error('Aatlas setUser failed: ', error);
    }
  }

  return null;
};
