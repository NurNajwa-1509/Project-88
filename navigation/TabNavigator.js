import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        light_theme: true,
      };
    }

    componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function(snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
      }
    
      render() {
        return (
          <Tab.Navigator
            labeled={false}
            barStyle={
              this.state.light_theme
                ? styles.bottomTabStyleLight
                : styles.bottomTabStyle
            }
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Feed") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Create Post") {
                  iconName = focused ? "add-circle" : "add-circle-outline";
                }
                return (
                  <Ionicons
                    name={iconName}
                    size={RFValue(25)}
                    color={color}
                    style={styles.icons}
                  />
                );
              }
            })}

            activeColor={"#ee8249"}
            inactiveColor={"gray"}
        >
            <Tab.Screen name="Feed" component={Feed} options={{headerShown:false}}/>
      <Tab.Screen name="Create Post" component={CreatePost} options={{headerShown:false}}/>
    </Tab.Navigator>    
    );
    }
}

const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#2f345d",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute"
    },
    bottomTabStyleLight: {
      backgroundColor: "#eaeaea",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute"
    },
    icons: {
      width: RFValue(30),
      height: RFValue(30)
    }
  });