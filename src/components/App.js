import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';

class App extends React.Component {
  state = {
    deals: [],
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});
  }

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          {this.state.deals.length > 0 ? (
            <DealList deals={this.state.deals} />
          ) : (
            <Text style={styles.header}>Bakesale</Text>
          )}
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
