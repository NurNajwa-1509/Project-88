import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value
      };
    }

    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
    }

    render() {
      if (this.state.fontsLoaded) {
        SplashScreen.hideAsync();
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              this.props.navigation.navigate("RegisterScreen", {
                post: this.props.post
              })
            }
          >
            <SafeAreaView style={styles.droidSafeArea} />
            <View
              style={
                this.state.light_theme
                  ? styles.cardContainerLight
                  : styles.cardContainer
              }
            >
              <Image
                source={images[post.preview_image]}
                style={styles.postImage}
              ></Image>
              <View style={styles.titleContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postTitleTextLight
                        : styles.postTitleText
                    }
                  >
                    {post.title}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postAuthorTextLight
                        : styles.postAuthorText
                    }
                  >
                    {post.author}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.descriptionTextLight
                        : styles.descriptionText
                    }
                  >
                    {this.props.post.description}
                  </Text>
                </View>
              </View>
  
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons
                    name={"heart"}
                    size={RFValue(30)}
                    color={this.state.light_theme ? "black" : "white"}
                  />
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }
                  >
                    12k
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
  },
  postTitleText: {
    fontSize: RFValue(25),
    color: "white"
  },
  postTitleTextLight: {
    fontSize: RFValue(25),
    color: "black"
  },
  postAuthorText: {
    fontSize: RFValue(18),
    color: "white"
  },
  postAuthorTextLight: {
    fontSize: RFValue(18),
    color: "black"
  },
  descriptionContainer: {
    marginTop: RFValue(5)
  },
  descriptionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  descriptionTextLight: {
    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
