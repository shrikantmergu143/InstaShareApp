import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity,Button} from 'react-native';

import *as firebase from 'firebase'
import db from '../../config/Firebase'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            username:'',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name,username } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                db.collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        username,
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
        <View style={{   flex: 1,   alignItems: 'center',fontFamily:'fonts'  }} >
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                        <Text style={{left:15,fontFamily:'fonts'}}>Name</Text>
                </View>
                <TextInput
                    style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholder={'your Name'}
                    onChangeText={(name) => this.setState({ name })}
                />
            </View>
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                        <Text style={{left:15,fontFamily:'fonts'}}>User Name</Text>
                </View>
                <TextInput
                    style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholder={'your Name'}
                    onChangeText={(username) => this.setState({ username })}
                />
            </View>
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                     <Text style={{left:15,fontFamily:'fonts'}}>Email</Text>
                </View>
                <TextInput
                   style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}

                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
            </View>
            <View>
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                    <Text style={{left:15,fontFamily:'fonts'}}>Password</Text>
                </View>
                <TextInput
                    style={{height: 50,fontFamily:'fonts', width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center', margin:30}}
                    onPress={() => this.onSignUp()}
                    
                >   
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>SIGNUP</Text>
                    </View>             
                </TouchableOpacity>
            </View>
                
        </View>
        )
    }
}

export default Register
