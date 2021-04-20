import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import database from '@react-native-firebase/database';
import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Date from '../common/Date';

const NewsScreen = ({route}) => {
  const ref = database().ref('News/');
  const [news, setNews] = useState({});

  const {title, image, date, desc, content} = route.params;
  useEffect(() => {
    ref.on('value', snapshot => {
      setNews(snapshot.val());
    });
  }, []);

  const newsKey = Object.keys(news);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{uri: `${image}`}} />
        <View style={styles.contentContainer}>
          <Title>{title}</Title>
          <Date>{date}</Date>
          <Subtitle>{desc}</Subtitle>
          <Subtitle>{content}</Subtitle>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 5,
  },
});
