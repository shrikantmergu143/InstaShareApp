import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'
import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function Notification(props) {
  const [user,setUser]=useState([]);
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    db.collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
        func(snapshot.data())
      })
  },[0])

  function func(user){
    const u=[]
    const uid=user.followers
    for(let i=0;i<uid.length;i++)
    {
        db.collection("users")
        .doc(uid[i])
        .get()
        .then((snapshot) => {
        if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            u.push(user)
            
        }
        
    
        })
    }
    setUsers(u);
          
}   
  return(
    <View style={{height:screenHeight,width:screenWidth, backgroundColor:'white',fontFamily:'logo-font',borderBottomColor:'lightgrey', borderBottomWidth:0.5,position:'absolute'}}>
        {console.log(users)}
            <FlatList
                style={{width:screenWidth,height:screenWidth,marginTop:15,}}
                name="scrollone"
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <View style={{ height:65, backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Profile", {uid: item.uid})} style={{ flexDirection:'row'}}  >
                            {item.photo===undefined ?<Image source={require('../../assets/undefined.png')}  style={{width:50,height:50, borderRadius:50/2, margin:10,fontSize:23}} /> : <Image source={{uri:item.photo}} style={{width:50,height:50, borderRadius:50/2, margin:10}} />}
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontWeight:'bold', fontSize:16,marginTop:10 }}>{item.username}</Text>
                                <Text style={{fontWeight:'bold', fontSize:16,marginLeft:50 }}>Is Following you</Text>
                            </View>

                            
                        </TouchableOpacity>
                        
                    </View>
                )}
            />
        
    </View>
  )
}