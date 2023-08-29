import React from 'react';

import {Text, StyleSheet, View, Image, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

class DealDetail extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
  };

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.deal}>
          <Image
            source={{uri: this.state.deal.media[0]}}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{this.state.deal.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.cause}>{this.state.deal.cause.name}</Text>
              <Text style={styles.price}>
                {priceDisplay(this.state.deal.price)}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
});

export default DealDetail;
