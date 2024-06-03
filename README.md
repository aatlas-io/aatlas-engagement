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
import InAppGuide, { AatlasProvider, useAatlasService } from '@aatlas/engagement';

// ...

const UserProfile = () => {
  const { setUser } = useAatlasService();

  useEffect(() => {
    setUser({
      user_id: 'XXXX',
      name: 'John Doe',
      email: 'john.doe@test.com',
    });
  }, [setUser]);

  return (
    <View>
      <Text>Set user</Text>
    </View>
  );
};

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
        <InAppGuide visible={visible} setVisible={setVisible} /> // Use the InAppGuide component with the required props
        <UserProfile /> // setUser usage
      </View>
    </AatlasProvider>
  );
};
```

## Required dependencies

- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)
- [react-native-version-check](https://github.com/kimxogus/react-native-version-check)

## License

MIT
