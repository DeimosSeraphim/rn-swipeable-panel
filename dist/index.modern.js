import React__default, { createElement, Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback, ScrollView, TouchableHighlight, PanResponder } from 'react-native';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

var Bar = function Bar(_ref) {
  var barStyle = _ref.barStyle;
  return /*#__PURE__*/createElement(View, {
    style: BarStyles.barContainer
  }, /*#__PURE__*/createElement(View, {
    style: [BarStyles.bar, barStyle]
  }));
};
var BarStyles = StyleSheet.create({
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bar: {
    width: '10%',
    height: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#e2e2e2'
  }
});

var Close = function Close(_ref) {
  var _onPress = _ref.onPress,
    rootStyle = _ref.rootStyle,
    iconStyle = _ref.iconStyle;
  return /*#__PURE__*/createElement(TouchableOpacity, {
    activeOpacity: 0.5,
    onPress: function onPress() {
      return _onPress();
    },
    style: [CloseStyles.closeButton, rootStyle]
  }, /*#__PURE__*/createElement(View, {
    style: [CloseStyles.iconLine, iconStyle, {
      transform: [{
        rotateZ: '45deg'
      }]
    }]
  }), /*#__PURE__*/createElement(View, {
    style: [CloseStyles.iconLine, iconStyle, {
      transform: [{
        rotateZ: '135deg'
      }]
    }]
  }));
};
var CloseStyles = StyleSheet.create({
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#e2e2e2',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconLine: {
    position: 'absolute',
    width: 18,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white'
  }
});

