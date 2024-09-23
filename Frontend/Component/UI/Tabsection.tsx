import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text, View} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../Profile';
import AddTodoForm from './AddTodoForm';
import ListingTodo from '../ListingTodo';
import {useState} from 'react';

const Tab = createMaterialBottomTabNavigator();

export function Tabsection() {
  const [render, setrender] = useState<Boolean>(false);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#1E2A5E"
      barStyle={{backgroundColor: '#55679C'}}>
      <Tab.Screen
        name="Feed"
        component={ListingTodo}
        initialParams={{userName: render}}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="addtodo"
        component={AddTodoForm}
        initialParams={{userName: render}}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <AntDesign name="pluscircle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
