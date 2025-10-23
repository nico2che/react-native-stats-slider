import React from 'react';
import { StyleProp, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import { useRheostatTheme } from '../theme';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  children?: React.ReactNode;
};
type ButtonTextProps = {
  selected: boolean;
};

const RoundedButton = ({
  style, selected = false, children,
}:ButtonProps) => {
  const theme = useRheostatTheme();
  return (
    <TouchableHighlight style={style} underlayColor="rgba(245,219,227,0.8)">
      <Text style={{ color: selected ? 'white' : theme.themeColor, fontSize: 12, fontWeight: '700' }}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const DefaultHandler = ({ style, selected = false, children }: ButtonProps) => {
  const theme = useRheostatTheme();
  return (
    <View style={style}>
      <RoundedButton
        style={{
          backgroundColor: 'transparent',
          padding: 0,
          height: 30,
          width: 30,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: theme.themeColor,
          display: 'flex',
        }}
        selected={selected}
      >
        {children}
      </RoundedButton>
    </View>
  );
};

export default DefaultHandler;
