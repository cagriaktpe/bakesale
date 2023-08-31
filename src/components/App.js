// system imports
import React from 'react';

// react-native imports
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';

// third-party imports
import ajax from '../ajax';

// components
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {
  titleXPos = new Animated.Value(0);

  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  };

  animeTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2 - 40),
      duration: 1000,
    }).start(({finished}) => {
      if (finished) {
        this.animeTitle(-1 * direction);
      }
    });
  };

  async componentDidMount() {
    this.animeTitle();
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

  searchDeals = async searchTerm => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
    }
    this.setState({dealsFromSearch});
  };

  clearSearch = () => {
    this.setState({dealsFromSearch: []});
  };

  dealsToDisplay = () => {
    return this.state.dealsFromSearch.length > 0
      ? this.state.dealsFromSearch
      : this.state.deals;
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
    if (this.dealsToDisplay().length > 0) {
      return (
        <SafeAreaView style={styles.safearea}>
          <SearchBar
            searchDeals={this.searchDeals}
            initialSearchTerm={''}
            clearSearch={this.clearSearch}
          />
          <View style={styles.container}>
            <DealList
              deals={this.dealsToDisplay()}
              onItemPress={this.setCurrentDeal}
            />
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.safearea}>
        <Animated.View style={[{left: this.titleXPos}, styles.container]}>
          <Text style={styles.header}>Bakesale</Text>
        </Animated.View>
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
