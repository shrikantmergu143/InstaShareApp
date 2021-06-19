import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform,View,Text,KeyboardAvoidingView,AutoTags,Image,TextInput, FlatList, Button,Dimensions,TouchableOpacity,ScrollView ,SafeAreaView} from 'react-native'
import moment from 'moment'
import db from '../../config/Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons';
require('firebase/firestore')
import uuid from "uuid";

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height
const keyboardVerticalOffset=Platform.OS==='ios'?120:100

export default function Chats(props) {
    console.log(props)
    return (
        <View style={{ flexDirection:'row',  alignItems:'center',width:screenWidth}} >
                            {props.users.uid===props.messages.sendBy && props.user.uid===props.messages.sendTo
                            ?     
                            <View style={{alignItems:"flex-start",alignContent:"flex-start"}}>
                                <View style={{height:50,width:screenWidth,flexDirection:'row',justifyContent:'flex-start',alignItems:"flex-end",alignContent:"flex-end"}}>
                                    {props.users.photo===undefined
                                    ?
                                        <Image source={require('../../assets/undefined.png')}   style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                    :
                                        <Image source={{uri:props.users.photo}}  style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                    }
                                    <View style={{width:props.messages.message*50, height:30, borderRadius:20,marginTop: 15,borderBottomLeftRadius:2/5, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center'}}>
                                        <Text  style={{paddingBottom:12,fontSize: 16, lineHeight: 20, marginTop: 15,  marginBottom: 5, marginLeft: 10, marginRight: 10,color:'white'}}>{props.messages.message}</Text>
                                    </View>
                                </View>
                                <Text style={{fontSize:13,fontWeight:'bold',color:'grey'}}>{moment(props.messages.sendAt).format('LT')}</Text>
                            </View>    
                            :
                    null                            }
                            {props.users.uid===props.messages.sendTo && props.user.uid===props.messages.sendBy
                                ?                            
                                <View style={{alignItems:"flex-end",alignContent:"flex-end"}}>
                                    <View style={{height:50,width:screenWidth,flexDirection:'row',justifyContent:'flex-end',alignContent:'flex-start',alignItems:'flex-start'}}>
                                        <View style={{width:props.messages.message*50, height:30, borderRadius:20,borderBottomRightRadius:2/5, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{paddingBottom:20,fontSize: 16, lineHeight: 20, marginTop: 22,  marginBottom: 5, marginLeft: 10, marginRight: 10,color:'white'}}>{props.messages.message}</Text>
                                        </View>
                                        {props.user.photo===undefined
                                        ? 
                                            <Image  source={require('../../assets/undefined.png')}  style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> 
                                        :   
                                             <Image source={{uri:props.user.photo}}  style={{width:30,height:30, borderRadius:30/2,marginLeft:15,margin:12}} /> }
                                    </View>
                                <Text style={{fontSize:13,fontWeight:'bold',color:'grey'}}>{moment(props.messages.sendAt).format('LT')}</Text>
                                </View>    
                                :
                    null                                }
                                   </View>
    )
}
