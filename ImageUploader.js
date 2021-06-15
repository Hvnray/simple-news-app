import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import logo from './assets/icon.png';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // let pickerResult = await ImagePicker.launchImageLibraryAsync();
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: 'Images',
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    console.log(pickerResult);
    setSelectedImage(pickerResult);
  };
  return (
    <View style={styles.container}>
      <Image
        source={selectedImage ? { uri: selectedImage?.uri } : logo}
        style={{
          width: 350,
          height: 250,
        }}
      />
      <Text style={styles.text}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={styles.text}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 12 }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#888', fontSize: 18, textAlign: 'center', padding: 10 },
});
