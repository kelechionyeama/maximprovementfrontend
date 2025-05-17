import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { EPRText } from '../../StyledText';
import { termsOfService, privacyPolicy } from '@/HelperFunctions';

const Index = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />

			<View style={{ marginTop: 20 }} />

			<Image source={require("@/assets/images/logo.png")} style={styles.logo} />

			<Image source={require("@/assets/images/getStarted.png")} style={styles.image} />

			<Button 
				label="Get Started" 
				onPress={() => router.push("/(tabs)/(memory)")}
			/>

			<View>			
				<EPRText lineHeight={16} style={styles.byClickText}>	
					By clicking "Get Started", you agree to our {'\n'}
				</EPRText>

				<View style={styles.row}>
					<TouchableOpacity onPress={termsOfService}>
						<EPRText style={styles.link}>
							Terms
						</EPRText>
					</TouchableOpacity>

					<EPRText style={{ fontSize: 12, opacity: 0.6 }}>
						and
					</EPRText>
					
					<TouchableOpacity onPress={privacyPolicy}>
						<EPRText style={styles.link}>
							Privacy
						</EPRText>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
};

export default Index;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		flex: 1
	},

	byClickText: {
		fontSize: 12,
		textAlign: "center",
		opacity: 0.6
	},

	row: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		marginTop: -15
	},

	link: {
		textDecorationLine: "underline",
		fontSize: 12,
		opacity: 0.6
	},

	logo: {
		width: 178.8,
		height: 108.4,
		alignSelf: "center"
	},

	image: {
		width: 324.21,
		height: 395.8,
		alignSelf: "center",
		marginTop: 60
	}
});