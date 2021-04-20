import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Date from '../common/Date';

const NewsScreen = ({navigation}) => {
  const ref = database().ref('News/');
  const [news, setNews] = useState({});

  useEffect(() => {
    ref.on('value', snapshot => {
      setNews(snapshot.val());
    });
  }, []);

  const newsKey = Object.keys(news);

  return (
    <View style={styles.container}>
      <ScrollView>
        {newsKey.map(item => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewsContent', {
                title: news[item].Title,
                date: news[item].Date,
                desc: news[item].Desc,
                image: news[item].Img,
                content: news[item].Content,
              })
            }
            key={item}>
            <Image style={styles.image} source={{uri: `${news[item].Img}`}} />
            <View style={styles.contentContainer}>
              <Title>{news[item].Title}</Title>
              <Date>{news[item].Date}</Date>
              <Subtitle>{news[item].Desc} Read More</Subtitle>
            </View>
          </TouchableOpacity>
        ))}
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
