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
            listalinhas:[],
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
                    let ObjLinha = {
                        index:i, 
                        linha:linhasBuffer[i][2],
                        veiculos: [],
                    }
                    let tmpVeiculos =responseJson.filter(x => x[2] == linhasBuffer[i][2]);

                    for(let y=1;y<tmpVeiculos.length;y++){
                        if(tmpVeiculos[i]){
                            ObjLinha.veiculos.push({                                
                                ordem: tmpVeiculos[y][1],
                                linha:tmpVeiculos[y][2],
                                position:[{
                                    datahora: tmpVeiculos[y][0] ,
                                    latitude: tmpVeiculos[y][3],
                                    longitude: tmpVeiculos[y][4],                                    
                                    velocidade: tmpVeiculos[y][5],
                                    direcao: tmpVeiculos[y][6],
                                }],
                            });    
                        }
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
        this.setState({listalinhas:this.linhas, loading:false},()=>{
            AsyncStorage.setItem('linhas', JSON.stringify(this.linhas));
        });
    }
    render(){
        let _listaLinhas = this.state.listalinhas.filter(x=>x.veiculos.length > 0);
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