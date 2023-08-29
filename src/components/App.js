import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <Text style={styles.header}>Helloo</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default App;
