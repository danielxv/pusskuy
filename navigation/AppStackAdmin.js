import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreenAdmin from '../screens/Admin/HomeScreenAdmin';
import AddPostScreen from '../screens/AddPostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import NewsScreen from '../screens/NewsScreen';
import Portofolio from '../screens/Portofolio';
import NewsDetail from '../screens/NewsDetail';
import AddPorto from '../screens/AddPorto';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Admin"
      component={HomeScreenAdmin}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: 'Post',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomePortofolio"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const NewsStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Esports News"
      component={NewsScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="NewsContent"
      component={NewsDetail}
      options={{
        title: 'News Content',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 5}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const SearchStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#C43131"
              onPress={() => navigation.navigate('AddPorto')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPorto"
      component={AddPorto}
      options={{
        title: 'Post',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Portofolio"
      component={Portofolio}
      options={{
        headerTitle: 'Portofolio',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#C43131',
          fontWeight: 'bold',
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackImage: () => (
          <View style={{marginLeft: 3}}>
            <Ionicons name="arrow-back" size={25} color="#C43131" />
          </View>
        ),
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Text
                style={{color: '#C43131', fontSize: 18, fontWeight: 'bold'}}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#C43131',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={({route}) => ({
          tabBarVisible: 'News',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="newspaper-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({route}) => ({
          tabBarVisible: 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
