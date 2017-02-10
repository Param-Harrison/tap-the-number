/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { observer } from 'mobx-react/native';
import { LayoutAnimation } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import CustomText from 'src/components/CustomText';
import colorUtils from 'src/utils/colorUtils';
import metrics from 'src/config/metrics';
import audioService from 'src/services/audio';
import styles from './index.style';

type DefaultProps = {
  depth: number,
  borderRadius: number,
  isEnabled: boolean,
};

type Props = {
  depth: number,
  isEnabled?: boolean,
  backgroundColor: string,
  borderRadius: number,
  text: string | number,
  textStyle?: any,
  onPressIn?: () => any,
  onPressOut?: () => any,
  delay?: number,
  style?: any,
};

type State = {
  isTouched: boolean,
};

@observer
export default class BoardTile extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    depth: metrics.TILE_SHADOW_DEPTH,
    borderRadius: metrics.TILE_BORDER_RADIUS,
    isEnabled: true,
    delay: 0,
  };

  state = {
    isTouched: false,
  };

  _containerRef = null;

  getContainerRef = () => this._containerRef;

  _handlePressIn = () => {
    if (!this.props.isEnabled) return;
    audioService.playSuccessSound();
    LayoutAnimation.spring();
    this.setState({ isTouched: true });
    if (this.props.onPressIn) {
      this.props.onPressIn();
    }
    return true;
  };

  _handlePressOut = () => {
    if (this.props.onPressOut) {
      this.props.onPressOut();
    }
    this.setState({ isTouched: false });
  };

  render() {
    const {
      depth,
      borderRadius,
      backgroundColor,
      text,
      textStyle,
      style,
      ...otherProps
    } = this.props;
    const { isTouched } = this.state;
    const halfDepth = depth / 2;
    const tileStyle = {
      marginTop: isTouched ? depth : halfDepth,
      backgroundColor,
      borderRadius,
    };
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2),
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    };
    return (
      <TouchableWithoutFeedback
        onPressIn={this._handlePressIn}
        onPressOut={this._handlePressOut}
        delayPressIn={0}
      >
        <View
          ref={ref => {
            this._containerRef = ref;
          }}
          {...otherProps}
        >
          <View style={[styles.tile, tileStyle, style]}>
            <CustomText style={[styles.text, textStyle]} withShadow={true}>
              {text}
            </CustomText>
          </View>
          <View style={[styles.depth, depthStyle]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
