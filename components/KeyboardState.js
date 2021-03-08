import { Keyboard, Platform } from 'react-native';
import React from 'react';

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends React.Component {
  constructor(props) {
    super(props);

    const { layout: { height } } = props;

    this.state = {
      contentHeight: height,
      keyboardHeight: 0,
      keyboardVisible: false,
      keyboardWillShow: false,
      keyboardWillHide: false,
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
    };
  }

    keyboardWillShow = (event) => {
      this.setState({ keyboardWillShow: true });
    };

    keyboardDidShow = () => {
      this.setState({
        keyboardWillShow: false,
        keyboardVisible: true,
      });
    };

    keyboardWillHide = (event) => {
      this.setState({ keyboardWillHide: true });
    };

    keyboardDidHide = () => {
      this.setState({
        keyboardWillHide: false,
        keyboardVisible: false,
      });
    };

    keyboardWillShow = (event) => {
      this.setState({ keyboardWillShow: true });
      this.measure(event);
    };

    keyboardDidShow = (event) => {
      this.setState({
        keyboardWillShow: false,
        keyboardVisible: true,
      });
      this.measure(event);
    };

    keyboardWillHide = (event) => {
      this.setState({ keyboardWillHide: true });
      this.measure(event);
    };

    render() {
      const { children, layout } = this.props;
      const {
        contentHeight,
        keyboardHeight,
        keyboardVisible,
        keyboardWillShow,
        keyboardWillHide,
        keyboardAnimationDuration,
      } = this.state;

      return children({
        containerHeight: layout.height,
        contentHeight,
        keyboardHeight,
        keyboardVisible,
        keyboardWillShow,
        keyboardWillHide,
        keyboardAnimationDuration,
      });
    }
}
