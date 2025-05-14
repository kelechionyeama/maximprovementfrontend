import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { EpilogueBoldText } from '../StyledText';
import { isTestFlightBuild } from '@/config';

interface ChatHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title, 
  onBackPress = () => router.back() 
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: isTestFlightBuild ? 20 : 0 }]}>
        <TouchableOpacity onPress={onBackPress}>
          <MaterialCommunityIcons name="keyboard-backspace" size={24} color="#E0E0E0" />
        </TouchableOpacity>
        
      <View style={styles.titleContainer}>
        <EpilogueBoldText lineHeight={true} style={styles.title} numberOfLines={2}>
          {title}
        </EpilogueBoldText>
      </View>
      </View>
      <View
        style={{
            paddingHorizontal: 16,
        }}
      >
      <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  }
});

export default ChatHeader;
