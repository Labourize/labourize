import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
// export default class BackgroundVideo extends Component {
export const BackgroundVideo = () => {

  return (
      <Video
        source={require("../assets/images/worker.mp4")}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />
  );
}


const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});