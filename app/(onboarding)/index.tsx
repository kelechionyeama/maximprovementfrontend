import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Button } from '../../components/Button';
import { EPRText } from '../../StyledText';
import { Image } from 'expo-image';
import Feature from '../../components/Feature';
import { router } from 'expo-router';

const Index = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginTop: 20 }} />

			<Image source={require("@/assets/images/logo.png")} 
				style={{ width: 1788/10, height: 1084/10, alignSelf: "center" }} />

			<Feature title="Dating and relationships" icon={require("@/assets/icons/heart.png")} params="dating" />
			<Feature title="Motivation" icon={require("@/assets/icons/heart.png")} params="motivation" />
			<Feature title="Friendship" icon={require("@/assets/icons/heart.png")} params="friendship" />
			<Feature title="Confidence" icon={require("@/assets/icons/heart.png")} params="confidence" />

			<Button 
				label="Get Started" 
				onPress={() => router.push("/(tabs)/(home)")} 
			/>

			<EPRText style={{ color: "white", fontSize: 12, textAlign: "center", marginBottom: 10 }}>	
				By clicking "Get Started", you agree to our {'\n'}
				<EPRText style={{ textDecorationLine: "underline" }}>Terms & Conditions</EPRText> and <EPRText style={{ textDecorationLine: "underline" }}>Privacy Policy</EPRText>
			</EPRText>
		</SafeAreaView>
	)
}

export default Index;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		flex: 1
	}
});