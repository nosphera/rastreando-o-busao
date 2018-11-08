import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Moment from 'moment';
import Icon from "react-native-vector-icons/MaterialIcons";
import Styles from '../styles.js';

const ItemListaVeiculos = (props)=> 
<TouchableOpacity onPress={props.onPress}>
    <View padding={15} margin={5} backgroundColor={'#CCC'} borderRadius={10} style={Styles.container} justifyContent='flex-start'>
        <Icon name="directions-bus" color="#ccc" size={40} marginRight={30} color={'orange'}/>
        <View flex={1}>
          <Text>{props.item.ordem}</Text>
          <Text>Atualizado em: {Moment(new Date(props.item.position[props.item.position.length -1].datahora)).format('DD/MM/YYYY HH:mm:ss')}</Text>
        </View>
    </View>
</TouchableOpacity>
;

export default ItemListaVeiculos;