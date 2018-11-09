import React, {Component} from 'react';
import {Alert,View,TouchableOpacity,FlatList,ActivityIndicator,AsyncStorage} from 'react-native';
import Styles from '../styles';
import BusLineListItem from '../components/busLineListItem.js';
import Icon from "react-native-vector-icons/MaterialIcons";

var atualizarLista={};

export default class ListarLinhas extends Component {
    static navigationOptions= {
        title: 'Linhas de Onibus',
        headerRight: (
          <TouchableOpacity onPress={()=>{atualizarLista()}}>
            <View width={50}>
              <Icon name="cached" size={30} color={'#3AF'}/>
            </View>
          </TouchableOpacity>
        ),
      }

    constructor(props){
        super(props);
        this.linhas=[];
        this.state={            
            listalinhas:this.linhas,
            loading:true,
        }
        atualizarLista = this._refreshBotaoLista.bind(this);
        this._atualizaLinha = this._atualizaLinha.bind(this);
        this.props.screenProps.Emitter.on('atualizaLinha', this._atualizaLinha);
    }

    _refreshBotaoLista = ()=>{
        if(!this.state.loading){
            this.linhas=[];
            this.setState({listalinhas:[],loading:true,},()=>{this._fetchBusLinesList()});
        }
    }

    componentWillUnmount = ()=>{
        this.props.screenProps.Emitter.off('atualizaLinha', this._atualizaLinha);
    }

    componentDidMount = ()=>{        
        this._fetchBusLinesList();
        AsyncStorage.getItem('linhas', (error, result)=>{
            if(result && result !=''){               
                this.setState({listalinhas:JSON.parse(result), loading:false});
            }
        });
    }

    _fetchBusLinesList = function (){
        return fetchDados() 
        .then(filtraLinhas)
        .then(processaLinhas)
        .then((result)=>{this._gravarLinhas(result)})
        .catch((error) =>{
            console.log('Erro ao listar as linhas de onibus: ', JSON.stringify(error));
        });

        function fetchDados(){
            return fetch('http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/onibus',{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })}

        function filtraLinhas(response) {
            let responseJson = JSON.parse(response._bodyText).DATA;
            return new Promise(resolve => resolve(responseJson.filter(x => x[2] != "")));
        }

        function processaLinhas(linhas) {            
            this.linhas = [];
            return new Promise((resolve, reject) => {
                linhas.forEach(linha => {
                    if(!(this.linhas.findIndex(val => val.linha == linha[2]) > -1))   {
                        let _veiculos = linhas.filter(x => x[2] == linha[2]).map((reg) => {
                            return({                               
                                ordem: reg[1],
                                linha:reg[2],
                                position:[{
                                    datahora: reg[0] ,
                                    latitude: reg[3],
                                    longitude: reg[4],                                    
                                    velocidade: reg[5],
                                    direcao: reg[6],
                                }],
                            });
                        });
    
                        let ObjLinha ={ 
                                        index:this.linhas.length, 
                                        linha:linha[2],
                                        veiculos: _veiculos, 
                                        }
                            
                        this.linhas.push(ObjLinha);
                    }                    
                });
                resolve(this.linhas)
            })            
        }
    }

    _atualizaLinha = (_linha) => {
        let posLinha = this.linhas.findIndex(val => val.linha == _linha.linha ) ;
        if(posLinha > -1){
            this.linhas[posLinha] = _linha;      
            this._gravarLinhas(this.linhas);      
        }
    }

    _gravarLinhas = (_linhas) =>{
        this.setState({listalinhas:_linhas}, ()=>{
            AsyncStorage.setItem('linhas', JSON.stringify(_linhas), ()=>{this.setState({loading:false})});
        });
    }
    render(){
        let _listaLinhas = this.state.listalinhas.filter(x=> x && x.veiculos.length > 0);
        return(
        <View style={Styles.container}>
            {this.state.loading && <ActivityIndicator size={100}/>}
            {!this.state.loading &&
            <FlatList width="100%" height="100%" 
            data={_listaLinhas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <BusLineListItem 
                                                onPress={()=>{ (item.veiculos.length>0?this.props.navigation.navigate('DetalhesLinha', {linhaOnibus: item,atualizaCallback:this._atualizaLinha}):Alert.alert("Aten��o", 'Esta linha n�o possui ve�culos.'))}} 
                                                index={index} 
                                                linha={item} /> }
            />}
        </View>
        );
    }

}