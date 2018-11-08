import React, {Component} from 'react';
import {
    Alert,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator ,
    AsyncStorage
} from 'react-native';
import Styles from '../styles';
import ItemListaLinhasOnibus from '../components/itemListaLinhasOnibus.js';
import Icon from "react-native-vector-icons/MaterialIcons";

var atualizarLista={};

export default class ListarLinhas extends Component {
    static navigationOptions= {
        title: 'Listar Linhas de Onibus',
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
            this.setState({listalinhas:[],loading:true,},()=>{this._fetchLinhasOnibus()});
        }
    }

    componentWillUnmount = ()=>{
        this.props.screenProps.Emitter.off('atualizaLinha', this._atualizaLinha);
    }

    componentDidMount = ()=>{        
        AsyncStorage.getItem('linhas', (error, result)=>{
            if(result){               
                this.linhas = JSON.parse(result);
                this.setState({listalinhas:this.linhas, loading:false});
            }
        });
        this._fetchLinhasOnibus();
    }

    _fetchLinhasOnibus = function (){
        return fetch('http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/onibus',{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response)=>{ 
            let responseJson = JSON.parse(response._bodyText).DATA;
            this.linhas = [];
            let linhasBuffer = responseJson.filter(x => x[2] != "");

            for(let i=0;i<linhasBuffer.length;i++){
                if(!(this.linhas.findIndex(val => val.linha == linhasBuffer[i][2]) > -1))   {
                    let _veiculos = linhasBuffer.filter(x => x[2] == linhasBuffer[i][2]).map((reg) => {return({                               
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
                                    index:i, 
                                    linha:linhasBuffer[i][2],
                                    veiculos: _veiculos, 
                                  }
                        
                    this.linhas.push(ObjLinha);
                }
            }    
            this._gravarLinhas();
        })
        .catch((error) =>{
            console.log('Erro ao listar as linhas de onibus: ', JSON.stringify(error));
        });
    }

    _atualizaLinha = (_linha) => {
        let posLinha = this.linhas.findIndex(val => val.linha == _linha.linha ) ;
        if(posLinha > -1){
            this.linhas[posLinha] = _linha;      
            this._gravarLinhas();      
        }
    }

    _gravarLinhas = () =>{
        AsyncStorage.setItem('linhas', JSON.stringify(this.linhas));
        this.setState({listalinhas:this.linhas, loading:false});
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
            renderItem={({item, index}) => <ItemListaLinhasOnibus 
                                                onPress={()=>{ (item.veiculos.length>0?this.props.navigation.navigate('DetalhesLinha', {linhaOnibus: item,atualizaCallback:this._atualizaLinha}):Alert.alert("Aten��o", 'Esta linha n�o possui ve�culos.'))}} 
                                                index={index} 
                                                linha={item} /> }
            />}
        </View>
        );
    }

}