var FULL_HEIGHT = Dimensions.get('window').height;
var FULL_WIDTH = Dimensions.get('window').width;
var PANEL_HEIGHT = FULL_HEIGHT - 100;
var STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2
};
var SwipeablePanel = /*#__PURE__*/function (_Component) {
  function SwipeablePanel(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.componentDidMount = function () {
      var _this$props = _this.props,
        isActive = _this$props.isActive,
        openLarge = _this$props.openLarge,
        onlyLarge = _this$props.onlyLarge,
        onlySmall = _this$props.onlySmall;
      _this.animatedValueY = 0;
      _this.state.pan.y.addListener(function (value) {
        return _this.animatedValueY = value.value;
      });
      _this.setState({
        isActive: isActive
      });
      if (isActive) _this._animateTo(onlySmall ? STATUS.SMALL : openLarge ? STATUS.LARGE : onlyLarge ? STATUS.LARGE : STATUS.SMALL);
      Dimensions.addEventListener('change', _this._onOrientationChange);
    };
    _this._onOrientationChange = function () {
      var dimesions = Dimensions.get('screen');
      FULL_HEIGHT = dimesions.height;
      FULL_WIDTH = dimesions.width;
      PANEL_HEIGHT = FULL_HEIGHT - 100;
      _this.setState({
        orientation: dimesions.height >= dimesions.width ? 'portrait' : 'landscape',
        deviceWidth: FULL_WIDTH,
        deviceHeight: FULL_HEIGHT,
        panelHeight: PANEL_HEIGHT
      });
      _this.props.onClose();
    };
    _this._animateTo = function (newStatus) {
      if (newStatus === void 0) {
        newStatus = 0;
      }
      var smallPanelHeight = _this.props.smallPanelHeight;
      var newY = 0;
      if (newStatus === STATUS.CLOSED) newY = PANEL_HEIGHT;else if (newStatus === STATUS.SMALL) newY = _this.state.orientation === 'portrait' ? FULL_HEIGHT - (smallPanelHeight != null ? smallPanelHeight : 400) : FULL_HEIGHT / 3;else if (newStatus === STATUS.LARGE) newY = 0;
      _this.setState({
        showComponent: true,
        status: newStatus
      });
      if (newStatus === 0) {
        Animated.timing(_this.state.opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }).start();
      } else {
        Animated.timing(_this.state.opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
      Animated.spring(_this.state.pan, {
        toValue: {
          x: 0,
          y: newY
        },
        tension: 80,
        friction: 25,
        useNativeDriver: true,
        restDisplacementThreshold: 10,
        restSpeedThreshold: 10
      }).start(function () {
        if (newStatus === 0) {
          _this.props.onClose();
          _this.setState({
            showComponent: false
          });
        } else _this.setState({
          canScroll: newStatus === STATUS.LARGE
        });
      });
    };
    _this.state = {
      status: STATUS.CLOSED,
      isActive: false,
      showComponent: false,
      canScroll: false,
      opacity: new Animated.Value(1),
      pan: new Animated.ValueXY({
        x: 0,
        y: FULL_HEIGHT
      }),
      orientation: FULL_HEIGHT >= FULL_WIDTH ? 'portrait' : 'landscape',
      deviceWidth: FULL_WIDTH,
      deviceHeight: FULL_HEIGHT,
      panelHeight: PANEL_HEIGHT
    };
    _this.pan = new Animated.ValueXY({
      x: 0,
      y: FULL_HEIGHT
    });
    _this.isClosing = false;
    _this.animatedValueY = 0;
    _this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder(evt, gestureState) {
        return true;
      },
      onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
        _this.state.pan.setOffset({
          x: 0,
          y: _this.animatedValueY
        });
        _this.state.pan.setValue({
          x: 0,
          y: 0
        });
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        if (_this.state.status === 1 && Math.abs(_this.state.pan.y._value) <= _this.state.pan.y._offset || _this.state.status === 2 && _this.state.pan.y._value > -1) _this.state.pan.setValue({
          x: 0,
          y: _this.state.status === STATUS.LARGE ? Math.max(0, gestureState.dy) : gestureState.dy
        });
      },
      onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
        var _this$props2 = _this.props,
          onlyLarge = _this$props2.onlyLarge,
          onlySmall = _this$props2.onlySmall;
        _this.state.pan.flattenOffset();
        if (gestureState.dy === 0) _this._animateTo(_this.state.status);else if (gestureState.dy < -100 || gestureState.vy < -0.5) {
          if (_this.state.status === STATUS.SMALL) _this._animateTo(onlySmall ? STATUS.SMALL : STATUS.LARGE);else _this._animateTo(STATUS.LARGE);
        } else if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          if (_this.state.status === STATUS.LARGE) _this._animateTo(onlyLarge ? STATUS.CLOSED : STATUS.SMALL);else _this._animateTo(0);
        } else _this._animateTo(_this.state.status);
      }
    });
    return _this;
  }
  _inheritsLoose(SwipeablePanel, _Component);
  var _proto = SwipeablePanel.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;
    var _this$props3 = this.props,
      isActive = _this$props3.isActive,
      openLarge = _this$props3.openLarge,
      onlyLarge = _this$props3.onlyLarge,
      onlySmall = _this$props3.onlySmall;
    if (onlyLarge && onlySmall) console.warn('Ops. You are using both onlyLarge and onlySmall options. onlySmall will override the onlyLarge in this situation. Please select one of them or none.');
    var lHandler = function lHandler(value) {
      _this2.animatedValueY = value.value;
    };
    if (prevProps.isActive !== isActive) {
      this.setState({
        isActive: isActive
      });
      if (isActive) {
        this.state.pan.y.addListener(lHandler);
        this._animateTo(onlySmall ? STATUS.SMALL : openLarge ? STATUS.LARGE : onlyLarge ? STATUS.LARGE : STATUS.SMALL);
      } else {
        this.state.pan.y.removeListener(lHandler);
        this._animateTo();
      }
    }
    if (prevState.orientation !== this.state.orientation) this._animateTo(this.state.status);
  };
  _proto.render = function render() {
    var _this$state = this.state,
      showComponent = _this$state.showComponent,
      deviceWidth = _this$state.deviceWidth,
      deviceHeight = _this$state.deviceHeight,
      panelHeight = _this$state.panelHeight;
    var _this$props4 = this.props,
      noBackgroundOpacity = _this$props4.noBackgroundOpacity,
      style = _this$props4.style,
      barStyle = _this$props4.barStyle,
      closeRootStyle = _this$props4.closeRootStyle,
      closeIconStyle = _this$props4.closeIconStyle,
      onClose = _this$props4.onClose,
      allowTouchOutside = _this$props4.allowTouchOutside,
      closeOnTouchOutside = _this$props4.closeOnTouchOutside;
    var color = this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
    });
    return showComponent ? /*#__PURE__*/React__default.createElement(Animated.View, {
      style: [SwipeablePanelStyles.background, {
        backgroundColor: noBackgroundOpacity ? 'rgba(0,0,0,0)' : color,
        height: allowTouchOutside ? 'auto' : deviceHeight,
        width: deviceWidth
      }]
    }, closeOnTouchOutside && /*#__PURE__*/React__default.createElement(TouchableWithoutFeedback, {
      onPress: function onPress() {
        return onClose();
      }
    }, /*#__PURE__*/React__default.createElement(View, {
      style: [SwipeablePanelStyles.background, {
        width: deviceWidth,
        backgroundColor: 'rgba(0,0,0,0)',
        height: allowTouchOutside ? 'auto' : deviceHeight
      }]
    })), /*#__PURE__*/React__default.createElement(Animated.View, _extends({
      style: [SwipeablePanelStyles.panel, {
        width: this.props.fullWidth ? deviceWidth : deviceWidth - 50,
        height: panelHeight
      }, {
        transform: this.state.pan.getTranslateTransform()
      }, style]
    }, this._panResponder.panHandlers), !this.props.noBar && /*#__PURE__*/React__default.createElement(Bar, {
      barStyle: barStyle
    }), this.props.showCloseButton && /*#__PURE__*/React__default.createElement(Close, {
      rootStyle: closeRootStyle,
      iconStyle: closeIconStyle,
      onPress: this.props.onClose
    }), /*#__PURE__*/React__default.createElement(ScrollView, _extends({
      onTouchStart: function onTouchStart() {
        return false;
      },
      onTouchEnd: function onTouchEnd() {
        return false;
      },
      contentContainerStyle: SwipeablePanelStyles.scrollViewContentContainerStyle
    }, this.props.scrollViewProps), this.state.canScroll ? /*#__PURE__*/React__default.createElement(TouchableHighlight, null, /*#__PURE__*/React__default.createElement(React__default.Fragment, null, this.props.children)) : this.props.children))) : null;
  };
  return SwipeablePanel;
}(Component);
var SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  panel: {
    position: 'absolute',
    height: PANEL_HEIGHT,
    width: FULL_WIDTH - 50,
    transform: [{
      translateY: FULL_HEIGHT - 100
    }],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2
  },
  scrollViewContentContainerStyle: {
    width: '100%'
  }
});
var SMALL_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - (FULL_HEIGHT - 400) - 25;
var LARGE_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - 25;

export { LARGE_PANEL_CONTENT_HEIGHT, SMALL_PANEL_CONTENT_HEIGHT, SwipeablePanel };
//# sourceMappingURL=index.modern.js.map
