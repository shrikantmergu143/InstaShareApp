import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform,TouchableOpacity,Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export default function EndStatus() {
        const userId = firebase.auth().currentUser.uid;

        const reference = firebase.database().ref(`/online/${userId}`);
    
        // Set the /users/:userId value to true
        reference.set(true).then(() => console.log('Online presence set'));
    
        // Remove the node whenever the client disconnects
        reference
          .onDisconnect()
          .remove()
          .then(() => console.log('On disconnect function configured.'));
}
