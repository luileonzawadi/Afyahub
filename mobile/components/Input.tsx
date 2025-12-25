import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email';
  name?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input = ({ label, type = 'text', value, onChangeText, placeholder, error, required, editable = true, keyboardType, multiline, numberOfLines }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={[styles.input, multiline && { height: (numberOfLines || 1) * 40 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType || (type === 'email' ? 'email-address' : 'default')}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    padding: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;