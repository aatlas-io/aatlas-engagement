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

## Usage

```js
import InAppGuide, { AatlasProvider } from '@aatlas/engagement';

// ...

const App = () => {
  /**
   * Control when you want to show the inAppGuide
   */
  const [visible, setVisible] = useState(false);
  return (
    /**
     * Copy the 'appKey' and 'appSecret' from your Aatlas dashboard
     */
    <AatlasProvider appKey="<string>" appSecret="<string>">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button title="Open In app guide" onPress={() => setVisible(true)} />
        <InAppGuide visible={visible} setVisible={setVisible} /> // ----->>>>> Use
        the InAppGuide component and pass in the required props
      </View>
    </AatlasProvider>
  );
};
```

## Required dependencies

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info)

## License

MIT
