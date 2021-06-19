import React, { useState, useEffect } from 'react'
import { StyleSheet, View,TextInput,AppState, Text, Image, FlatList, Button,SafeAreaView,Dimensions,TouchableOpacity,ScrollView, ScrollViewBase } from 'react-native'
import  firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment'
import db from './../../config/Firebase';
import { useFonts } from 'expo-font';
import Chat from './Chat';
import UsersPosts from './UsersPosts';
import Icon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

require('firebase/app')
function Feed(props) {
    const [posts, setPosts] = useState([]);
    const [p,setP]=useState([]);
    const [user,setUser]=useState([]);
    const [users,setUsers]=useState([]);
    const [appStateVisible, setAppStateVisible] = useState(AppState.current);
    useEffect(() => {
        // Assuming user is logged in
        db.collection('users')
        .onSnapshot((snapshot)=>{
           snapshot.docs.map(doc=>{
                 fetchPostss(doc.id)
            })
        })

        db.collection("post")
        .orderBy("creation", "desc")
          .onSnapshot((snapshot)=>{
             const post= snapshot.docs.map(doc=>{
                  return doc.data();
              })
              setPosts(post);
              console.log(post);
          })   
            
    }, [])
   
       function fetchPostss(p1){
              db.collection('posts')
                .doc(p1)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .onSnapshot((snapshot)=>{
                    snapshot.docs.map(doc=>{
                        const pp=doc.data();
                        pp.id=doc.id;
                        PostAdd(pp)
                       
                            
                    })
                })
       }
       function PostAdd(post){
                db.collection('post')
                  .doc(post.id)
                  .set(post)        
       }
    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
            const uid=firebase.auth().currentUser.uid

            const len=firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .update({
                likesCount: firebase.firestore.FieldValue.arrayUnion(uid)
            })
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    
            firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .update({
				likesCount: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
			})
    }
    return (

    <View style={{flex:1, width:screenWidth, backgroundColor:'white', justifyContent:'center', alignItems:'center',paddingTop:30}}>
        <View style={{height:50, width:screenWidth,SafeAreaView:5,borderBottomWidth:0.5, borderBottomColor:'rgba(0,0,0,0.1)', alignItems:'center',alignContent:'center',  justifyContent:'space-between', flexDirection:"row",position:'relative'}}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Add')} style={{margin:10,}}>
                    <FontAwesome name="plus-circle" style={{fontSize:27,  }} />
                </TouchableOpacity>
                <Text style={{fontSize:30, fontFamily:'fonts',color:"#0080FF"}} >InstaShare</Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Chat',props)} style={{margin:10, }}>
                    <FontAwesome name="paper-plane" style={{fontSize:27, }} />
                </TouchableOpacity>
        </View>
       <ScrollView>
        <View>
            <FlatList
            numColumns={1}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
                <View>
                    {
                        <UsersPosts style={{paddingTop:5}} navigation={props.navigation.navigate} users={item.user}  posts={item}  uid={item.uid} />
                    }
               </View>
            )}

            />
        </View>
        </ScrollView> 
    </View>
   

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
