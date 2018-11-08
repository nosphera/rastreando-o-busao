import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';
import Splash from './screens/splash.js';
import ListaLinhas from './screens/listaLinhas.js';
import DetalhesLinhaOnibus from './screens/detalheLinhaOnibus.js';
import DetalheVeiculos from './screens/detalheVeiculo';

export default createStackNavigator({
    Home: {
      screen: ListaLinhas,      
    },
    DetalhesLinha: {
      screen: DetalhesLinhaOnibus,
      navigationOptions: {
        title: 'Detalhes da Linha',
      },
    },
    DetalhesVeiculo: {
      screen: DetalheVeiculos,
      navigationOptions: {
        title: 'Posição do Veículo',
      },
    },
    splash: {
      screen: Splash,
        navigationOptions: {
            headerVisible: false,
        }    
    }
  }, {
    initialRouteName: 'Home',
  });