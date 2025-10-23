import React, { ComponentClass } from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { AreaChart, ChartProps } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { DefaultChartProps } from './types';
import { useRheostatTheme } from '../theme';

const AnimatedAreaChart = Animated.createAnimatedComponent(
  AreaChart as ComponentClass<ChartProps<number>>,
);

const DefaultAreaChart = (props: DefaultChartProps) => {
  const {
    width, style, data, backgroundColor, chartColor, children, handlePos,
    curve = shape.curveNatural,
    contentInset = { top: 10, bottom: 0 },
    ...chartProps
  } = props;
  const pos = handlePos[1].interpolate({
    inputRange: [0, 100],
    outputRange: [0, width],
    // extrapolate: 'clamp',
  });

  const prevValue = handlePos[0].interpolate({
    inputRange: [0, 100],
    outputRange: [0, -width],
    // extrapolate: 'clamp',
  });
  const prevPos = handlePos[0].interpolate({
    inputRange: [0, 100],
    outputRange: [0, width],
    // extrapolate: 'clamp',
  });
  const diffValue = Animated.add(pos, prevValue);
  return (
    <View style={style as any}>
      <AreaChart
        style={{ height: '100%' }}
        data={data}
        curve={curve}
        contentInset={contentInset}
        svg={{ fill: backgroundColor }}
        {...chartProps}
      />
      <Animated.View style={{
        ...StyleSheet.absoluteFillObject,
        width: diffValue,
        height: '100%',
        transform: [{ translateX: prevPos }],
        overflow: 'hidden',
      }}
      >
        <AnimatedAreaChart
          style={{ transform: [{ translateX: prevValue }], height: '100%', width }}
          data={data}
          svg={{
            fill: chartColor,
          }}
          curve={curve}
          contentInset={contentInset}
          {...chartProps}
        >
          {children}
        </AnimatedAreaChart>
      </Animated.View>
    </View>
  );
};

const ThemedAreaChart = (props: Omit<DefaultChartProps, 'chartColor' | 'backgroundColor'> & Partial<Pick<DefaultChartProps, 'chartColor' | 'backgroundColor'>>) => {
  const theme = useRheostatTheme();
  const chartColor = props.chartColor || theme.themeColor;
  const backgroundColor = props.backgroundColor || theme.grey;
  return (
    <View style={[{ height: 100 }, props.style as any]}>
      <DefaultAreaChart {...(props as any)} chartColor={chartColor} backgroundColor={backgroundColor} />
    </View>
  );
};

export default ThemedAreaChart;
