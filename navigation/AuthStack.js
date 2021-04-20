import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';
import LoginScreenAdmin from '../screens/Admin/LoginScreenAdmin';
// import SignupAdmin from '../screens/SignupAdmin';
import AppStackAdmin from './AppStackAdmin';
import AppStackGuest from './AppStackGuest';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == true) {
    routeName = 'Start';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#C43131"
                onPress={() => navigation.navigate('Start')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="LoginAdmin"
        component={LoginScreenAdmin}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#C43131"
                onPress={() => navigation.navigate('Start')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Guest"
        component={AppStackGuest}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#C43131"
                onPress={() => {
                  navigation.navigate('Login')
                }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
      name="HomeScreenAdmin"
      component={AppStackAdmin}
      options={({navigation}) => ({
        headerShown: false,
        title: '',
        headerStyle: {
          backgroundColor: '#f9fafd',
          shadowColor: '#C43131',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button
              name="arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#C43131"
              onPress={() => navigation.navigate('Start')}
            />
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="HomeScreenGuest"
      component={AppStackGuest}
      options={({navigation}) => ({
        headerShown: false,
        title: '',
        headerStyle: {
          backgroundColor: '#f9fafd',
          shadowColor: '#C43131',
          elevation: 0,
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <FontAwesome.Button
              name="arrow-left"
              size={25}
              backgroundColor="#f9fafd"
              color="#C43131"
              onPress={() => navigation.navigate('Start')}
            />
          </View>
        ),
      })}
    />
    </Stack.Navigator>
  );
};

export default AuthStack;
