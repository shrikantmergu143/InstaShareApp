import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'
import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function Chat(props) {
    const [user,setUser]=useState([]);
    const [users,setUsers]=useState([]);

    useEffect(()=>{

              db.collection("following")
              .doc(firebase.auth().currentUser.uid)
              .collection("userFollowing")
              .onSnapshot((snapshot) => {
                  let following = snapshot.docs.map(doc => {
                      const id = doc.id;
                      return id
                  })
                   setUser(following);
                   
                  for(let i = 0; i < following.length; i++){
                      db.collection("users")
                        .doc(following[i])
                        .get()
                        .then((snapshot) => {
                            if (snapshot.exists) {
                                let user = snapshot.data();
                                user.uid = snapshot.id;

                                setUsers(arr=>[...arr,user])
                            }
                            else {
                                console.log('does not exist')
                            }
                    })
                  }
              })


    },[])
    return (
        <View scrollEnabled={true} style={{height:screenHeight,width:"100%", backgroundColor:'white',fontFamily:'logo-font',borderBottomColor:'lightgrey', borderBottomWidth:0.5,position:'absolute'}}>
                <FlatList
                    style={{width:screenWidth,marginTop:15}}
                    name="scrollone"
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    renderItem={({ item }) => (
                        <View style={{ height:62, backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            {console.log(users)}
                            <TouchableOpacity onPress={() => props.navigation.navigate("UserChat", {uid: item.uid,name:item.name,username:item.username})} style={{ flexDirection:'row'}}  >
                                {item.photo===undefined ?<Image source={require('../../assets/undefined.png')}  style={{width:50,height:50, borderRadius:50/2, margin:10,fontSize:23}} /> : <Image source={{uri:item.photo}} style={{width:50,height:50, borderRadius:50/2, margin:10}} />}
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'bold', fontSize:16,marginTop:19 }}>{item.username}</Text>
                                </View>

                                
                            </TouchableOpacity>
                            <View >
                            <Image source={require('../../assets/camera.png')} style={{width:35,height:35,borderRadius:35/2,fontSize:25,marginRight:15,}} />
                            </View>
                        </View>
                    )}
                />
            
        </View>
    )
}
export default Chat;