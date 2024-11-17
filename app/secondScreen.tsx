import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function secondScreen() {
  const onPress = () => {
    // console.warn('pressed');
    router.back();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'blue' }}>
        Welcome to secondScreen
      </Text>
      <Button title="go to top" onPress={onPress} />
    </View>
  );
}
