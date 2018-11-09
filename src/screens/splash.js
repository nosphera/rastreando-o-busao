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
            <ActivityIndicator size={30} opacity={0.5} />
            <Image         
                style={{width:"70%"}}
                resizeMode="contain"
                source={require('../images/logo_rjbus.png')}
            />
        </View>
        );
    }

}