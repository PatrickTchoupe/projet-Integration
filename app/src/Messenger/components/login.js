/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Button, TextInput, View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Login(props) {
  const [username, setusername] = useState(' ');
  //const [user, setUserId] = useState("")

  const onLogin = async () => {
    // eslint-disable-next-line no-undef
    fetch(`https://help-recover-api.herokuapp.com/contacts/${username}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);
        const name = json[0].Nom;
        const Id = json[0].Id;
        const avatar = json[0].PhotoProfil;
        // setUserId(json[0].Id);

        const user = {Id, name, avatar};
        AsyncStorage.setItem('user', JSON.stringify(user));
        props.navigation.navigate('HomeScreen', {userid: json[0].Id});
      });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder={'Email'} onChangeText={(text) => setusername(text)} style={styles.input} />
      <TextInput placeholder={'Mot de passe'} style={styles.input} />
      <View style={styles.login}>
        <Button title="Connexion" onPress={onLogin} />
      </View>
      <View style={styles.touchSign}>
        <Button title="Créer un compte" color="green" onPress={() => props.navigation.navigate('signup')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
  },
  login: {
    marginTop: 20,
    width: 300,
  },
  touchSign: {
    backgroundColor: 'red',
    marginTop: 60,
    width: 300,
  },
});
