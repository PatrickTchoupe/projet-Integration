/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';



let chatRoom = '';
let lastMessage = ' ';
let moreInfo = 'true';
//let setErrorMess = true

export default function Chat(route, navigation) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [errorMess, setErrorMess] = useState(false);
  const [groups, setGroups] = useState(route.route.params.group);

  const chatId = () => {
    const chatterId = route.route.params.senderId;
    const chateeId = route.route.params.recieverId;
    const chatIdPre = [];
    chatIdPre.push(chatterId);
    chatIdPre.push(chateeId);

    if (groups) {
      return `${chateeId}`;
    } else {
      return chatIdPre.join('_');
    }
  };

  let chatsRef = db.collection('chats');

  const setServ = async () => {
<<<<<<< HEAD:app/src/Messenger/Chat.js
    console.log('test');
    console.log(route.route.params);
    await AsyncStorage.setItem('serv', JSON.stringify(route.route.params.idDem));
    console.log(route.route.params.iddem);
  };
=======
    console.log("test")
    console.log(route.route.params)
    await  AsyncStorage.setItem("serv", JSON.stringify(route.route.params.idDem))
    console.log(route.route.params.iddem)
  }
>>>>>>> 257583b347aa7dca63cc533fac04b97de3f351e7:app/Messenger/Chat.js
  useEffect(() => {
    if (!groups) {
      if (route.route.params.check === 'offre') {
        setServ();
        console.log('test');
        moreInfo = 'false';
      }
    }

    if (groups) {
      chatRoom = chatId();
      readUser();

      //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
      try {
        const unsubscribe = chatsRef
          .doc(chatRoom)
          .collection('message')
          .onSnapshot((querySnapshot) => {
            //we listen to the doc changes
            const messagesFirestore = querySnapshot
              .docChanges()
              .filter(({type}) => type === 'added')
              .map(({doc}) => {
                const message = doc.data();
                //createdAt is firebase.firestore.Timestamp instance
                //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                return {...message, createdAt: message.createdAt.toDate()};
              })
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            appendMessages(messagesFirestore);
            //the 2 lines above sort the message by creation time so that recent messages are sent first
            try {
              return () => unsubscribe();
            } catch (error) {
              //setErrorMess(true);
            }
          });
      } catch (error) {
        console.log(error);
        //setErrorMess(true);
      }
    } else {
      fetch(
        `https://help-recover-api.herokuapp.com/chat/${route.route.params.senderId}/${route.route.params.recieverId}/${route.route.params.moreInfo}`,
      )
        .then((reponse) => reponse.json())
        .then((json) => {
          if (json.length === 0) {
            chatRoom = chatId();
<<<<<<< HEAD:app/src/Messenger/Chat.js
            if (route.route.params.check === 'offre') {
              moreInfo = route.route.params.iddem;
            } else {
              moreInfo = -1;
=======
            if(route.route.params.check ==="offre"){
              moreInfo =route.route.params.iddem;
            }else {
              moreInfo = -1
>>>>>>> 257583b347aa7dca63cc533fac04b97de3f351e7:app/Messenger/Chat.js
            }

            //chatsRef = db.collection('chats').doc(chatId()).collection('message');
            const requestOptions = {
              method: 'POST',
              headers: new Headers({
                Accept: 'application/json',
                'content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              }),
              body: JSON.stringify({
                senderId: route.route.params.senderId,
                recieverId: route.route.params.recieverId,
                chatId: chatId(),
                contact: moreInfo,
              }),
            };
            try {
<<<<<<< HEAD:app/src/Messenger/Chat.js
              console.log('try request');
              fetch('https://help-recover-api.herokuapp.com/chat/addroom', requestOptions)
=======
              console.log("try request");
              fetch("http://localhost:3000/chat/addroom", requestOptions)
>>>>>>> 257583b347aa7dca63cc533fac04b97de3f351e7:app/Messenger/Chat.js
                .then((response) => response.json())
                .then((data) => {
                  console.log('hello');
                  console.log(data);
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              chatRoom = json[0].roomId;
            } catch (error) {
              console.log(error);
              //  setErrorMess = true;
            }

            // chatsRef = db.collection('chats').doc(json[0].roomId).collection('message');
          }
        })
        .then(() => {
          readUser();

          //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
          try {
            const unsubscribe = chatsRef
              .doc(chatRoom)
              .collection('message')
              .onSnapshot((querySnapshot) => {
                //we listen to the doc changes
                const messagesFirestore = querySnapshot
                  .docChanges()
                  .filter(({type}) => type === 'added')
                  .map(({doc}) => {
                    const message = doc.data();
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return {
                      ...message,
                      createdAt: message.createdAt.toDate(),
                    };
                  })
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                appendMessages(messagesFirestore);
                //the 2 lines above sort the message by creation time so that recent messages are sent first
              });
          } catch (error) {
            console.log(error);
            setErrorMess(true);
          }
          try {
            return () => unsubscribe();
          } catch (error) {
            console.log(error);

            //setErrorMess(true);
          }
        })
        .catch(function () {
          console.log('an error occured');
          setErrorMess(true);
        });
    }

    return async function cleanup() {
      if (moreInfo === 'false') {
        console.log('hzhz');
      } else {
        console.log('bye bye');
      }
    };
  }, []);

  const appendMessages = useCallback(
    //prevent recent message from replacing previouse one
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    },
    [messages],
  );

  async function readUser() {
    //we get the user from async storage
    const user = await AsyncStorage.getItem('user');
    if (user) {
      //  const _id = Math.random().toString(36).substring(7);
      const _id = JSON.parse(user).Id;
      const name = JSON.parse(user).name;
      const avatar = JSON.parse(user).avatar;
      setUser({_id, name, avatar});
    }
  }
  function saveLastMess() {
    recentChats.push(lastMessage);
    console.log(recentChats);
  }
  async function handleSend(messages) {
    lastMessage = messages[0];

    const writes = messages.map((m) => chatsRef.doc(chatRoom).collection('message').add(m));
    await Promise.all(writes);
  }

  return errorMess ? (
    <Text style={styles.erroMess}>Service non disponible</Text>
  ) : (
    <GiftedChat messages={messages} user={user} isTyping={true} maxInputLength={200} onSend={handleSend} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
  erroMess: {
    color: 'red',
    textAlign: 'center',
  },
});
