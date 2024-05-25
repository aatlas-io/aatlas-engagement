/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Button, StatusBar } from 'react-native';
import InAppGuide, { AatlasProvider } from '@aatlas/engagement';

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <AatlasProvider appId={0} appSecret="">
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
    </AatlasProvider>
  );
}
