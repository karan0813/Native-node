import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../Context/ThemeProvider';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = ({navigation}: any) => {
  const [state, setstate] = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);

  //   let Data = JSON.parse(userData);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        // @ts-ignore
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');n
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Logout! Are You Sure... </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  navigation.navigate('Login');
                  setstate({});
                }}>
                Logout
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: 'white',
            height: 40,
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 800}}>
            {state.user.name.slice(0, 1)}
          </Text>
        </View>
        <Text style={{color: 'white'}}>Hello , {state.user.name} !</Text>
      </View>
      <FontAwesome5
        name="logout"
        size={25}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#55679C',
    padding: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Navbar;
