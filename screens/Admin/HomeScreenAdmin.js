import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import PostCardAdmin from '../../components/PostCardAdmin';
import firestore from '@react-native-firebase/firestore';

const HomeScreenAdmin = ({navigation},{item}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
      fetchPosts();
    setRefreshing(false);
  }, []);

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, status} = doc.data();
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
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const ListHeader = () => {
    return null;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({item}) => (
          <PostCardAdmin
            item={item}
            onPress={() =>
              navigation.navigate('HomeProfile', {userId: item.userId})
            }
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreenAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
