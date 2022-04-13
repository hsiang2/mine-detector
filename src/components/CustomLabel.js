import { useColorMode } from 'native-base';
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'native-base';

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
  leftDiff: 0,
};

const width = 26;

function LabelBase(props) {
    const { position, value, leftDiff, pressed } = props;
    const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
    const cachedPressed = React.useRef(pressed);

    React.useEffect(() => {
        Animated.timing(scaleValue.current, {
            toValue: pressed ? 1 : 0.1,
            duration: 200,
            delay: pressed ? 0 : 1000,
            useNativeDriver: false,
        }).start();
        cachedPressed.current = pressed;
    }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            left: position ,
            transform: [
              { translateY: width },
              { scale: scaleValue.current },
              { translateY: -width },
            ],
          },
        ]}
      >
        <Text 
            textAlign="center" flex={1} fontSize={12}
            _dark={{color: '#FFDA7B'}} _light={{color: "#D99F3E"}}
        >
            {value.toFixed(1)}
        </Text>
      </AnimatedView>
    )
  );
}

export default function CustomLabel(props) {
  const {
    leftDiff,
    oneMarkerValue,
    oneMarkerLeftPosition,
    oneMarkerPressed,
  } = props;

  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        leftDiff={leftDiff}
        pressed={oneMarkerPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: 'relative',
  },
  sliderLabel: {
     
    position: 'absolute',
    justifyContent: 'center',
    bottom: -10,
    width: width,
  },
  sliderLabelText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 12,
  },
});