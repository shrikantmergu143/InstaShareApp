import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, } from 'react-native';
import * as firebase from 'firebase'
import { Register } from './Register';
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {
        return (
            
        <View style={{   flex: 1,   alignItems: 'center'}}>
                <View><Text style={{fontSize:35, fontFamily:'fonts',paddingTop:60, marginVertical:60, color:'#0095f6'}}>InstaShare</Text></View>
             <View style={{marginTop:10}}>
             <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                  <Text style={{left:15,padding:10, fontFamily:'fonts'}}>Email</Text>
                </View>
                <TextInput
                 style={{height: 50, width:screenWidth*0.9, fontFamily:'fonts',  color:'black', paddingHorizontal:20, margin:3, borderRadius:10, borderColor:'grey', borderWidth:1}}
                 placeholderTextColor={'grey'}
                 placeholder={'example@example.com'}
                    onChangeText={(email) => this.setState({ email })}
                />
                <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                  <Text style={{left:15,padding:10, fontFamily:'fonts'}}>Password</Text>
                </View>
                <TextInput
                    style={{height: 50, width:screenWidth*0.9,  color:'black', fontFamily:'fonts', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
                    placeholderTextColor={'grey'}
                    placeholder={'Password'}                  
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

               
             </View>
             <View style={{width:screenWidth, justifyContent:'center',alignItems:'center', margin:30}}>
                  <TouchableOpacity style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center'}}
                                      onPress={() => this.onSignUp()}                                      >
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>LOGIN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{alignItems:'center', flexDirection:'row', margin:10}}
                        onPress={ ()=>this.props.navigation.navigate('Register')}
                  >
                    <Text style={{fontSize:18}}>Don't have an account? </Text>
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#0095f6', fontFamily:'fonts'}}>Signup!</Text>
                  </TouchableOpacity>
                  <View style={{position:'absolute', top:150, justifyContent:'center',alignItems:'center',bottom:1}}>
                    <Text style={{fontSize:18, fontFamily:'fonts'}}>from</Text>
                    <Text style={{fontSize:20, fontWeight:'bold', fontFamily:'fonts'}}> Facebook</Text>
                  </View>
              </View>
        </View>
        )
    }
}

export default Login
