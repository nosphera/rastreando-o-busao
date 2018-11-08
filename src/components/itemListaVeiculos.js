import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Styles from '../styles.js';

const ItemListaVeiculos = (props)=> 
<TouchableOpacity onPress={props.onPress}>
    <View padding={15} margin={5} backgroundColor={'#CCC'} borderRadius={10} style={Styles.container} justifyContent='flex-start'>
        <Icon name="directions-bus" color="#ccc" size={40} marginRight={30} color={'orange'}/>
        <Text>{props.item.ordem}</Text>
        <Text>{props.item.position.latitude}</Text>
    </View>
</TouchableOpacity>
;

export default ItemListaVeiculos;