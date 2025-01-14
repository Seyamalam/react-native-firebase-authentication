import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const Page = () => {
  const user = auth().currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back!</Text>
      <Text style={styles.phone}>Phone: {user?.phoneNumber}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  phone: {
    fontSize: 16,
    marginBottom: 24,
  },
});

export default Page;
