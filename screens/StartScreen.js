import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const StartScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>WELCOME!</Text>

      <FormButton
        buttonTitle="Admin"
        onPress={() => navigation.navigate('LoginAdmin')}
      />
      <FormButton
        buttonTitle="User"
        onPress={() => navigation.navigate('Login')}
      />
      <TouchableOpacity style={{ marginTop: 12 }} onPress={() => {
        navigation.navigate('Guest')
        alert('Logged In as Guest')
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#C43131' }}>Continue Without Login</Text>
      </TouchableOpacity>

    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 450,
    width: 450,
    marginTop: -150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 25,
    marginTop: -80,
    color: '#C43131',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#C43131',
  },
});
