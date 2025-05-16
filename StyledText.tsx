import { Text, TextProps } from 'react-native';
import React from 'react';

export function EPRText(props: TextProps & { color?: string }) {
    return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: "EPR", lineHeight: 21, color: props.color || "white" }]} />;
};

export function EPMText(props: TextProps & { color?: string }) {
    return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: "EPM", lineHeight: 21, color: props.color || "white" }]} />;
};

export function EPSBText(props: TextProps & { color?: string }) {
    return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: "EPSB", lineHeight: 21, color: props.color || "white" }]} />;
};

export function EPBText(props: TextProps & { color?: string }) {
    return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: "EPB", lineHeight: 21, color: props.color || "white" }]} />;
};