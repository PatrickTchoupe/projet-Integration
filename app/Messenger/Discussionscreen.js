//this component is the home screen of our chat component

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonShare from "./components/MaterialButtonShare";

import Contact from "./contact";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";
import RecentChat from './recentChats'
import GroupChat from './groupChat'


let userId = " "

function Discussion_Repo( props) {
  const [disp, setDisp] = useState("disc");
  const [contacts, setContact] = useState(" ");
  const [loaded, setLoaded] = useState(false);

  const isFocused = useIsFocused();


  useEffect(() => {
    
    
    async function getContact() {
      let recentChats =await AsyncStorage.getItem('recentChats')
      if(recentChats == null){

      await AsyncStorage.setItem('recentChats', JSON.stringify([]));
      }
      let contact = await AsyncStorage.getItem("contact");
      if (contact == null) {
        let test = [];
        await AsyncStorage.setItem("contact", JSON.stringify(test));
      } else {
        contact = JSON.parse(contact);
        setContact(contact);
        setLoaded(true);
      }

      let id = await AsyncStorage.getItem("user")
      id = JSON.parse(id).Id
     userId = id
    }
    getContact();

  
  }, [loaded, isFocused]);

  function renderScreen() {
    
   
    let arr = [];
    for (let i = 0; i < contacts.length; i++) {
      arr.push(
        <Contact
        userId = {userId}
          key={i}
          id = {contacts[i].Id}
          name={contacts[i].Nom}
          imgUrl={contacts[i].PhotoProfil}
          grp= {true}
          onNav={() => props.navigation.navigate('Chat', { recieverId: contacts[i].Id, senderId: userId })}

        />
      );
    }
    if (disp === "disc") {
      return (
        
        <RecentChat />
      );
    } else if (disp === "groups") {
      return (
       <GroupChat />
      );
    } else if (disp === "contacts") {
      return <View>{arr}</View>;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loaded ? renderScreen() : <Text> </Text>}
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.buttonAdd}>
          {disp == "contacts" ? (
            <MaterialButtonShare
              iconName="share-variant"
              icon="account-multiple-plus"
              style={styles.materialButtonShare}
              nav = 'addContact'
            ></MaterialButtonShare>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, styles.materialIconTextButtonsFooter1]}>
        <TouchableOpacity
          onPress={() => {
            setDisp("disc");
          }}
          style={styles.buttonWrapper1}
        >
          <MaterialCommunityIconsIcon
            name={"wechat"}
            style={styles.icon1}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.btn1Text}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDisp("groups");
          }}
          style={styles.activeButtonWrapper}
        >
          <MaterialCommunityIconsIcon
            name={"account-group"}
            style={styles.activeIcon}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.activeContent}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDisp("contacts");
          }}
          style={styles.buttonWrapper2}
        >
          <MaterialCommunityIconsIcon
            name={"contacts"}
            style={styles.icon2}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.btn2Text}>Contacts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 0.8,
  },
  footer: {
    position: "fixed",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: "#FFF",
    flexDirection: "row",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  materialIconTextButtonsFooter1: {
    height: 62,
    width: "100%",
    marginTop: 678,
  },
  buttonWrapper1: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,

    opacity: 0.8,
  },
  btn1Text: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4,
  },
  activeButtonWrapper: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "#9E9E9E",
    fontSize: 24,
    opacity: 0.8,
  },
  activeContent: {
    fontSize: 14,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4,
  },
  buttonWrapper2: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center",
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8,
  },
  btn2Text: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4,
  },
  buttonAdd: {
    width: 56,
    height: 56,
    position: "fixed",
    flex: 0.1,
    left: "80%",
    right: 0,
    bottom: 80,
  },
  materialButtonShare: {
    height: 56,
    width: 56,
  },
});
export default Discussion_Repo;
