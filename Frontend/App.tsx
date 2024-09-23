// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {enableScreens} from 'react-native-screens';
import Register from './Screen/Register';
import Login from './Screen/Login';
import Home from './Screen/Home';
import {ThemeProvider} from './Context/ThemeProvider';

enableScreens(true);

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <View style={{flex: 1}}>
    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
    // </View>
  );
}

export default App;
