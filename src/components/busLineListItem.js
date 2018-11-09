import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Styles from '../styles.js';

const ItemListarjbus = (props)=> 
                <TouchableOpacity onPress={props.onPress}>
                    <View padding={15} margin={5} backgroundColor={'#CCC'} borderRadius={10} borderBottomWidth={2} style={Styles.container} justifyContent='flex-start'>
                        <Icon name="bus-clock" size={75} marginRight={50} color={'#346671'}/>
                        <View flex={1} marginLeft={10}>
                            <Text flex={1} style={Styles.listItemTitleXLarge}>{props.linha.linha}</Text>
                            <Text style={Styles.smallText}>{props.linha.veiculos.length} Veículos</Text>
                        </View>
                    </View>
                </TouchableOpacity>;

export default ItemListarjbus;