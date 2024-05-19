import React from 'react';
import { useConfigService } from '../useService';
import ModalView from './ModalView';

const InAppGuide = (props) => {
  const { appConfig } = useConfigService();

  if (!appConfig?.inAppGuide?.in_app_guides?.length) {
    return null;
  }

  return <ModalView appConfig={appConfig} {...props} />;
};

export default InAppGuide;
