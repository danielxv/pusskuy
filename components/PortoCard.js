import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const PortoCard = ({item, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.card} key={item.id}>
      <View style={styles.userInfo}>
        <View style={styles.userInfoText}>
          <Text style={styles.postTime}>
            {moment(item.postTime.toDate()).fromNow()}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.postImg != null ? (
        <Image style={styles.postImg} source={{uri: item.postImg}} />
      ) : (
        <View style={styles.divider} />
      )}
    </View>
  );
};

export default PortoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    width: 380,
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  postImg: {
    width: 381,
    height: 250,
    marginTop: 15,
  },
  divider: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    width: 92,
    alignSelf: 'center',
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'transparent',
  },
});
