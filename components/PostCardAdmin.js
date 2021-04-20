import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import RadioButtonRN from 'radio-buttons-react-native';


const PostCardAdmin = ({item, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [kategori, setKategori] = useState('')
  const data = [
    {
      label : 'Mobile Legends'
    },
    {
      label : 'Free Fire'
    },
    {
      label : 'PUBG Mobile'
    },
    {
      label : 'Wild Rift'
    },
    {
      label : 'Call Of Duty Mobile'
    },
  
  ]

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const updateStatus = () => {
      firestore().collection('posts')
      .doc(item.id)
      .update({
        status: true,
        category: kategori,
      })
  }

  const handleUpdate = async () => {
  };

  useEffect(() => {
    getUser();
    handleUpdate();
  }, []);

  const checkStatus = ({item}) => {
    if(item.status == false){
      return (
        <View>
          <RadioButtonRN
        data={data}
        box={false}
        selectedBtn={(e) => setKategori(e.label)}
      />
          <TouchableOpacity style={{ marginTop : 10, flex: 1, backgroundColor: '#C43131', justifyContent: 'center', alignSelf: 'center', borderRadius: 40, height: 40, width: 200 }}
          onPress={() => {
            updateStatus();
            getUser();
          }}
          >
            <Text style={{ alignSelf: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>Verify</Text>
          </TouchableOpacity>

        </View>
      )}
      else{
        return (
          <View></View>
        )
        
      }
  }

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        
        <View style={styles.userInfoText}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.userName}>
              {userData ? userData.uname || '' : ''}
            </Text>
          </TouchableOpacity>
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
      
      <View style={{ marginVertical: 20 }}>
        {checkStatus({item})}
      
      </View>
    </View>
  );
};

export default PostCardAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    flex : 1,
    width: 380,
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfo: {
    flex : 1,
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
