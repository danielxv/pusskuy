import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import Title from '../common/Title';
import Subtitle from '../common/Subtitle';
import Date from '../common/Date';

const SearchScreen = ({navigation}) => {
  const ref = database().ref('News/');
  const [news, setNews] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    ref.on('value', snapshot => {
      setNews(snapshot.val());
    });
  }, []);

  const newsKey = Object.keys(news);

  return (
    <View>
      <View
        style={{
          backgroundColor: '#FFF',
          borderRadius: 25,
          padding: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Search?"
          placeholderTextColor="#B0B0B0"
          onChangeText={text => setSearch(text.toLowerCase())}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: '#E5E5E5',
          paddingHorizontal: 25,
          marginTop: 5,
        }}>
        {newsKey.map(item => {
          if (news[item].Title.toLowerCase().includes(search)) {
            return (
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
                <Image
                  style={styles.image}
                  source={{uri: `${news[item].Img}`}}
                />
                <View style={styles.contentContainer}>
                  <Title>{news[item].Title}</Title>
                  <Date>{news[item].Date}</Date>
                  <Subtitle>{news[item].Desc} Read More</Subtitle>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

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
