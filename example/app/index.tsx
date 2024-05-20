/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Button, StatusBar } from 'react-native';
import { ConfigProvider, InAppGuide } from '@aatlas/engagement';

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <ConfigProvider appEnvId={2} appSecret="bRtf2Lwr6WMZ_QYrM7rI4">
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button title="Open In app guide" onPress={() => setVisible(true)} />
        <InAppGuide visible={visible} setVisible={setVisible} />
      </View>
    </ConfigProvider>
  );
}
