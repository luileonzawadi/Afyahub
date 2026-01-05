import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Not tested');
  const [data, setData] = useState([]);

  const testConnection = async () => {
    try {
      setStatus('Testing...');
      
      // Test write
      await addDoc(collection(db, 'test'), {
        message: 'Firebase works!',
        timestamp: new Date()
      });
      
      // Test read
      const snapshot = await getDocs(collection(db, 'test'));
      const testData = snapshot.docs.map(doc => doc.data());
      
      setData(testData);
      setStatus('✅ Connected');
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Firebase Status: {status}</Text>
      <Button title="Test Firebase" onPress={testConnection} />
      <Text>Records: {data.length}</Text>
    </View>
  );
}