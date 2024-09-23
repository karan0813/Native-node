import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';

// @ts-ignore
import avatar from '../Assets/avatar.jpg';
import {ThemeContext} from '../Context/ThemeProvider';
import moment from 'moment';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputField from './UI/InputField';
import axios from 'axios';
type GetProfileParams = {
  email: string;
};

const Profile = () => {
  const [state, setstate] = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [Name, setName] = useState<string>();
  const [Email, setEmail] = useState<string>(state.user.email);
  const [Password, setPassword] = useState<string>('');

  const getprofile = async ({email}: GetProfileParams) => {
    const response = await axios.get(
      `http://192.168.1.6:8080/Api/v1/auth/getuser?email=${email}`,
    );

    setstate(response.data);
  };

  const upadteProfileData = async () => {
    // console.log(state.token);
    try {
      // const token = state.token;
      const data = await axios.put(
        'http://192.168.225.161:8080/Api/v1/auth/update-user',
        {
          email: Email,
          password: Password ? Password : undefined,
          name: Name ? Name : undefined,
        },
      );
      setModalVisible(!modalVisible);
      getprofile({email: data.data.user.email});
      setName('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.profilewrp}>
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
              <Text style={styles.modalText}>Edit Profile Details...! </Text>
              <TextInput
                value={Name}
                onChangeText={setName}
                placeholder={`Enter Name..`}
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  borderRadius: 10,
                  paddingStart: 10,
                  borderWidth: 1,
                  width: '100%',
                }}

                // secureTextEntry={InputTitle === 'Password' ? true : false}
              />
              <TextInput
                editable={false}
                value={Email}
                onChangeText={setEmail}
                placeholder={`Enter Email..`}
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  height: 60,
                  borderRadius: 10,
                  paddingStart: 10,
                  borderWidth: 1,
                  width: '100%',
                }}

                // secureTextEntry={InputTitle === 'Password' ? true : false}
              />
              <TextInput
                value={Password}
                onChangeText={setPassword}
                placeholder={`Enter Password..`}
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  height: 60,
                  borderRadius: 10,
                  paddingStart: 10,
                  borderWidth: 1,
                  width: '100%',
                }}
                secureTextEntry={true}
              />

              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#B6DBBF',
                }}>
                <Text style={{fontWeight: 800, fontSize: 15}}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => upadteProfileData()}
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#B6DBBF',
                }}>
                <Text style={{fontWeight: 800, fontSize: 15}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Text style={styles.ProfileTitle}>My Profile</Text> */}
        <View style={styles.profileCirucle}>
          <Image
            source={avatar}
            style={{
              objectFit: 'cover',
              height: 95,
              width: 95,
              borderRadius: 50,
            }}
          />
        </View>
      </View>
      <View
        style={{backgroundColor: '#0B8494', margin: 40, position: 'relative'}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            backgroundColor: 'gray',
            width: 30,
            height: 30,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            right: -8,
            top: -8,
          }}>
          <AntDesign name="edit" size={20} style={{padding: 2}} />
        </TouchableOpacity>

        <Text style={{padding: 10}}>
          <Text style={{fontWeight: 800}}>Name :</Text> {state.user.name}
        </Text>
        <Text style={{padding: 10}}>
          <Text style={{fontWeight: 800}}> Email : </Text>
          {state.user.email}
        </Text>
        <Text style={{padding: 10}}>
          <Text style={{fontWeight: 800}}>Role :</Text> {state.user.role}
        </Text>
        <Text style={{padding: 10}}>
          <Text style={{fontWeight: 800}}>User Created :</Text>
          {moment(state.user.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profilewrp: {
    backgroundColor: '#0B8494',
    padding: 20,
    height: 200,
    position: 'relative',
  },
  profileCirucle: {
    borderWidth: 20,
    borderColor: '#B4D6CD',
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -30,
    left: 50,
  },
  ProfileTitle: {
    fontSize: 20,
    // fontWeight: 600,
  },

  // modal style

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
    width: 400,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
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

export default Profile;
