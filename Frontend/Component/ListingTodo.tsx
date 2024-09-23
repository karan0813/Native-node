import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {ThemeContext} from '../Context/ThemeProvider';
import InputField from './UI/InputField';
export type TodoObj = {
  TodoTitle: string;
  TodoDiscription: string;
  _id: string;
};
type editvalues = {
  index: number;
  values: TodoObj;
};

export default function ListingTodo() {
  const [state, setstate, count, setCount] = useContext(ThemeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [AllTodos, setAllTodos] = useState<TodoObj[]>([]);
  const [EditView, setEditView] = useState<boolean>(false);
  const [editValue, seteditValue] = useState<editvalues>();
  const [editTodoTitle, seteditTodoTitle] = useState<string>('');
  const [editTodoDiscription, seteditTodoDiscription] = useState<string>('');

  const getAlltodos = () => {
    setLoading(true);
    axios
      .get(
        `http://192.168.1.6:8080/Api/v1/Todo/getTodosById?ID=${state.user._id}`,
      )
      .then(res => {
        const response = res.data.allTodos;
        setAllTodos(response);
        console.log('response==============>', response);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const Edittodo = () => {
    axios
      .put('http://192.168.1.6:8080/Api/v1/Todo/Edit-todo', {
        TodoTitle: editTodoTitle ? editTodoTitle : undefined,
        TodoDiscription: editTodoDiscription ? editTodoDiscription : undefined,
        TodoID: editValue?.values._id,
      })
      .then(res => {
        console.log(res.data);
        setEditView(false);
        getAlltodos();
        Alert.alert('Edited Todo Successfully !');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const DeleteTodo = (id: any) => {
    axios
      .delete(`http://192.168.1.6:8080/Api/v1/Todo/delete-todo?TodoID=${id}`)
      .then(res => {
        getAlltodos();
        Alert.alert('Deleted Todo Successfully !');
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAlltodos();
  }, [count]);
  return (
    <ScrollView>
      {Loading ? (
        <Text style={{textAlign: 'center'}}>Loding...</Text>
      ) : (
        <>
          {AllTodos.length > 0 ? (
            AllTodos.map((val, i: any) => (
              <View key={val?._id} style={styles.cardContainer}>
                {EditView && editValue?.index === i ? (
                  <>
                    <InputField
                      InputTitle="Todo Title"
                      ValueState={editTodoTitle}
                      SetValue={seteditTodoTitle}
                      Todo={true}
                    />
                    <InputField
                      InputTitle="Todo Discription"
                      ValueState={editTodoDiscription}
                      SetValue={seteditTodoDiscription}
                      Todo={true}
                    />
                  </>
                ) : (
                  <>
                    <Text onPress={() => console.log(val)} style={styles.Title}>
                      Title: {val?.TodoTitle}
                    </Text>
                    <Text style={styles.Discription}>
                      Discription: {val?.TodoDiscription}
                    </Text>
                  </>
                )}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    marginVertical: 20,
                  }}>
                  {!EditView ? (
                    <TouchableOpacity
                      onPress={() => {
                        setEditView(true);
                        seteditValue({index: i, values: val});
                        seteditTodoTitle(val.TodoTitle);
                        seteditTodoDiscription(val.TodoDiscription);
                      }}
                      style={{...styles.editBTN, backgroundColor: '#9DBDFF'}}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        Edittodo();
                      }}
                      style={{...styles.editBTN, backgroundColor: '#9DBDFF'}}>
                      <Text>Save</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      DeleteTodo(val._id);
                      console.log(editValue?.values.TodoTitle);
                    }}
                    style={{...styles.editBTN, backgroundColor: '#982B1C'}}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>No Data</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editBTN: {
    padding: 8,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#6CBEC7',
  },
  cardContainer: {
    backgroundColor: '#6A9AB0',
    padding: 20,
    margin: 10,
    borderWidth: 4,
    borderColor: '#3A6D8C',
    borderRadius: 2,
  },
  Title: {
    // textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
  },
  Discription: {
    fontSize: 16,
    fontWeight: '400',
  },
});
