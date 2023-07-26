import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import EditPostScreen from "./src/screens/EditPostScreen";
import ListViewScreen from "./src/screens/ListViewScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import { store } from "./src/store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="ListView" component={ListViewScreen} options={{ title: 'Posts' }} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Post details' }} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
