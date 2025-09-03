import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>My Expo App</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Welcome!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          {name ? (
            <Text style={styles.greeting}>Hello, {name}! 👋</Text>
          ) : null}
        </View>

        {/* Counter Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Counter</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => setCount(count - 1)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.counterText}>{count}</Text>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={() => setCount(0)}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Todo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todo List</Text>
          
          <View style={styles.todoInputContainer}>
            <TextInput
              style={[styles.input, styles.todoInput]}
              placeholder="Add a new todo"
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmitEditing={addTodo}
            />
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={addTodo}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {todos.map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <TouchableOpacity
                style={styles.todoTextContainer}
                onPress={() => toggleTodo(todo.id)}
              >
                <Text style={[
                  styles.todoText,
                  todo.completed && styles.todoTextCompleted
                ]}>
                  {todo.completed ? '✓ ' : '○ '}{todo.text}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTodo(todo.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {todos.length === 0 && (
            <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  greeting: {
    marginTop: 10,
    fontSize: 16,
    color: '#2196F3',
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 30,
    color: '#333',
    minWidth: 50,
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
  },
  buttonSecondary: {
    backgroundColor: '#FF5722',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  todoInputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  todoInput: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
});