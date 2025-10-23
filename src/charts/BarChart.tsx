import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { BarChart } from 'react-native-svg-charts';
import { DefaultChartProps } from './types';
import { useRheostatTheme } from '../theme';

const DefaultBarChart = (props: DefaultChartProps) => {
  const {
    width, style, data, backgroundColor, chartColor, children, handlePos,
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
      <BarChart
        style={{ height: '100%' }}
        data={data}
        contentInset={contentInset}
        svg={{
          fill: backgroundColor,
          strokeWidth: 0,
        }}
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
        <Animated.View style={{ transform: [{ translateX: prevValue }] }}>
          <BarChart
            style={{ height: '100%', width }}
            data={data}
            svg={{
              fill: chartColor,
            }}
            contentInset={contentInset}
            {...chartProps}
          >
            {children}
          </BarChart>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const ThemedBarChart = (props: Omit<DefaultChartProps, 'chartColor' | 'backgroundColor'> & Partial<Pick<DefaultChartProps, 'chartColor' | 'backgroundColor'>>) => {
  const theme = useRheostatTheme();
  const chartColor = props.chartColor || theme.themeColor;
  const backgroundColor = props.backgroundColor || theme.grey;
  return (
    <View style={[{ height: 100 }, props.style as any]}>
      <DefaultBarChart {...(props as any)} chartColor={chartColor} backgroundColor={backgroundColor} />
    </View>
  );
};

export default ThemedBarChart;
