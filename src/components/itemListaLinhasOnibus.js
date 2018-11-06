import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Styles from '../styles.js';

const ItemListaLinhasOnibus = (props)=> 
<TouchableOpacity onPress={props.onPress}>
    <View padding={15} margin={5} backgroundColor={'#CCC'} borderRadius={10} borderBottomWidth={2} style={Styles.container} justifyContent='flex-start'>
        <Icon name="bus-clock" size={40} marginRight={50} color={'#3AF'}/>
        <Text paddingLeft={30} flex={1}>     {props.linha.linha + ' - ' + props.linha.veiculos.length} Veículos</Text>
    </View>
</TouchableOpacity>
;

export default ItemListaLinhasOnibus;