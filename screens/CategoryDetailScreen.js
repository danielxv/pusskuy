import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import PostCard from '../components/PostCard';
import firestore from '@react-native-firebase/firestore';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const CategoryDetailScreen = ({navigation, route}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const {cat} = route.params;

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, status, category} = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: '',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              status,
              category,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    // console.log(cat)
  }, []);

  const ListHeader = () => {
    return null;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          if(item.status == true && item.category == `${cat}`){
            return (
              <PostCard
                item={item}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )
          }}}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
