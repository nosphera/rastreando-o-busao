import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator 
} from 'react-native';

export default class Splash extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <View backgroundColor='green' flex={1}>
            <Text>Go Horse</Text> 
            <ActivityIndicator/>
        </View>
        );
    }

}