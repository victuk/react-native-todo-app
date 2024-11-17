import { Addtask } from '@/components/Addtask';
import { CustomButton } from '@/components/CustomButton';
import { NewButton } from '@/components/NewButton';
import { Todos } from '@/components/Todos';
import { useTodo } from '@/lib/zustand/UseTodo';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import moment from "moment";
import dayjs from "dayjs";

import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { SideMenu } from '@/components/SideMenu';

export default function Index() {
  const bottomSheetref = useRef<BottomSheet>(null);
  const todos = useTodo((state) => state.todo);

  const [showMenu, setShowMenu] = useState(false);

  const [category, setCategory] = useState('Personal');
  const snapShots = useMemo(() => ['25%', '50%', '90%'], []);
  const filteredTodos = useMemo(() => {
    return todos.filter(
      (todo) => todo.category.toLowerCase() === category.toLowerCase()
    );
  }, [todos, category]);

  const openBottomSheet = () => {
    bottomSheetref.current?.expand()
  };

  const aboutScreen = () => {
    router.push('/secondScreen');
  };
  const closeBottomSheet = () => {
    bottomSheetref.current?.close()
  };
  const isActivePersonal = category === 'Personal' ? 'skyblue' : '#eee';
  const isActiveWork = category === 'Work' ? 'skyblue' : '#eee';

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalFunction = setInterval(() => {
      setDate(new Date());
    }, 1000); // 1 second = 1000 milliseconds

    return () => {
      clearInterval(intervalFunction);
    }

  }, []);


  return (
    <View style={styles.container}>
      <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      <View style={styles.titleAndMenuContainer}>
        <Text style={styles.titleStyle}>Todo</Text>
        <Pressable onPress={() => {setShowMenu(true)}}>
          <MaterialCommunityIcons name="menu" color={'black'} size={24} />
        </Pressable>
      </View>
      <Text style={styles.today}>Today</Text>
      <Text style={styles.date}>{moment(date).format("LLLL")}</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Keep it up! Complete your tasks! You are almost there.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          onPress={() => setCategory('Personal')}
          backgroundColor={isActivePersonal}
          title="Personal"
        />
        <CustomButton
          onPress={() => setCategory('Work')}
          backgroundColor={isActiveWork}
          title="Work"
        />
      </View>
      <Todos todos={filteredTodos} />
      <NewButton onPress={openBottomSheet} />
      <BottomSheet
        ref={bottomSheetref}
        snapPoints={snapShots}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetScrollView style={{ flex: 1 }}>
          <Addtask closeBottomSheet={closeBottomSheet} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
  },
  today: {
    color: '#ccc',
    fontSize: 20,
  },
  date: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
  },
  card: {
    marginTop: 20,
    height: 150,
    width: '100%',
    backgroundColor: 'skyblue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardText: { fontSize: 25, color: 'white', fontWeight: '600' },
  btnContainer: { flexDirection: 'row', gap: 20, marginTop: 20 },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  titleAndMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  }
});
