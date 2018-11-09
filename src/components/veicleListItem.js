import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Moment from 'moment';
import Icon from "react-native-vector-icons/MaterialIcons";
import Styles from '../styles.js';
import Geocoder from 'react-native-geocoder';

const API_KEY = 'AIzaSyCNytZjzJnjQXrNEPY_cEj-_yVKiB7S8yY';
Geocoder.fallbackToGoogle(API_KEY);

export default class ItemListaVeiculos extends Component{

    constructor(props){
        super(props);
        let latPositionIndex = props.item.position.length -1;
        this.state={
            veicle:props.item,
        }        
        
        let latlng = {
            lat:props.item.position[latPositionIndex].latitude, 
            lng:props.item.position[latPositionIndex].longitude        
        }

        Geocoder.geocodePosition(latlng).then((res) => {                            
            console.log(res[0].formattedAddress);
            let _veicle = this.state.veicle;
            _veicle.lastKnownAddress = res[0].formattedAddress;       
            this.setState({veicle:_veicle});                         
        });
    }

    render(){
        return(<TouchableOpacity onPress={this.props.onPress}>
        <View padding={15} margin={5} backgroundColor={'#CCC'} borderRadius={10} style={Styles.container} justifyContent='flex-start'>
                <Icon name="directions-bus" color="#346671" size={60} />
                <View flex={1} marginLeft={10}>
                    <Text style={Styles.listItemTitle}>{this.state.veicle.ordem}</Text>
                    <Text>Atualizado em: {Moment(new Date(this.state.veicle.position[this.state.veicle.position.length -1].datahora)).format('DD/MM/YYYY HH:mm:ss')}</Text>
                    <Text style={Styles.smallText}>{this.state.veicle.lastKnownAddress||''}</Text>
                </View>
            </View>
        </TouchableOpacity>);
    }
}
