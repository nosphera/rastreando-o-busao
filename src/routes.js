import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';
import Splash from './screens/splash.js';
import ListaLinhas from './screens/listaLinhas.js';
import DetalhesLinhaOnibus from './screens/detalheLinhaOnibus.js';

export default createStackNavigator({
    Home: {
      screen: ListaLinhas,
      navigationOptions: {
        title: 'Listar Linhas de Onibus',
      },
    },
    DetalhesLinha: {
      screen: DetalhesLinhaOnibus,
      navigationOptions: {
        title: 'Detalhes',
      },
    },
    splash: {
      screen: Splash
    }
  }, {
    initialRouteName: 'Home',
  });