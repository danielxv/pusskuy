import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../navigation/AuthProvider';

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState(false);


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        status: status,
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your Image has been uploaded to the Firebase Cloud Storage Successfully',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputWrapper}>
        {image != null ? (
          <Image style={styles.AddImage} source={{uri: image}} />
        ) : null}
        <TextInput
          style={styles.InputField}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={content => setPost(content)}
        />
        {uploading ? (
          <View>
            <Text> {transferred} % Completed! </Text>
            <ActivityIndicator size="large" color="#C43131" />
          </View>
        ) : (
          <TouchableOpacity style={styles.SubmitBtn} onPress={submitPost}>
            <Text style={styles.SubmitBtnText}>Post</Text>
          </TouchableOpacity>
        )}
      </View>
      <ActionButton buttonColor="#C43131">
        <ActionButton.Item
          buttonColor="#000"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <FontAwesome5 name="image" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000,
    backgroundColor: '#f5f5f5',
  },
  InputField: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: 900,
    marginBottom: 15,
  },
  AddImage: {
    width: 412,
    height: 250,
    marginBottom: 15,
  },
  StatusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#C43131',
    borderRadius: 5,
    padding: 10,
  },
  SubmitBtnText: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
