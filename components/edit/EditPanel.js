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

export default function EditPanel(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [following, setFollowing] = useState(false)
    const [users,setUsers]=useState([]);
    const [ok,setOk]=useState(false);
    const [admin,setAdmin]=useState([]);

    useEffect(()=>{
        firebase.database().ref('admin').on('value',(snapshot)=>{
            setAdmin(snapshot.val());
        })
        db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        const user=snapshot.data();
                        user.uid=snapshot.id;
                        setUser(user);
                    }
                    else {
                        console.log('does not exist')
                    }
                })
                
    },[0])
    const onLogout = () => {
        firebase.auth().signOut();
    }
   
    return (
        <View  style={{flex:1, width:screenWidth,height:screenHeight, backgroundColor:'white',fontFamily:'logo-font'}}>
            <View style={{height:60, width:screenWidth, borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth:0.7,  justifyContent:'flex-start', flexDirection:"row",position:'relative'}}>
                <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}} >
                    <Text style={{fontSize:20,fontWeight:'bold',margin:15}}>{user.username}</Text>
                </View>
            </View>
            {console.log(firebase.auth().currentUser.uid)}
        <KeyboardAvoidingView behavior={Platform.OS==='ios'?"padding":null} keyboardVerticalOffset={keyboardVerticalOffset} style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center',borderLeftColor:'grey',borderLeftWidth:0.7,width:screenWidth,height:screenHeight}}>
                <View style={{flex:1,alignSelf:'baseline',alignItems:'baseline'}}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Password',props)} style={{ height:40,marginTop:10,flexDirection:'row',alignSelf:'center',alignItems:'center'}} >
                            <FontAwesome name="edit"  style={{fontSize:30,margin:10}} />
                            <Text fontSize={30} >Change Password</Text>
                    </TouchableOpacity >
                     <TouchableOpacity onPress={()=>props.navigation.navigate('Email')} style={{height:40,flexDirection:'row',alignItems:'center'}} >
                            <FontAwesome name="edit"  style={{fontSize:30,margin:10}} />
                            <Text fontSize={30} >Change Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Edit',props.route.params)} style={{height:40,flexDirection:'row',alignItems:'center'}} >
                            <FontAwesome name="edit"  style={{fontSize:30,margin:10}} />
                            <Text fontSize={30} >Edit Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('SavedPost',props)} style={{height:40,flexDirection:'row',alignItems:'center'   }} >
                        <FontAwesome name='bookmark'  style={{fontSize:30,margin:10}} />
                            <Text fontSize={30} >Saved</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>onLogout()} style={{height:40,flexDirection:'row',alignItems:'center'   }} >
                        <FontAwesome name='sign-out'  style={{fontSize:30,margin:10}} />
                            <Text fontSize={30} >Logout</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
        </View>
    )
}
