export const globalData = (): GlobalDataReturnType => {
  let appData: GlobalDataType = { appId: 0, appSecret: '' };

  const getGlobalData = (): GlobalDataType => {
    return appData;
  };

  const setGlobalData = (data: GlobalDataType): void => {
    appData = data;
  };

  return {
    getGlobalData,
    setGlobalData,
  };
};
