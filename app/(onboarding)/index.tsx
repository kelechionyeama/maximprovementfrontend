import { sendOnboardingData } from '@/api/OnboardingApi';
import { deviceInformation, privacyPolicy, termsOfService } from '@/HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, signInAnonymously } from 'firebase/auth';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { EPRText } from '../../StyledText';
// import analytics from "@react-native-firebase/analytics";
import { appInfo, db } from '@/config';
import { useUserProfileStore } from '@/store/userProfileStore';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '@/ExportedTypes';

const Index = () => {

	const [loading, setLoading] = React.useState(false);

	const { setUserProfile } = useUserProfileStore();


	// GET STARTED
	const getStarted = async () => {
		try {
			setLoading(true);

            const deviceId = deviceInformation.deviceId;

            // SIGN USER IN AND PERSIST AUTH
            const auth = getAuth();
            const authUser = await signInAnonymously(auth);

			const uid = authUser.user.uid;

            await setAuthPersistence(uid);

			// IDENTIFY USER IN SUPERWALL AND REVENUECAT
			// Superwall.shared.identify({ userId: deviceId });
			// Purchases.logIn(userId: deviceId);

			const userRef = doc(db, "users", deviceId);

			// DOES THIS USER ALREADY EXSIST?
            const userFound = await getDoc(userRef);
            if (userFound.exists() && userFound.data()?.deviceId) {
                await updateDoc(userRef, { sessions: arrayUnion(authUser?.user?.uid), appInfo });
				setUserProfile(userFound.data() as UserProfile);

				router.replace("/(tabs)/(home)");
                return;
            };


			// SEND TO BACKEND TO CREATE NEW USER ACCOUNT
			const { data } = await sendOnboardingData({ uid }, "createUser");

			if (data.status === 200) {
				// mixpanel.identify(deviceId);
				// analytics().setUserId(deviceId);
				router.replace({
					pathname: "/(tabs)/(home)",
					params: {
						brandNewUser: "true"
					}
				});
			};

		} catch (error) {
			console.log(error);
		};
	};


	// AUTH PERSISTENCE (ANON AUTH)
	const setAuthPersistence = async (uid: string) => {
		try {
			// SET PERSISTENCE TO "LOCAL" FOR PRESISTENT AUTHENTICATION STATE
			await AsyncStorage.setItem("uid", uid);
		} catch (error) {}
	};

	
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />

			<View style={{ marginTop: 20 }} />

			<Image source={require("@/assets/images/logo.png")} style={styles.logo} />

			<Image source={require("@/assets/images/getStarted.png")} style={styles.image} />

			<Button 
				loading={loading}
				label="Get Started" 
				onPress={() => router.push("/(tabs)/(home)")}
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