import { StyleSheet, SafeAreaView, View } from 'react-native';
import React from 'react';
import GetStarted from '@/components/chat/GetStarted';
import { useNavigation } from 'expo-router';
import Home from '@/components/chat/Home';

const Index = () => {
	const navigation = useNavigation();
	const [hasName, setHasName] = React.useState(false);

	React.useEffect(() => {
		const checkNameInStorage = async () => {
			try {
				const AsyncStorage = require('@react-native-async-storage/async-storage').default;
				const storedName = await AsyncStorage.getItem('userName1');
				if (storedName) {
					setHasName(true);
				} else {
					setHasName(false);
				}
			} catch (error) {
				console.error('Error checking name in AsyncStorage:', error);
				setHasName(false);
			}
		};

		checkNameInStorage();
	}, []);
	
	return (
		<SafeAreaView style={styles.container}>
			{!hasName ? (
				<View style={{ flex: 1 }}>
					<GetStarted />
				</View>
			) : (
				<View style={{ flex: 1 }}>
					<Home />
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		// paddingTop: 16
	}
});

export default Index;