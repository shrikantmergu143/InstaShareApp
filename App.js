import { StatusBar } from 'expo-status-bar';
import React, { Component, } from 'react';

import { View, Text,TouchableOpacity,Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
import db from './config/Firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'
import EditScreen from './components/main/Edit'
import ChatScreen from './components/main/Chat'
import UserChatScreen from './components/main/UserChat'
import UserChatScreens from './components/main/UserChats'
import FollowingScreen from './components/main/Following'
import FollowersScreen from './components/main/Followers'
import UserPost from './components/main/UsersPosts'
import UserPosts from './components/main/UsersPost'
import  * as Font  from 'expo-font';
import Explore from './components/main/Explore';
import SavedPost from './components/main/SavedPost'
import Post from './components/main/Post'
import Admin from './components/main/Admin';
import Likes from './components/main/Likes';
import EditPanel from './components/edit/EditPanel';
import Password from './components/edit/Password';
import Email from './components/edit/Email';
const Stack = createStackNavigator();
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }
  state = {
    fontsLoaded: false,
  };
  async _loadFontsAsync() {
    this.setState({ fontsLoaded: true });
  }
  
  componentDidMount() {
    Font.loadAsync({
      'fonts': require('./assets/fonts/Lobster-Regular.ttf'),
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
 
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ justifyContent:'center',alignItems:'center'}}>
          <View style={{  justifyContent: 'center',alignItems:'center',marginTop:screenHeight/2, }}>
            <FontAwesome name='instagram' color={'red'} size={75}  />
          </View>
          <View style={{position:'absolute', top:screenHeight*0.98, justifyContent:'center',alignItems:'center',bottom:1}}>
          
                    <Text style={{fontSize:18}}>from</Text>
                    <Text style={{fontSize:20, fontWeight:'bold'}}> Facebook</Text>
                  </View>
      </View>  
      
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:true}} navigation={this.props.navigation} />
            <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} options={{ headerShown:false}} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
     
  
    return (
      
      <Provider store={store}>
        <NavigationContainer >

          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main"  component={MainScreen} options={{headerShown:false }} navigation={this.props.navigation}/>
            <Stack.Screen name="Add"  component={AddScreen} options={{headerShown:false}} navigation={this.props.navigation}/>  
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} options={{ headerShown: true, headerTitle:'See your post', }}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Edit" component={EditScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="EditPanel" options={{ headerShown: true, headerTitle:'Settings', }} component={EditPanel} navigation={this.props.navigation}/>
            <Stack.Screen name="Chat"  component={ChatScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Following"  component={FollowingScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Followers"  component={FollowersScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="UserChat"  options={{headerShown:false }} component={UserChatScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="UserChats"  options={{headerShown:false }} component={UserChatScreens} navigation={this.props.navigation}/>
            <Stack.Screen name="UsersPosts"  component={UserPost} navigation={this.props.navigation}/>
            <Stack.Screen name="UsersPost" options={{  headerShown: true, headerTitle:'Post',title:'Post' }}  component={UserPosts} navigation={this.props.navigation}/>
            <Stack.Screen name="Explore"  component={Explore} navigation={this.props.navigation}/>
            <Stack.Screen name="SavedPost"  component={SavedPost} navigation={this.props.navigation}/>
            <Stack.Screen name="Post"  component={Post} navigation={this.props.navigation}/>
            <Stack.Screen name="Password"  options={{  headerShown: true, headerTitle:'Change Password',}}  component={Password} navigation={this.props.navigation}/>
            <Stack.Screen name="Email"  options={{  headerShown: true, headerTitle:'Email change' }}  component={Email} navigation={this.props.navigation}/>
           
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
     ) 
    
    
  }
}


export default App
