import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import React from 'react';
import * as Haptics from "expo-haptics";
import { EPBText } from '../StyledText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    disabled?: boolean;
    textColor?: string;
    loading?: boolean;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const Button = ({ label, disabled, style, onPress, textColor = "white", loading = false, icon, ...props }: ButtonProps) => {
    
    const handlePress = async () => {
        if (!disabled) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onPress && onPress({} as any);
        };
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
                style
            ]}
            disabled={disabled}
            onPress={handlePress}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color={"black"} />
            ) : (
                <View style={styles.content}>
                    <EPBText color="black" style={{ fontSize: 16 }}>
                        {label}
                    </EPBText>

                    {icon && <MaterialCommunityIcons name={icon} size={24} color={"gold"} style={styles.icon} />}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 20
    },

    buttonDisabled: {
        backgroundColor: '#ccc'
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    subText: {
        fontSize: 12,
        color: "#6E6E6E",
        marginTop: 10,
        textAlign: "center"
    },

    icon: {
        marginTop: -4
    }
}); 