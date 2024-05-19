import React from 'react';
import { useConfigService } from '../configService';
import ModalView from './ModalView';

type InAppGuideProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InAppGuide = (props: InAppGuideProps) => {
  const { appConfig } = useConfigService();

  if (!appConfig?.inAppGuide?.in_app_guides?.length) {
    return null;
  }

  return <ModalView appConfig={appConfig} {...props} />;
};
