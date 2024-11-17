import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Label } from '@/components/Label';
import { CustomButton } from './CustomButton';
import { useState } from 'react';
import { Todos } from './Todos';
import { useTodo } from '@/lib/zustand/UseTodo';

type Props = {
  closeBottomSheet: () => void;
};

export const Addtask = ({ closeBottomSheet }: Props) => {
  const [value, setValue] = useState('');
  const addTodo = useTodo((state) => state.addTodo);
  const [category, setCategory] = useState('Personal');
  const [description, setDescription] = useState('');
  const onSelectCategory = (cat: 'Personal' | 'Work') => {
    setCategory(cat);
  };
  const newTodo = {
    name: value,
    category,
    description,
    isCompleted: false,
  };
  const isValid = value.length > 2 && description.length > 2;
  const onAddTodo = () => {
    addTodo(newTodo);
    closeBottomSheet();
    setValue('');
    setDescription('');
  };
  const onCancel = () => {
    setValue('');
    setDescription('');
    closeBottomSheet();
  };
  const isActivePersonal = category === 'Personal' ? 'skyblue' : '#eee';
  const isActiveWork = category === 'Work' ? 'skyblue' : '#eee';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New task</Text>
      <View style={styles.divider} />
      <View style={styles.inputContainer} />
      <Label text="Title Task" />
      <TextInput
        style={styles.input}
        placeholder="Add Task Name"
        value={value}
        onChangeText={(text) => setValue(text)}
      />

      <View style={styles.inputContainer}>
        <Label text="Category" />
        <View style={styles.btnContainer}>
          <CustomButton
            onPress={() => onSelectCategory('Personal')}
            backgroundColor={isActivePersonal}
            title="Personal"
          />
          <CustomButton
            onPress={() => onSelectCategory('Work')}
            backgroundColor={isActiveWork}
            title="Work"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Label text="Description" />
        <TextInput
          style={styles.input}
          placeholder="Add Description"
          placeholderTextColor={'#ccc'}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          onPress={onCancel}
          backgroundColor="skyblue"
          title="Cancel"
        />
        <CustomButton
          onPress={onAddTodo}
          backgroundColor="#eee"
          title="Create"
          disabled={!isValid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    backgroundColor: '#ccc',
    width: '80%',
    marginHorizontal: 'auto',
    height: 2,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  btnContainer: { flexDirection: 'row', gap: 20, marginTop: 20 },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});
