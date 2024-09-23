import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../Component/Navbar';
import {Tabsection} from '../Component/UI/Tabsection';
// import Tabsection from '../Component/UI/Tabsection';

const Home = ({navigation}: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <Navbar navigation={navigation} />
      <Tabsection />
    </View>
  );
};

export default Home;
