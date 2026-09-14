import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

interface Post {
  userId: number;
  id: number;
  title: string;
  completd: boolean;
}
export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchTodos = async (): Promise<Post[]> => {
    const res = await fetch ('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data as Post[];
  };
  useEffect(() => {
    fetchTodos().then((result) => setPosts(result));
  }, []);
  return (
    <FlatList
      data={posts}
      keyExtractor = {(item) => item.id.toString()}
      renderItem = {({item}) => (
        <View style={styles.item}>
          <Text> {item.title}</Text>
        </View>
      )}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor :'#eee',
  },
});
