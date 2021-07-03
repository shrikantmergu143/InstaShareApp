import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'
import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
export default function Likes(props) {
    const [user,setUser]=useState([]);
    const [likes,setLikes]=useState([]);
    const [post,setPost]=useState(props.route.params.posts);
    useEffect(()=>{
          db.collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('likes')
            .onSnapshot((snapshot)=>{
           let like=snapshot.docs.map(doc=>{
                    
                    const user=doc.id;
                    fetchUsersss(user);
                    return user;
                })
                setLikes(like)
            })
    },[])
    function fetchUsersss(m){
        db.collection("users")
                .doc(m)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;
                        setUser(arr=>[...arr,user]);
                    }
                    else {
                        console.log('does not exist')
                    }
                })
    }
    return (
        <View  style={{width:screenWidth,height:screenHeight,flex:1}} >
            <View style={{flex:1,borderBottomColor:'grey',borderBottomWidth:2,}}>
                <Image style={{width:"50%", height:"80%",margin:3,alignContent:'center',alignItems:'center',alignSelf:'center' }} source={{ uri: post.downloadURL }} />
                <View style={{alignSelf:'baseline',alignItems:'baseline',flexDirection:'row'}}>
                    <Text  style={{fontSize:25,fontWeight:'bold',margin:8}}>{post.likesCount.length}</Text>
                    <Text style={{marginBottom:8,color:'black',fontWeight:'bold',fontSize:20}} >Likes</Text>
                </View>
            </View>
            <View style={{flex:1}}>
            <FlatList
                    style={{flex:1}}
                    name="scrollone"
                    data={user}
                    renderItem={({ item }) => (
                        <View style={{ height:62, backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginTop:5}}>
                            {console.log(user)}
                            <TouchableOpacity onPress={() => props.navigation.navigate("Profile", {uid: item.uid})} style={{ flexDirection:'row'}}  >
                                {item.photo===undefined ?<Image source={require('../../assets/undefined.png')}  style={{width:50,height:50, borderRadius:50/2, margin:10,fontSize:23}} /> : <Image source={{uri:item.photo}} style={{width:50,height:50, borderRadius:50/2, margin:10}} />}
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'bold', fontSize:16,marginTop:19 }}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        )}
            />
                        {console.log(user)}
            </View>
        </View>
    )
}