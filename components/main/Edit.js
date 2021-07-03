import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput,Platform, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'
import * as ImagePicker from 'expo-image-picker';
import db from '../../config/Firebase'
import { Camera } from 'expo-camera';
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")

function Edit(props) {
    console.log(props)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(props.route.params.currentUser.photo);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [caption, setCaption] = useState("")
    const [name,setName]=useState("");
    const [username,setUserame]=useState("");
    const [message,setMessage]=useState("");
    
     useEffect(() => {
        if(props.route.params.currentUser.photo !==undefined)
        setImage(props.route.params.currentUser.photo)
    setUserame(props.route.params.currentUser.username)
    setName(props.route.params.currentUser.name)
    {Platform.OS!=='web' ?
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })()
    :
    (async () => {
      if (Platform.OS === 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }
}, []);

    const openLibrary=async ()=>{
        if(image!=undefined){
            const uri = image;
        const childPath = `photo/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot,name,username);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
        }
        setName('')
        setUserame('')
    }
    const savePostData = (downloadURL,name,uname) => {
if(downloadURL!==undefined){
    const f=firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                name:name,
                username:uname,
                photo:downloadURL,
                updation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
        if(f){
            setMessage('Update seccessfull')
        }
        else{
            setMessage('Unseccessfull')
         }
        }
    else{
    const f=firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                name:name,
                username:uname,
                updation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
        if(f){
            setMessage('Update seccessfull')
        }
        else{
            setMessage('Unseccessfull')
         }
    }
    
    }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    return (
        <View style={{flex:1, alignItems:'center'}}>
            {console.log(props)}
                 <Text style={{fontSize: 30, margin: 40,  color:'white'}}>Edit</Text> 
                <View style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        {
                         image==undefined?
                            <TouchableOpacity onPress={pickImage} style={{alignItems: 'center', width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8, backgroundColor:'black', margin:20, marginHorizontal:60,shadowColor: "#000",shadowOffset: {    width: 0,    height: 7,},shadowOpacity: 0.41,shadowRadius: 9.11, elevation: 14,}}>
                                <Image style={{ width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8}} source={{uri: image}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={pickImage}  style={{alignItems: 'center', width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8, backgroundColor:'black', margin:20, marginHorizontal:60,shadowColor: "#000",shadowOffset: {    width: 0,    height: 7,},shadowOpacity: 0.41,shadowRadius: 9.11, elevation: 14,}}>
                                <Image style={{ width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8}} source={{uri: image}}/>
                            </TouchableOpacity>
                        }
                        <TextInput
                            style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                            onChangeText={(ename)=>setName(ename)}
                            value={name}
                            placeholder={'your Name'}
                        />
                        <TextInput
                            style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                            placeholder={'your UserName'}
                            onChangeText={(uname)=>setUserame(uname)}
                            value={username}
                        />
                    </View>
                    
                </View>
               
                <Text style={{color:'#51FF0D', fontSize:20, top:30}}>{message} </Text>
                <TouchableOpacity onPress={openLibrary}  style={{width:screenWidth*.9, alignItems:'center', backgroundColor:'beige', height:60, borderRadius:20, justifyContent:'center', shadowOffset: {width: 5, height: 5},shadowOpacity: 1,elevation: 3,top:100,}}>
                    <Text style={{fontSize: 20, fontWeight:'bold', color:'black', }}>ACCEPT CHANGES</Text>
                </TouchableOpacity>
                
            </View>
    )
}

export default Edit
