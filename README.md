# @aatlas/engagement

Enhance feature awareness and drive success with our advanced nudging platform. Aatlas is a powerful tool designed to boost engagement for your newly launched feature.

## Installation

```sh
npm install @aatlas/engagement
```

or

```sh
yarn add @aatlas/engagement
```

<br/>

##### Required dependencies

Bare React Native

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

Expo

- [react-native-reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- [react-native-gesture-handler](https://docs.expo.dev/versions/latest/sdk/gesture-handler/)
- [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)

## Usage

```js
import InAppGuide, { ConfigProvider } from '@aatlas/engagement';

// ...

export default function Index() {
  /**
   * Control when you want to show the inAppGuide
   */
  const [visible, setVisible] = useState<boolean>(false);
  return (
    /**
     * Copy the 'appEnvId' and 'appSecret' from your Aatlas dashboard
     */
    <ConfigProvider appEnvId={<number>} appSecret="<string>">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button title="Open In app guide" onPress={() => setVisible(true)} />
        /**
         *  Use the InAppGuide component and pass in the required props
         */
        <InAppGuide visible={visible} setVisible={setVisible} />
      </View>
    </ConfigProvider>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
