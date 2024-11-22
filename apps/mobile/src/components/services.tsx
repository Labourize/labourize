import React from "react";
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ServiceScreen() {
    return (
        <>
            <StatusBar hidden />
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.servicesBox}>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/1.jpg')}                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Job matching and career development</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/2.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Microfinance schemes</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.servicesBox}>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/3.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Grievance redressal and issue tracking / file ligel cases</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/4.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Training and skill development programs</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.servicesBox}>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/5.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Social security and insurance services</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/6.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Legal Help</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.servicesBox}>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/7.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Provident fund-related grievances</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.serviceslist}>
                            <TouchableOpacity>
                                <ImageBackground
                                    source={require('../assets/images/services/8.jpg')}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 12 }}
                                    style={styles.image}
                                >
                                    <View style={styles.imgBg}>
                                        <Text style={styles.servicestext}>Job portal</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Add more service boxes as needed */}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingVertical: 12, // add padding if necessary
    },
    servicesBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 12,
        justifyContent: 'space-between', // Added spacing between services
    },
    serviceslist: {
        backgroundColor: 'powderblue',
        height: 180,
        width: '45%',
        marginHorizontal: 8,
        borderRadius: 12,
    },
    image: {
        height: 180,
        justifyContent: 'flex-end',
        borderRadius: 12,
    },
    imgBg: {
        flex: 1,
        backgroundColor: '#00000055',
        justifyContent: 'flex-end',
        borderRadius: 12,
    },
    servicestext: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        paddingBottom: 10,
    },
});
