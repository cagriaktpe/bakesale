import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});
  }

  setCurrentDeal = dealId => {
    this.setState({
      currentDealId: dealId,
    });
  };

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };

  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <SafeAreaView style={styles.safearea}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </SafeAreaView>
      );
    }
    if (this.state.deals.length > 0) {
      return (
        <SafeAreaView style={styles.safearea}>
          <DealList
            deals={this.state.deals}
            onItemPress={this.setCurrentDeal}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <Text style={styles.header}>Bakesale</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#eee',
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
