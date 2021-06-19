import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput, FlatList,Platform, Button,Dimensions,TouchableOpacity,KeyboardAvoidingView,ScrollView ,SafeAreaView} from 'react-native'
import moment, { RFC_2822 } from 'moment'

import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const keyboardVerticalOffset=Platform.OS==='ios'?120:100

export default function Password(props) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [password1,setPassword1]=useState('');
  const [message,setMessage]=useState('');

  useEffect(()=>{
    
    
  },[]);
  function ResetPass(email,password,npassword){
    if(password!==npassword){
    const emailCred  = firebase.auth.EmailAuthProvider.credential(email, password);
    firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
    .then(() => {
      // User successfully reauthenticated.
       firebase.auth().currentUser.updatePassword(npassword).then(()=>{
          alert('Password update Seccessfull')
            setMessage('Password Update seccessfull')
            setEmail('')
            setPassword('')
            setPassword1('')
            props.navigation.popToTop();

       })
    })
    .catch(error => {
      // Handle error.
      alert(error)
      setMessage('Check Your Email and Password');
    })
    }
    else{
          if(email=='') alert('Enter Email');
          if(password=='') alert('Enter Old Password');
          if(npassword=='') alert('Enter New Password');
          if(password===npassword){
            alert('Old and New password are same');
                setMessage('Old and New password are same');

          }
    }
  }
    return (
        <View style={{   flex: 1,   alignItems: 'center',fontFamily:'fonts'  }} >
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                     <Text style={{left:15,fontFamily:'fonts'}}>Email</Text>
                </View>
                <TextInput
                   style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    value={email}
                    placeholder="email"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                    <Text style={{left:15,fontFamily:'fonts'}}>Old Password</Text>
                </View>
                <TextInput
                    style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholder="Old Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                    <Text style={{left:15,fontFamily:'fonts'}}>New Password</Text>
                </View>
                <TextInput
                    style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholder="New password"
                    value={password1}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword1(password)}
                />
            </View>
            <View style={{ justifyContent:'center',alignItems:'center',marginTop:20}}>
                <Text style={{color:'#51FF0D',justifyContent:'center', fontSize:20,fontWeight:'1000', top:30}}>{message} </Text>
            </View>
           
            
            <View>
                <TouchableOpacity
                    style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center', margin:30}}
                    onPress={() =>ResetPass(email,password,password1)}
                    
                >   
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Reset</Text>
                    </View>             
                </TouchableOpacity>
            </View>
                
        </View>
    )
}
