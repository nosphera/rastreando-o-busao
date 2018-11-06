import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator ,
    Alert
} from 'react-native';
import Styles from '../styles.js';
import ItemListaVeiculos from '../components/itemListaVeiculos.js'

export default class DetalheLinhaOnibus extends Component {

    constructor(props){
        super(props);
        let linha =  this.props.navigation.getParam('linhaOnibus');
        this.state={linha}
    }
    
    
    render(){
        let _lista = this.state.linha.veiculos
    return(
    <View width="100%" height="100%"  padding={10}>
        <Text>Linha</Text> 
        <Text style={{fontSize:48}}>{this.state.linha.linha}</Text> 
        <Text marginTop={20}>Veículos</Text> 
        <FlatList width="100%" height="100%" 
            data={_lista}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <ItemListaVeiculos item={item} onPress={() =>{Alert.alert('go')}}/> }
          />
    </View>
    );
}

}