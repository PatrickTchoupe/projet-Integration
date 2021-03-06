import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import Form from './SignIn/Form'

import Reinit from './ReinitMdp/ReinitMdp';
// import ReinitP2 from './ReinitMdp/reinitMdpP2';
import ReinitMdp2 from './ReinitMdp/reinitMdpP2';
//import Login from './Login/login'

import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen';
import Chat from './Messenger/Chat';

import Discussion_Repo from './Messenger/Discussionscreen';
import addContact from './Messenger/addContact';
import Login from './Messenger/components/login';
import Profil from './Profil/Profil';

import Succes from './SignIn/Success';
import Form from './SignIn/Form';
import ConfGroup from './Messenger/confGroup';
import GroupChat from './Messenger/groupChat';
import ChatOption from './Messenger/chatOptions';
import MessHeader from './header';
import AddGroupMem from './Messenger/addGroupMem';
import DiscHeader from './discHeader';
import Demande from './demandeFormulaire/Demande';
import ListeDem from './Catalogue/ListeDem';
import mesDemandes from './Catalogue/mesDemandes';
import Proposition from './Catalogue/proposition';
import PropositionA from './Catalogue/propositionAssignee';
import attente from './adminPage/listeAttente';

import Notation2 from './Homescreen/Notation2';
import Notation from './Homescreen/Notation';
import checkProfil from './Profil/checkProfil';
import CodeVeriication from './auth';
import HomeHeader from './HomeHeader';
import VideoWeb from './video';
import Signaler from './signaler'
// Create the navigator
const Stack = createStackNavigator();
function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Connexion"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              marginLeft: '36%',
            },
          }}
        /> */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader />,
          }}
        />

        <Stack.Screen
          name="Code de securite"
          component={CodeVeriication}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              marginLeft: '20%',
            },
          }}
        />
        <Stack.Screen
          name="signaler"
          component={Signaler}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              marginLeft: '20%',
            },
          }}
        />

        <Stack.Screen
          name="Creer un compte"
          component={Form}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              marginLeft: '18%',
            },
          }}
        />
        <Stack.Screen name="chatvideo" component={VideoWeb} />

        <Stack.Screen name="checkProfil" component={checkProfil} />
        <Stack.Screen name="ReinitMdp" component={Reinit} />
        <Stack.Screen name="ReinitMdpP2" component={ReinitMdp2} />
        <Stack.Screen name="succes" component={Succes} />
        <Stack.Screen name="admin" component={attente} />
        <Stack.Screen name="ListeDem" component={ListeDem} />
        <Stack.Screen
          name="Demande"
          component={Demande}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            title: 'Faire une Demande',
            headerTitleStyle: {
              marginLeft: '15%',
            },
          }}
        />
        <Stack.Screen name="Notation" component={Notation} />
        <Stack.Screen name="Notation2" component={Notation2} />
        <Stack.Screen name="mesDemandes" component={mesDemandes} />
        <Stack.Screen name="Proposition" component={Proposition} />
        <Stack.Screen name="PropositionA" component={PropositionA} />
        <Stack.Screen
          name="Ajouter Membres"
          component={AddGroupMem}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="selectioner Membres"
          component={GroupChat}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Creer groupe"
          component={ConfGroup}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Parametres"
          component={ChatOption}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{
            headerStyle: {
              backgroundColor: '#4B86D2',
            },
            headerTintColor: '#fff',
            title: 'Mon Profil',
            headerTitleStyle: {
              marginLeft: '20%',
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: (navigation) => <MessHeader id={navigation} Screen="disc" />,
          }}
        />
        <Stack.Screen name="Succes" component={Succes} />
        <Stack.Screen
          name="Discussion_Repo"
          component={Discussion_Repo}
          options={{
            header: (navigation) => <DiscHeader id={navigation} />,
          }}
        />
        <Stack.Screen
          name="Ajouter un contact"
          component={addContact}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;
