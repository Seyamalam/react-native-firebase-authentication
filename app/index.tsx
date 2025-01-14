import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ActivityIndicator,
  Platform,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function signInWithPhoneNumber() {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      alert('Error sending code: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function confirmCode() {
    if (!confirm) return;
    setLoading(true);
    try {
      await confirm.confirm(code);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      alert('Invalid code: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (!confirm) {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.label}>Enter Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="e.g. +1 999-999-9999"
            keyboardType="phone-pad"
            autoComplete="tel"
          />
          {loading ? (
            <ActivityIndicator size={'small'} style={{ margin: 28 }} />
          ) : (
            <Button onPress={signInWithPhoneNumber} title="Send Verification Code" />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.label}>Enter Verification Code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          placeholder="Enter 6-digit code"
          autoComplete="one-time-code"
        />
        {loading ? (
          <ActivityIndicator size={'small'} style={{ margin: 28 }} />
        ) : (
          <Button onPress={confirmCode} title="Verify Code" />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
