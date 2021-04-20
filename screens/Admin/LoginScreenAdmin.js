import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

const LoginScreenAdmin = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {loginAdmin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Admin Only!</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          if(email == 'admin' && password == 'admin'){
            navigation.navigate('HomeScreenAdmin')
          }else {
            alert('Login Failed')
          }
        }}
      />
      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignupAdmin')}>
        <Text style={styles.navButtonText}>Create account here!</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LoginScreenAdmin;

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
    marginTop: -200,
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
