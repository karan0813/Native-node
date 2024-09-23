import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import InputField from './InputField';
import {ThemeContext} from '../../Context/ThemeProvider';
import axios from 'axios';

const AddTodoForm = ({navigation, setrender, render}: any) => {
  const [state, setstate, count, setCount] = useContext(ThemeContext);

  const [TodoTitle, setTodoTitle] = useState<string>('');
  const [TodoDiscription, setTodoDiscription] = useState<string>('');
  const [TodoUserID, setTodoUserID] = useState<string>(state.user._id || '');

  const handleTodoSubmit = () => {
    if (!TodoTitle || !TodoDiscription || !TodoUserID) {
      return Alert.alert('Please Fill the Todo');
    }
    axios
      .post('http://192.168.1.6:8080/Api/v1/Todo/addTodo', {
        TodoTitle,
        TodoUserID,
        TodoDiscription,
      })
      .then(res => {
        if (res.data.Success) {
          Alert.alert('Todo Added Successfully');

          navigation.navigate('Feed');
          setCount(count + 1);
          setTodoTitle('');
          setTodoDiscription('');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Somthing Went Wrong Please Try Latter');
      });
  };
  return (
    <View style={style.containerform}>
      <Text
        style={style.title}
        onPress={() => {
          console.log('=====', state.user._id);
        }}>
        Add Todos!
      </Text>

      <InputField
        InputTitle="Todo Title"
        ValueState={TodoTitle}
        SetValue={setTodoTitle}
        Todo={true}
      />
      <InputField
        InputTitle="Todo Discription"
        ValueState={TodoDiscription}
        SetValue={setTodoDiscription}
        Todo={true}
      />
      <TouchableOpacity style={style.btn} onPress={handleTodoSubmit}>
        <Text>Submit Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoForm;

const style = StyleSheet.create({
  btn: {
    backgroundColor: '#3A6D8C',
    padding: 10,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    marginVertical: 30,
  },
  containerform: {
    justifyContent: 'center',
    flex: 1,

    backgroundColor: '#6A9AB0',
    height: 'auto',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
