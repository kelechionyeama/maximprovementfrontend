import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { EPMText, EPSBText, EPRText } from "@/StyledText";
import Feather from '@expo/vector-icons/Feather';
import { appInfo } from '@/config';
import { contactUs, privacyPolicy, termsOfService } from '@/HelperFunctions';

const SettingsBottomSheet = ({ bottomSheetRef }: { bottomSheetRef: any }) => {

    const snapPoints = React.useMemo(() => ["55%"], []);

    return (
        <BottomSheet
            index={-1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            style={{ flex: 1, zIndex: 1, backgroundColor: "black" }}
            backgroundStyle={{ backgroundColor: "black" }}
            handleIndicatorStyle={{ backgroundColor: "white" }}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.2}
                />
            )}
        >
            <BottomSheetView style={styles.container}>
                <>        
                    <View style={styles.row}>
                        <View style={{ marginLeft: 20 }} />

                        <EPSBText style={{ fontSize: 20 }}>
                            More Stuff
                        </EPSBText>

                        <Feather name="x" size={24} color="white" />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.box} onPress={() => contactUs("Support Request", "1234567890")}>
                            <EPMText style={styles.text}>
                                Contact us
                            </EPMText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.box} onPress={() => termsOfService()}>
                            <EPMText style={styles.text}>
                                Terms of Service
                            </EPMText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.box} onPress={() => privacyPolicy()}>
                            <EPMText style={styles.text}>
                                Privacy Policy
                            </EPMText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <EPRText>
                            Made in Brooklyn, New York
                        </EPRText>

                        <EPRText>
                            v{appInfo.version} ({appInfo.build})
                        </EPRText>
                    </View>
                </>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default SettingsBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "black"
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    box: {
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
        paddingVertical: 25,
        alignItems: "center"
    },

    text: {
        fontSize: 18,
        textAlign: "center"
    },

    footer: {
        alignItems: "center",
        marginTop: 25,
        opacity: 0.7
    }
});