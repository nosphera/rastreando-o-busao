import React, { Component } from "react";
import {WebView , ActivityIndicator, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Geocoder from 'react-native-geocoder';

const API_KEY = 'AIzaSyCNytZjzJnjQXrNEPY_cEj-_yVKiB7S8yY';
Geocoder.fallbackToGoogle(API_KEY);

var atualizarPosicao={};

export default class DetalheVeiculo extends Component {
  static navigationOptions= {
    title: 'Posição do Veículo',
    headerRight: (
      <TouchableOpacity onPress={()=>{atualizarPosicao()}}>
        <View width={50}>
          <Icon name="cached"  size={30} color={'#3AF'}/>
        </View>
      </TouchableOpacity>
    ),
  }

  constructor(props) {
    super(props);
    let _veiculo = this.props.navigation.getParam('veiculo');
    this.state={
        veiculo:  _veiculo,
        loading:true,
        urlMapa:'',  
      }  
    this._ajustaUrlMapa(_veiculo);
    atualizarPosicao = this._btnAtualizarPosicaoHandler.bind(this);   
  }

  _btnAtualizarPosicaoHandler = ()=>{
    this._atualizarCoordenada();
  }

  _ajustaUrlMapa = (_veiculo) => {
    if(_veiculo.position.length > 0){
      let posicaoAtual={
        lat: _veiculo.position[_veiculo.position.length - 1].latitude||0,
        lng: _veiculo.position[_veiculo.position.length - 1].longitude||0,
      }
  
      Geocoder.geocodePosition(posicaoAtual).then(res => {
          let _uri = 'https://www.google.com/maps/search/?api=1&key='+API_KEY+'&query='+res[0].formattedAddress.replace(/\s/g, "+");
          console.log(_uri);
          this.setState({urlMapa: {uri: _uri},loading:false, veiculo:_veiculo});
      });
    }else{
      this.setState({loading:false});
    }
  }
  componentDidMount = ()=>{   
    this.timer = setInterval(()=>{if(this.mounted){this._atualizarCoordenada()}},60000); 
    this._atualizarCoordenada();
  }

  componentWillUnmount = async()=>{
    this.props.screenProps.Emitter.emit('atualizaVeiculo', this.state.veiculo);
    clearInterval(this.timer);
  }

  _atualizarCoordenada = ()=>{
    return this.setState({loading:true}, ()=>{
      fetch('http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterPosicoesDoOnibus/'+this.state.veiculo.ordem.toString(),{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response)=>{ 
          let responseJson = JSON.parse(response._bodyText).DATA;
          console.log(responseJson);
          let _veiculo = this.state.veiculo;
          try{
            if(this.state.veiculo.position[_veiculo.position.length - 1].datahora != responseJson[responseJson.length - 1][0]){
              _veiculo.position.push({
                datahora: responseJson[responseJson.length - 1][0] ,
                latitude: responseJson[responseJson.length - 1][3],
                longitude: responseJson[responseJson.length - 1][4],                                    
                velocidade: responseJson[responseJson.length - 1][5]
              });
            }
            this._ajustaUrlMapa(_veiculo);
          }
          catch(error){
            console.log(error);
          }
        })
        .catch((error)=>{
          console.log(error);
        });
    });
  }

  render() {
    if(this.state.loading){
      return(<ActivityIndicator size={100} marginTop={200}/>);
    }
    return (     
      <View width="100%" height="114%">   
          {this.state.loading && <ActivityIndicator size={100}/>}     
          {!this.state.loading &&<WebView width="100%" height="100%"
          source={this.state.urlMapa}
          style={{marginTop: -55}}       
          />}
      </View> 
    );
  }
}