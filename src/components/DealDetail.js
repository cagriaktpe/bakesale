import React from 'react';

import {Text, StyleSheet, View, Image, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.backLink} onPress={this.props.onBack}>
            Back
          </Text>
        </View>
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
          {this.state.deal.user && (
            <View style={styles.user}>
              <Image
                source={{uri: this.state.deal.user.avatar}}
                style={styles.avatar}
              />
              <Text>{this.state.deal.user.name}</Text>
            </View>
          )}
          <View style={styles.description}>
            <Text>{this.state.deal.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    marginTop: 40,
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
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
  avatar: {
    width: 60,
    height: 60,
  },
  user: {
    alignItems: 'center',
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dashed',
    margin: 10,
    padding: 10,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
    fontSize: 20,
  },
});

export default DealDetail;
