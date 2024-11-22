import React from "react";
import { Button, Dimensions, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../themes";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Video from "react-native-video";
import { BackgroundVideo } from "./backgroundVdoo";
import { LanguageScreen } from "./language";
// import {language} from "./language";
const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
const { width, height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }: any) => {



  const onClick = () => {
    console.log("jjj");

  };
  return (
    <>
      <StatusBar hidden />

      <View style={styles.container}>
        <BackgroundVideo ></BackgroundVideo>
        <View style={styles.bodyBox}>
          <View style={styles.topHeader}>
            <Image style={styles.speaker} source={require('../assets/images/speaker.png')} />
            <View style={styles.dropbownBox}>
              <Text style={styles.dropbownText}>English</Text>
              <Image style={styles.downArrow} source={require('../assets/images/down-arrow.png')} />
            </View>
          </View>

          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
          <Text style={styles.headerText}>Get Started</Text>
          <Text style={styles.textbox}>An AI-powered platform built to connect workers from unorganized and organized labor sectors</Text>

          <View style={styles.phoneBox}>
            <Image style={styles.phoneIcon} source={require('../assets/images/phone-icon.png')} />
            <Text style={styles.phoneNumber}>1800-100-8888</Text>
          </View>

          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.appButtonContainer} >


              <Text onPress={() => navigation.navigate('Service')}
                style={styles.appButtonText}>Services</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Talk to me</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.socialMedia}>
            <Image style={styles.socialMediaIcon} source={require('../assets/images/whatsapp-icon.png')} />
            <Image style={styles.socialMediaIcon} source={require('../assets/images/telegram-icon.png')} />
          </View>
          <View style={styles.languageBox}>
            <LanguageScreen />
          </View>

        </View>
        <StatusBar hidden={true} />
      </View>
    </>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyBox: {
    backgroundColor: '#00000085',
    flex: 1,
  },
  topHeader: {
    justifyContent: 'space-between',
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    alignItems: 'center',
  },
  speaker: {
    width: 25,
    height: 25,
  },
  dropbownBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'flex-end',
    width: 80,
    height: 35,
    flex: 0.3,
    paddingTop:5,
  },
  dropbownText: {
    color: '#ffffff'
  },
  downArrow: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textbox: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
  },
  phoneBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  phoneIcon: {
    width: 25,
    height: 25,
  },
  phoneNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonBox: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#2554FF",
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  socialMedia: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  socialMediaIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  languageText: {
    color: '#ffffff',
    marginRight: 20,
  },
  languageBox:{
    flex:1,
  }
});