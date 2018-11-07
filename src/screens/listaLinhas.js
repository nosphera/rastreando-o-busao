import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    FlatList,
    ActivityIndicator 
} from 'react-native';
import Styles from '../styles';
import ItemListaLinhasOnibus from '../components/itemListaLinhasOnibus.js'

export default class ListarLinhas extends Component {

    constructor(props){
        super(props);

        this.linhas=[];

        this.state={            
            listalinhas:[],
            loading:true,
        }
    }

    componentDidMount = ()=>{
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
                                datahora: tmpVeiculos[y][0] ,
                                ordem: tmpVeiculos[y][1],
                                linha:tmpVeiculos[y][2],
                                latitude: tmpVeiculos[y][3],
                                longitude: tmpVeiculos[y][4],
                                velocidade: tmpVeiculos[y][5],
                                direcao: tmpVeiculos[y][6],
                            });    
                        }
                    }
                    console.log(JSON.stringify(ObjLinha));
                    this.linhas.push(ObjLinha);
                }
            }           

            this.setState({listalinhas:this.linhas, loading:false})    ;
        })
        .catch((error) =>{
            console.log('Erro ao listar as linhas de onibus: ', JSON.stringify(error));
        }
        )
    }

    render(){

        return(
        <View style={Styles.container}>
            {this.state.loading && <ActivityIndicator size={100}/>}
            {!this.state.loading &&
            <FlatList width="100%" height="100%" 
            data={this.state.listalinhas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <ItemListaLinhasOnibus 
                                                onPress={()=>{ (item.veiculos.length>0?this.props.navigation.navigate('DetalhesLinha', {linhaOnibus: item,}):Alert.alert("Atenção", 'Esta linha não possui veículos.'))}} 
                                                index={index} 
                                                linha={item} /> }
            />
            }
        </View>
        );
    }

}