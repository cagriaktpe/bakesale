import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

class DealItem extends React.Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.deal.key);
  };

  render() {
    return (
      <TouchableOpacity style={styles.deal} onPress={this.handlePress}>
        <Image source={{uri: this.props.deal.media[0]}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{this.props.deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{this.props.deal.cause.name}</Text>
            <Text style={styles.price}>
              {priceDisplay(this.props.deal.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default DealItem;
