import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export const AppText: React.FC<TextProps> = ({ style, ...props }) => {
    return <RNText style={[{ fontFamily: 'GTWalsheimProRegular' }, style]} {...props} />;
};
