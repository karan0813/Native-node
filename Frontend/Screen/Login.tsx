import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import InputField from '../Component/UI/InputField';
import axios, {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../Context/ThemeProvider';
const Login = ({navigation}: any) => {
  const [state, setstate] = useContext(ThemeContext);
  const [Email, setEmail] = useState<string>('Nayana@gmail.com');
  const [Password, setPassword] = useState<string>('karankunal');
  const [loader, setloader] = useState(false);
  const handlesubmit = () => {
    setloader(true);
    if (!Email || !Password) {
      return Alert.alert('Fill the feilds');
    }
    axios
      .post('http://192.168.1.6:8080/Api/v1/auth/login', {
        email: Email,

        password: Password,
      })
      .then(async (res: AxiosResponse) => {
        console.log('res================================>', res);
        setstate(res.data);
        // await AsyncStorage.setItem('@userData', JSON.stringify(res.data));
        // Alert.alert('Alert!', res.data.message,);
        navigation.navigate('Home');
        setloader(false);
      })
      .catch(error => {
        console.log('eroor', error.response);
        Alert.alert(error.response.data.message);
        setloader(false);
      });
  };
  return (
    <>
      <View
        style={{
          height: '100%',
          backgroundColor: '#1E2A5E',
          position: 'relative',
        }}>
        <View
          style={{
            // flex: 1,
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7C93C3',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            position: 'absolute',
            width: '100%',
            bottom: 1,
            paddingBottom: 100,
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              textTransform: 'uppercase',
              position: 'absolute',
              top: -32,
            }}>
            Login
          </Text>
          <InputField
            Todo={false}
            InputTitle="Email"
            ValueState={Email}
            SetValue={setEmail}
          />
          <InputField
            Todo={false}
            InputTitle="Password"
            ValueState={Password}
            SetValue={setPassword}
          />

          {/* <Text>{JSON.stringify({ Name, Email, Password }, null, 4)}</Text> */}
          {loader ? (
            <TouchableOpacity
              onPress={handlesubmit}
              style={{
                backgroundColor: 'black',
                width: '90%',
                height: 50,
                borderRadius: 10,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', paddingTop: 15}}>Lodding...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlesubmit}
              style={{
                backgroundColor: 'black',
                width: '90%',
                height: 50,
                borderRadius: 10,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', paddingTop: 15}}>Submit</Text>
            </TouchableOpacity>
          )}

          <Text style={{paddingTop: 20}}>
            Don't Have Acount{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{
                color: 'red',
                cursor: 'pointer',
                textDecorationLine: 'underline',
              }}>
              REGISTER
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
