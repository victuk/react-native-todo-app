import { Pressable, Text, View } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
type Props = {
  title: string;
  backgroundColor: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
};
export const CustomButton = ({
  title,
  backgroundColor,
  onPress,
  color,
  disabled,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          paddingVertical: 10,
          backgroundColor: backgroundColor,
          borderRadius: 10,
          height: 50,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.5 : 1,
        },
        { opacity: disabled ? 0.4 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </Pressable>
  );
};
