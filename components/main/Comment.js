import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform,View,Text,KeyboardAvoidingView,AutoTags,Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
import * as  firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'
import db from './../../config/Firebase';
const keyboardVerticalOffset=Platform.OS==='ios'?120:100

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS==='ios'?"padding":null} keyboardVerticalOffset={keyboardVerticalOffset} style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={{ flexDirection:'row',  alignItems:'center'}} >
                        <View style={{alignItems:"flex-start",alignContent:"flex-start"}}>      
                            <View style={{height:50,width:screenWidth, backgroundColor:'white',flexDirection:'row',justifyContent:'flex-start',alignItems:"flex-end",alignContent:"flex-end"}}>
                               {item.user === undefined ?
                                    <Image source={require('../../assets/undefined.png')}   style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                :
                                <TouchableOpacity>
                                    {item.user.photo === undefined 
                                     ?
                                        <Image source={require('../../assets/undefined.png')}   style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                     :
                                        <Image source={{uri:item.user.photo}}  style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                    }
                                </TouchableOpacity>
                               }
                                {item.user !== undefined ?
                                    <Text style={{paddingBottom:10,margin:10}} >
                                    {item.user.username} :
                                    </Text>
                                    : null
                                }
                                <Text style={{margin:10}}>{item.text}</Text>
                             </View>
                        </View>
                    </View>
                )}
            />

            <View style={{alignContent:'center',backgroundColor:'white',borderTopWidth:0.5,borderTopColor:'grey',alignItems:'center',flexDirection:"row"}}>
                <TextInput  style={{height: 50, width:'85%',borderRadius:50/2,  color:'black', paddingHorizontal:20,paddingVertical:10, margin:3, borderRadius:10, borderColor:'grey',color:'black'}}
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)} />
                <Button style={{height:50,width:'20%'}}
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>

        </KeyboardAvoidingView  >
    )
}


const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
