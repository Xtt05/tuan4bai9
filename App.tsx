import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface User {
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(data => setUser(data as User))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.container}><Text>Đang tải...</Text></View>;
  if (!user) return <View style={styles.container}><Text>Không tìm thấy user</Text></View>;

  return <View style={styles.container}><Text style={styles.text}>Tên: {user?.name}</Text></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});