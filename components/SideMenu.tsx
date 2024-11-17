import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function SideMenu(props: any) {
  return (
    <View style={props.showMenu ? styles.container : styles.nodisplay}>
      <View style={styles.containerChild}>
        <Pressable
          onPress={() => {
            props.setShowMenu(false);
          }}
        >
          <FontAwesome name="close" size={24} color="black" />
        </Pressable>
        <View style={styles.sidebarButtonList}>
          <Text style={styles.sidebarButton}>Home</Text>
          <Text style={styles.sidebarButton}>About</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nodisplay: {
    display: "none",
  },
  container: {
    display: "flex",
    flex: 0,
    width: Dimensions.get("window").width,
    height: "100%",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  containerChild: {
    width: 300,
    backgroundColor: "white",
    height: "100%",
    gap: 40,
    padding: 20,
  },
  sidebarButtonList: {
    gap: 10,
  },
  sidebarButton: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
