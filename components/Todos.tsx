import { FontAwesome } from '@expo/vector-icons';
import { ActionSheetIOS, FlatList, StyleSheet, Text, View } from 'react-native';
import { Action } from './Actions';
import { TodoItem } from './Todo';
export type Todos = {
  name: string;
  category: string;
  description: string;
  isCompleted: boolean;
};
type Props = {
  todos: Todos[];
};

const todos: Todos[] = [];

export const Todos = ({ todos }: Props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 20 }}
      data={todos}
      renderItem={({ item }) => <TodoItem item={item} />}
      contentContainerStyle={{
        gap: 20,
      }}
      ListEmptyComponent={() => (
        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 50 }}>
          You have no upcoming tasks
        </Text>
      )}
    />
  );
};
