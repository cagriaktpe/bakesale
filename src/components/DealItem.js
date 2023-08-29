import React from 'react';

import {Text, StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

class DealItem extends React.Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View>
        <Image source={{uri: this.props.deal.media[0]}} style={styles.image} />
        <View>
          <Text>{this.props.deal.title}</Text>
          <Text>{priceDisplay(this.props.deal.price)}</Text>
          <Text>{this.props.deal.cause.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
});

export default DealItem;
