import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native';
import React from 'react';

export default class Grid extends React.Component {

  renderGridItem = (info) => {
    const { index } = info;
    const { numColumns, itemMargin, renderItem } = this.props;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  };

  render() {
    return (
      <FlatList {...this.props} renderItem={this.renderGridItem} />
    );
  }
}
