import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator ,
    Image
} from 'react-native';
import Styles from '../styles';

export default class Splash extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <View style={Styles.container} flexDirection='column' backgroundColor='white'>
            <Image         
                style={{width:"100%"}}
                resizeMode="contain"
                resizeMethod="resize"
                source={require('../images/logo_dnit.png')}
            />
            <ActivityIndicator size={30} opacity={0.5}/>
        </View>
        );
    }

}