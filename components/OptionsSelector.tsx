import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Animated, TouchableOpacity, View, ViewStyle } from 'react-native';
import { EPMText } from '../StyledText';

interface OptionsSelectorProps {
    options: string[];
    selectedOptions: string[];
    onOptionSelect: (option: string) => void;
    optionOpacities: Animated.Value[];
};

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
    options,
    selectedOptions,
    onOptionSelect,
    optionOpacities
}) => {
    return (
        <View style={{ marginBottom: 10 }}>
            {options.map((option, idx) => (
                <TouchableOpacity key={idx} onPress={() => onOptionSelect(option)}>
                    <Animated.View style={[styles.needHelpWithWrapper, { opacity: optionOpacities[idx] }]}>
                        <EPMText style={{ fontSize: 16 }}>
                            {option}
                        </EPMText>

                        <Ionicons 
                            name={selectedOptions.includes(option) ? "checkmark-circle-sharp" : "radio-button-off-outline"} 
                            size={24} 
                            color="white" 
                        />
                    </Animated.View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles: { needHelpWithWrapper: ViewStyle } = {
    needHelpWithWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10
    }
};

export default OptionsSelector; 