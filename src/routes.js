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
        title: 'Detalhes',
      },
    },
    DetalhesVeiculo: {
      screen: DetalheVeiculos,
      navigationOptions: {
        title: 'Posição do Veículo',
      },
    },
    splash: {
      screen: Splash
    }
  }, {
    initialRouteName: 'Home',
  });