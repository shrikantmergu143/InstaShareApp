import React, { Component } from 'react'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View,TextInput, Text, Image, FlatList,Platform, Button,SafeAreaView,Dimensions,TouchableOpacity,ScrollView, ScrollViewBase } from 'react-native'
export default class Post extends Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        image:null,
        Width:null,
        Height:null,
        camera:null,
      }
    
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
        this.getPermissionAsync()
      }
      handleCameraType=()=>{
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        })
      }
    
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
        }
      }
      getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
      }
      pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        })
        console.log(result);

        if (!result.cancelled) {
            this.state.image=result.uri;
            this.state.Height=result.height;
            this.state.Width=result.width;
        }
    }
    takePicture = async () => {
      if (camera) {
        const data = await camera.takePictureAsync(null);
        this.state.image=data.uri;
        this.state.Height=data.height;
        this.state.Width=data.width;
      }
    }
      render(){
        
            const { hasPermission,image,Width,Height } = this.state
            if (hasPermission === null) {
              return <View />;
            } else if (hasPermission === false) {
              return <Text>No access to camera</Text>;
            } else {
                  return (
                    <View style={{ flex: 1 }}>
            {image===null?
                        <Camera ref={ref => this.state.camera=ref} style={{ flex: 1 }} type={this.state.cameraType}>

                            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                                <TouchableOpacity onPress={()=>this.pickImage()} style={{alignSelf: 'flex-end',alignItems: 'center',backgroundColor: 'transparent',}}>
                                    <FontAwesome name="file-image-o" style={{ color: "#fff", fontSize: 40}}  />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.takePicture} style={{alignSelf: 'flex-end',alignItems: 'center', backgroundColor: 'transparent',}}>
                                    <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40}}/>
                                </TouchableOpacity>
                                <TouchableOpacity   onPress={()=>this.handleCameraType()}  style={{alignSelf: 'flex-end',alignItems: 'center',backgroundColor: 'transparent',}}>
                                    <MaterialCommunityIcons name="camera-switch"style={{ color: "#fff", fontSize: 40}}/>
                                </TouchableOpacity>
                            </View>
                        </Camera>
            :
                        <View>
                          <Image source={{uri:image}} color="lightblue" style={{height:Height,width:Width}} />
                        </View>
            }
                    </View>
                );
                }
            }
      
        
}
