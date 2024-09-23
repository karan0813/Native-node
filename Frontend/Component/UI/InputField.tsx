import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
type propsType = {
  InputTitle: string;
  ValueState: string;
  SetValue: (text: string) => void; // Updated type to accept a string
  Todo: boolean;
};

const InputField = ({InputTitle, ValueState, SetValue, Todo}: propsType) => {
  const width = Todo ? '100%' : '90%';
  return (
    <View style={{width, marginVertical: 3}}>
      <Text style={{marginVertical: 8, fontSize: 15, fontWeight: 400}}>
        {InputTitle}
      </Text>
      <TextInput
        value={ValueState}
        onChangeText={SetValue}
        placeholder={`Enter ${InputTitle}..`}
        style={{
          backgroundColor: 'white',
          height: 60,
          borderRadius: 10,
          paddingStart: 10,
        }}
        secureTextEntry={InputTitle === 'Password' ? true : false}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({});
