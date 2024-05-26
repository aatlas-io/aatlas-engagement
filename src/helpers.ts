import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ANONYMOUS_USER_ID_KEY } from './constants';

export const globalData = (): GlobalDataReturnType => {
  let allData: GlobalDataType = {
    appId: 0,
    appSecret: '',
    anonymousUserId: '',
  };

  let appData: AppDataType = {
    appId: 0,
    appSecret: '',
  };

  const getGlobalData = (): GlobalDataType => {
    return allData;
  };

  const setAppData = (data: AppDataType): void => {
    appData = data;
  };

  const getAnonymousUserId = async (): Promise<string> => {
    let value = await AsyncStorage.getItem(ANONYMOUS_USER_ID_KEY);
    if (!value) {
      value = uuid.v4() as string;
      await AsyncStorage.setItem(ANONYMOUS_USER_ID_KEY, value);
    }
    allData = { ...appData, anonymousUserId: value };

    return value;
  };

  return {
    getGlobalData,
    setAppData,
    getAnonymousUserId,
  };
};
