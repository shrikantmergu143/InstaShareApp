import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform,TouchableOpacity,Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function Add(props,{ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [w, setWidth] = useState(null);
  const [h, setHeight] = useState(null);
  const [flash,setFlash]=useState("off");
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
 
    
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
   function setF(){
     if(flash==="off"){
       setFlash("on")
     }
     else{
       setFlash('off')
     }
   }
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      setImages(data);
    }
  }
  const flashmode =()=>{
    if (flashMode === 'on') {
      setFlashMode('off');
    } 
    else{
      setFlashMode('on');
    } 
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setHeight(result.height);
      setWidth(result.width);
    }
  };

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return(
      <View style={{width:screenWidth,height:screenHeight}}>
        <View>
                  <TouchableOpacity  style={{margin:10,alignItems:'flex-end'}}
                    onPress={() => props.navigation.navigate('Save', { image,w,h })}
                    >
                        <Text style={{margin:10, fontWeight:'bold', fontSize:22, color:'blue'}}>Upload</Text>
                  </TouchableOpacity>
        </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      {image && <Image source={{ uri: image}} style={{ width:"50%",height:"50%"  }} />}

      <TouchableOpacity style={{ height:360, justifyContent:'center',alignItems:'center'}}  
                    onPress={pickImage}>
                        <View style={{width:65, height:65, borderRadius:65/2, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:40}}>+</Text>
                        </View>
                        
      </TouchableOpacity>
      
    </View>  
    </View>
    );
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1,}}>
      
     {image===null 
     ? 
     <Camera   flashMode={flash} ref={ref => setCamera(ref)} style={{flex:1,height:'100%',width:'100%'}} type={type} >
       <View style={{flexDirection:'row' ,justifyContent:'space-between',alignItems:'center'}}>
          <TouchableOpacity style={{margin:30, alignItems:'center',alignContent:'center',alignSelf:'flex-start'}} onPress={() => setF()} >
                  <FontAwesome name="flash" style={{fontSize:25,alignItems:'center',alignContent:'center',justifyContent:'center',color:flash==="off"?"#000":'#fff'}}  />
          </TouchableOpacity>
          <TouchableOpacity style={{margin:30, alignItems:'flex-end',alignContent:'flex-end',alignSelf:'flex-start'}} onPress={() => props.navigation.popToTop()} >
                  <FontAwesome name="times" style={{color:'#fff',fontSize:25}}  />
          </TouchableOpacity>
        </View>
      <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
        <TouchableOpacity style={{alignSelf: 'flex-end',alignItems: 'center',backgroundColor: 'transparent',}}onPress={() => {setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front: Camera.Constants.Type.back); }}>
          <Icon name="sync" style={{color: "#fff", fontSize: 40,alignItems: 'center',margin:10, }}/>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'flex-end',alignItems: 'center',backgroundColor: 'transparent',}} onPress={() => takePicture()} >
            <View style={{alignItems: 'center',shadowRadius:10,width:50, height:50, borderRadius:50/2, backgroundColor:'#fff',  margin:10, marginHorizontal:screenWidth/8,shadowColor: "#000",shadowOffset: {width: 0,},shadowOpacity: 0.41,shadowRadius: 9.11,elevation: 14,}}>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'flex-end',alignItems: 'center',backgroundColor: 'transparent',}} onPress={() => pickImage()} >
          <FontAwesome name="file-image-o" style={{ alignItems: 'center',  margin:10,color: "#fff", fontSize: 40}} />
        </TouchableOpacity>
      </View>
    </Camera>

        :
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{margin:20,alignItems:'flex-start',alignContent:'flex-start',alignSelf:'flex-start'}} onPress={() => setImage(null)} >
                  <FontAwesome name="times" style={{color:"#0080FF",fontSize:25}}  />
            </TouchableOpacity>
            <TouchableOpacity style={{margin:20,alignItems:'flex-end',alignContent:'flex-end',alignSelf:'flex-end'}} onPress={() => props.navigation.navigate('Save', { image,w,h })} >
                  <FontAwesome name='check' color={"#0080FF"} size={25} style={{top:2}} />
            </TouchableOpacity>
        </View>
        <View style={{flex:1, flexDirection:"row",margin:10}}>
            <Image source={{ uri: image }} style={{ width:"100%",height:"100%",flex:1}}/>
            
        </View>
      </View>
     } 
   
  </View>
  );
}