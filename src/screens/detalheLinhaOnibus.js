import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Styles from '../styles.js';
import ItemListaVeiculos from '../components/itemListaVeiculos.js'

export default class DetalheLinhaOnibus extends Component {

    constructor(props){
        super(props);
        let linha =  this.props.navigation.getParam('linhaOnibus');
        this._atualizaVeiculo = this._atualizaVeiculo.bind(this);
        this.state={linha}
        this.props.screenProps.Emitter.on('atualizaVeiculo', this._atualizaVeiculo);
    }
    
    componentWillUnmount = ()=>{
        this.props.screenProps.Emitter.emit('atualizaLinha', this.state.linha);
    }

    _atualizaVeiculo = (_veiculo)=>{        
        var _linha = this.state.linha;
        let posVeiculo = _linha.veiculos.findIndex(val => val.ordem == _linha.ordem ) ;
        if(posVeiculo > -1){
            _linha.veiculos[posVeiculo].position = _veiculo.position;
            this.setState({linha:_linha, loading:false})
        }
    }
    
    render(){
        if(this.state.loading){ 
            return(<ActivityIndicator size={100}/>)
        }

        let _lista = this.state.linha.veiculos
        return(
        <View width="100%" height="100%"  padding={10}>
            <Text>Linha</Text> 
            <Text style={{fontSize:48}}>{this.state.linha.linha}</Text> 
            <Text marginTop={20}>Veículos</Text> 
            <FlatList width="100%" height="100%" 
                data={_lista}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <ItemListaVeiculos item={item} onPress={()=>{ this.props.navigation.navigate('DetalhesVeiculo', {veiculo: item,atualizaCallback:this._atualizaVeiculo});}} /> }
            />
        </View>
    );
}

}