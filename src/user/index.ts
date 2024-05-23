import { SET_USER_API } from '../constants';
import { globalData } from '../helpers';

export const setUser = async ({
  id,
  name = '',
  email = '',
}: {
  id: any;
  name?: string;
  email?: string;
}) => {
  const { getGlobalData } = globalData();

  if (!id) {
    console.error('Id is required for setUser');
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
        body: JSON.stringify({ id, name, email }),
      });
    } catch (error) {
      console.error('setUser failed: ', error);
    }
  }

  return null;
};
