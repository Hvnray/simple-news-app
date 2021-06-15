import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import logo from './assets/icon.png';
import News from './pages/News/index';
import OneNews from './pages/News/OneNews';
import AddNews from './pages/News/AddNews';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

import store from './rematch';

const Stack = createStackNavigator();

function Route() {
  return (
    <NavigationContainer initialRouteName="News">
      <Stack.Navigator>
        <Stack.Screen
          name="News"
          component={News}
          options={{
            title: 'News App',
          }}
        />
        <Stack.Screen
          name="OneNews"
          component={OneNews}
          options={({ route }) => ({ title: route.params?.item?.title })}
        />
        <Stack.Screen
          name="AddNews"
          component={AddNews}
          options={{
            title: 'Add News',
          }}
          options={({ route }) => ({
            title: route.params?.item ? 'Edit News' : 'Add News',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // text: { color: '#888', fontSize: 18, textAlign: 'center', padding: 10 },
});
