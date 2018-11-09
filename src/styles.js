import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    smallText:{
      fontSize:10,
    },
    listItemTitle:{
      fontSize:25,
    },
    listItemTitleXLarge:{
      fontSize:50,
    },
  });

  export default Styles;