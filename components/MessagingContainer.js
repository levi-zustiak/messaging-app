import {
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from 'react-native';
import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const INPUT_METHOD = {
  NONE: 'NONE',
  KEYBOARD: 'KEYBOARD',
  CUSTOM: 'CUSTOM',
};

export default class MessagingContainer extends React.Component {
  static defaultProps = {
    children: null,
    onChangeInputMethod: () => {},
  };

  componentDidUpdate(prevProps) {
    const { onChangeInputMethod } = this.props;

    if (this.props.keyboardVisible && !prevProps.keyboardVisible) {
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      !this.props.keyboardVisible &&
      prevProps.keyboardVisible &&
      this.props.inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    const { keyboardAnimationDuration } = this.props;

    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android'
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      );
      LayoutAnimation.configureNext(animation);
  }

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { onChangeInputMethod, inputMethod } = this.props;

        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }

        return false;
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide,
    } = this.props;

    const useContentHeight =
      keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

    const containerStyle = {
      height: useContentHeight ? contentHeight: containerHeight,
    };

    const showCustomInput =
      inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0,
      marginTop:
        isIphoneX() && (keyboardIsHidden || keyboardIsHiding)
          ? 24
          : 0,
    };

    const keyboardIsHidden =
      inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;

    const keyboardIsHiding =
      inputMethod === INPUT_METHOD.KEYBOARD && keyboardWillHide;

    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}
