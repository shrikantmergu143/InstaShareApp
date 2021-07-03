import React, { useState, useEffect } from 'react'
import { StyleSheet, View,Text, Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'

import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
import Followers from './../users/Followers';
import UsersPosts from './UsersPosts';
import Profiles from './Profiles';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function Profile(props,{navigation}) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
    const [users,setUsers]=useState([]);
    const [ok,setOk]=useState(false);
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
    
            const uid=firebase.auth().currentUser.uid
            firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .update({
				likesCount: firebase.firestore.FieldValue.arrayRemove(uid)
			})
    }
    useEffect(() => {
        const { currentUser, posts } = props;
       
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            db.collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            db.collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "desc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }
        else {
            db.collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            db.collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "desc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = (userToFollow) => {
       db.collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
				following: firebase.firestore.FieldValue.arrayUnion(userToFollow)
			})
        db.collection('users').doc(userToFollow).update({
			followers: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
			})
    }
    const onUnfollow = (userToFollow) => {
       db.collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
            db.collection('users').doc(firebase.auth().currentUser.uid).update({
				following: firebase.firestore.FieldValue.arrayRemove(userToFollow)
			})
            db.collection('users').doc(userToFollow).update({
				followers: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
			})
    }

    const Okfun=(sok)=>{
        if(sok===true){
            setOk(false);
        }
        else{
            setOk(true)
        }
    }
    const onLogout = () => {
        firebase.auth().signOut();
    }

    const onPostDelete=(userid,postid)=>{
        try{
            
           
            db.collection('posts').doc(userid).collection('userPosts').doc(postid).delete()
            alert('Post will Be Deleted')
            props.navigation.navigate('Profile')
            
        }catch(e){
            console.log(e)
        }

    }
    if (user === null) {
        return <View />;
    }
    return (
    
        <View style={{flex:1, backgroundColor:'white', height:screenHeight,}}>
                <View style={{width:'98%', height:120, flexDirection:'row', justifyContent:'space-between',alignItems:'center', backgroundColor:'white'}}>
                            {user.photo===undefined?
                                <Image source={require('../../assets/undefined.png')} style={{width:90, height:90, borderRadius:45, margin:20}}/>
                            :   <Image source={{uri:user.photo}} style={{width:90, height:90, borderRadius:45, margin:20}}/>
                             }
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <View style={{justifyContent:'center',alignItems:'center', margin:15}}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                                        {userPosts.length}
                                    </Text>
                                    <Text style={{fontSize:15}}>
                                        Posts
                                    </Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', margin:15}}>
                                {props.route.params.uid === firebase.auth().currentUser.uid ?
                                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>props.navigation.navigate('Followers',{followers:user.followers})}>
                                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                                            {user.followers===undefined?0:user.followers.length}
                                        </Text>
                                        <Text style={{fontSize:15}}>
                                            Followers
                                        </Text> 
                                    </TouchableOpacity>    
                                    :
                                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                                            {user.followers===undefined?0:user.followers.length}
                                        </Text>
                                        <Text style={{fontSize:15}}>
                                            Followers
                                        </Text> 
                                    </TouchableOpacity>   
                                }
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center', margin:15}}>
                                { props.route.params.uid === firebase.auth().currentUser.uid?
                                  <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>props.navigation.navigate('Following')}>
                                    <Text style={{fontSize:20, fontWeight:'bold'}}>
                                    {props.following===undefined ? 0:props.following.length} 
                                    </Text>
                                    <Text style={{fontSize:15}}>
                                        Following
                                    </Text> 
                                  </TouchableOpacity>    
                                :
                                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} >
                                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                                        {user.following===undefined ? 0:user.following.length} 
                                        </Text>
                                        <Text style={{fontSize:15}}>
                                        Following
                                        </Text> 
                                    </TouchableOpacity>    
                                }     
                                </View>
                    </View>
                </View>                
                <View style={{paddingHorizontal:20, width:'100%',marginBottom:20,borderBottomWidth:0.9,borderBottomColor:'lightblack'}}>
                            <Text style={{fontWeight:"bold", fontSize:16}}>{user.email}</Text>
                            <Text>{user.bio}</Text>
                        
      
                            {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                        <View >
                                 {following ? (
                            <View>
                                <View style={{ width:'100%', flexDirection:'row', justifyContent:'center',marginTop:10 ,padding:10}}>
                               
                                        <TouchableOpacity style={{width:'45%',backgroundColor:'#0095f6', height:35,marginLeft:10,shadowRadius:3, justifyContent:'center',alignItems:'center', borderColor:'grey',marginLeft:15,marginTop:15}} onPress={() => onUnfollow(props.route.params.uid)}>
                                            <Text style={{color:'white', fontSize:15, fontWeight:"bold"}}>FOLLOWING</Text>   
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('UserChats',{uid:props.route.params.uid,name:props.route.params.name,photo:props.route.params.photo})}style={{width:'45%', height:35,shadowRadius:3, justifyContent:'center',alignItems:'center', borderWidth:1, borderColor:'grey',margin:15}} >
                                            <Text style={{color:'black', fontSize:15, fontWeight:"bold"}}>Message</Text>
                                        </TouchableOpacity>                                    
                                    <TouchableOpacity onPress={()=>Okfun(ok)} style={{width:'10%', height:35,shadowRadius:3, justifyContent:'center',alignItems:'center',marginRight:10, borderWidth:1, borderColor:'grey',margin:15}} >
                                        {ok===false?
                                            <FontAwesome name="angle-down" style={{color:'black', fontSize:15, fontWeight:"bold"}}/>
                                            :
                                            <FontAwesome name='angle-up' style={{color:'black', fontSize:15, fontWeight:"bold"}}/>
                                        }
                                    </TouchableOpacity>
                                    {console.log(ok)}
                                </View>
                                {    ok===false?
                                            null
                                                    :
                                            <Profiles  uid={props.route.params.uid} />
                                        }
                            </View>
                            
                                    ) :
                                        (
                                        <Button
                                            style={{marginTop:10 }}
                                            title="Follow"
                                            onPress={() => onFollow(props.route.params.uid)}
                                        />
                                        )}
                        </View>
                            ) :
                            <View style={{height:60, width:'100%', flexDirection:'row', justifyContent:'flex-end' ,marginTop:10}}>
                                <TouchableOpacity 
                                    onPress={()=>props.navigation.navigate('Edit',props)}
                                    style={{width:'45%', height:35, justifyContent:'center',alignItems:'center', borderRadius:7, borderWidth:1, borderColor:'grey',marginRight:15}} >
                                    <Text style={{color:'black', fontSize:19, fontWeight:"bold"}}>Edit profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={()=>onLogout()}
                                    style={{width:'45%', height:35, justifyContent:'center',alignItems:'center', borderRadius:7, borderWidth:1, borderColor:'grey'}} >
                                    <Text style={{color:'black', fontSize:19, fontWeight:"bold"}}>Logout</Text>
                                </TouchableOpacity>
                                
                            </View>  
                            }
                            <View style={{height:40, width:'100%', flexDirection:'row',position:'relative',display:'flex' }}>
                                <TouchableOpacity   style={{width:'50%', height:40, justifyContent:'center',alignItems:'center', borderColor:'grey',borderRightWidth:1,borderRightColor:'grey'}} >
                                    <FontAwesome name="table" color="black" style={{fontSize:40,}} />
                                </TouchableOpacity>
                                <TouchableOpacity  style={{width:'50%', height:40, justifyContent:'center',alignItems:'center', borderColor:'grey'}} >
                                    <Image source={require('../../assets/one.webp')} color="lightblue" style={{height:30,width:30}} />
                                </TouchableOpacity>
                                
                            </View>
            </View>
        <View >
        <ScrollView   horizontal={true}  pagingEnabled={true} style={{width:screenWidth}} >
        <ScrollView  >    
            <FlatList
                    name="scrollone"
                    numColumns={3}
                    style={{width:screenWidth}}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>props.navigation.navigate('UsersPost',{users:user,posts:item,uid:props.route.params.uid})} >
                                <Image source={{ uri: item.downloadURL} } style={{width:screenWidth/3, height:screenWidth/3,margin:3}}/>
                        </TouchableOpacity>
                    )}
             />
             </ScrollView>
                <ScrollView  >
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    name="scrollone"
                    data={userPosts}
                    renderItem={({ item }) => (
                        <UsersPosts style={{paddingTop:5}} navigation={props.navigation.navigate} users={user} posts={item} uid={props.route.params.uid} />
                    )}
                    />
                </ScrollView>    
            </ScrollView>
        </View>    
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
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);
