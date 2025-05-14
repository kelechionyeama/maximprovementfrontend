import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { Text, TextProps, View } from 'react-native';
import React from 'react';

export function MonoText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'SpaceMono', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'Epilogue', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueBoldText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueBold', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueMediumText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueMedium', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueSBText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueSemiBold', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueRegularText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueRegular', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueLightText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueLight', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueThinText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueThin', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueBlackText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueBlack', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueExtraBoldText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueExtraBold', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueExtraLightText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueExtraLight', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueMediumItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueMediumItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueBoldItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueBoldItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueSemiBoldItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueSemiBoldItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueLightItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueLightItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueThinItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueThinItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueBlackItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueBlackItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueExtraBoldItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueExtraBoldItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function EpilogueExtraLightItalicText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'EpilogueExtraLightItalic', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}

export function DrukWideBoldText(props: TextProps & { lineHeight?: boolean }) {
  return <Text {...props} allowFontScaling={false} maxFontSizeMultiplier={1} style={[props.style, { fontFamily: 'DrukWideBold', lineHeight: props.lineHeight ? (props.style && 'lineHeight' in props.style ? props.style.lineHeight : 30) : 16 }]} />;
}


export const ShimmerText = () => {
    const translateX = useSharedValue(-200);

    React.useEffect(() => {
        translateX.value = withRepeat(
            withSequence(
                withTiming(400, { duration: 2000 }),
                withTiming(-2000, { duration: 0 })
            ),
            -1
        );
    }, []);

    const shimmerAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }));

    const getShimmerOverlay = () => ({
        width: '200%' as const,
        height: '100%' as const,
        position: 'absolute' as const,
        backgroundColor: 'white',
        opacity: 0.5,
        transform: [{ skewX: '-20deg' as any }]
    }) as const;

    return (
        <View style={{ gap: 8 }}>
            <View style={{
                height: 16,
                width: "95%",
                backgroundColor: '#E8E8E8',
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <Animated.View style={[getShimmerOverlay(), shimmerAnimation]} />
            </View>

            <View style={{
                height: 16,
                width: "80%",
                backgroundColor: '#E8E8E8',
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <Animated.View style={[getShimmerOverlay(), shimmerAnimation]} />
            </View>

            <View style={{
                height: 16,
                width: "95%",
                backgroundColor: '#E8E8E8',
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <Animated.View style={[getShimmerOverlay(), shimmerAnimation]} />
            </View>
        </View>
    );
};