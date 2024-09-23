import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import InputField from '../Component/UI/InputField';
import axios, {AxiosResponse} from 'axios';

const Register = ({navigation}: any) => {
  const [Name, setName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [loader, setloader] = useState(false);
  const handlesubmit = () => {
    setloader(true);
    if (!Name || !Email || !Password) {
      return Alert.alert('Fill the feilds');
    }
    axios
      .post('http://192.168.1.6:8080/Api/v1/auth/register', {
        email: Email,
        name: Name,
        password: Password,
      })
      .then((res: AxiosResponse) => {
        console.log('res================================>', res);
        Alert.alert('Alert!', res.data.message, navigation.navigate('Home'));
        setloader(false);
      })
      .catch(error => {
        console.log('eroor', error.response);
        Alert.alert(error.response.data.message);
        setloader(false);
      });
  };
  return (
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
            top: -32,
          }}>
          Register
        </Text>
        <InputField
          Todo={false}
          InputTitle="Name"
          ValueState={Name}
          SetValue={setName}
        />
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

        <Text>
          Already Acount{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: 'red',
              cursor: 'pointer',
              textDecorationLine: 'underline',
            }}>
            LOGIN
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;
