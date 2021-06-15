import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

const ErrorHandler = ({ errorMessage ='Error Occurred', showError, onReload }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.item}
      >
        <Text h3 style={styles.title}>
          {errorMessage}
        </Text>
        <Text  h4 style={styles.title}>
          {showError}
        </Text>
        <Button
          onPress={()=>onReload && onReload()}
          title="Reload"
          color="red"
          accessibilityLabel="reload button"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
      },
    item: {
        width: 300,
        // border: '1px solid red',
        textAlign: 'center',
        padding: 10,
      },
    title: { textTransform: 'uppercase', fontWeight: '500', marginBottom: 10 },
  });
export default ErrorHandler;
