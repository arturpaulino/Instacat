import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContextLogged from "./services/ContextUser";

import Icon from 'react-native-vector-icons/FontAwesome';


import ListComments from './screens/ListComments'
import Loading from './components/Loading';
import AddPosts from './screens/AddPost'
import Register from './screens/Register';
import Feed from './screens/Feed';

import Login from './screens/Login';
import Profile from './screens/Profile';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  const [isLogged, logoff, dataUser, setUser, login, creatUser] = useContext(ContextLogged);

  return (
    <AuthStack.Navigator  >

      {dataUser.id != null ?    <AuthStack.Screen name="Perfil" component= {Profile} />:
      <AuthStack.Screen name="Perfil" component= {Login} />}

    </AuthStack.Navigator >
  );
};

const TabBarComponent = (props) => <AuthStackScreen {...props} />;




const AuthStackTabNav = createBottomTabNavigator()
const AuthStackScreenTabNav = ({ params, route }) => {


  return (
    <AuthStackTabNav.Navigator
      tabBarOptions={{
        activeTintColor: '#2980b9',
      }}>

      <AuthStackTabNav.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: ({ color }) =>
          (
            <Icon name='home' size={20} color={color} />
          )
        }}
      />
      <AuthStackTabNav.Screen
        name='AddPhoto'
        component={AddPosts}
        options={{
          title: 'Add Photo',
          tabBarIcon: ({ color }) =>
          (
            <Icon name='camera' size={20} color={color} />
          )
        }}
      />



      <AuthStackTabNav.Screen
        name='PerfilNav'
        children={AuthStackScreen}
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color }) =>
          (
            <Icon name='user' size={20} color={color} />
          )
        }}
      />


    </AuthStackTabNav.Navigator>
  );
};

const Routes = (navigation) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function initialVerifications() {
      isLogged();
      setIsLoading(false);
    }
    initialVerifications()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const Stack = createStackNavigator()


  return (
    <NavigationContainer>
      <Stack.Navigator >

        <Stack.Screen name="Home" component={AuthStackScreenTabNav}   options={{ headerMode: 'none', headerShown: false }} />
        
        <Stack.Screen name="comentarios" component={ListComments} options={{
          title: 'Comentários'
        }} />

        <Stack.Screen name="Registro" component={Register}
          options={{
            title: 'Criar uma conta nova'
          }} />

      </Stack.Navigator>
    </NavigationContainer>



  );
};



export default Routes;
