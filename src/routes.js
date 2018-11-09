import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation';
import Splash from './screens/splash.js';
import BusLinesList from './screens/busLinesList.js';
import DetalhesLinhaOnibus from './screens/detalheLinhaOnibus.js';
import DetalheVeiculos from './screens/detalheVeiculo';

export default createStackNavigator({
    Home: {
      screen: BusLinesList,      
    },
    DetalhesLinha: {
      screen: DetalhesLinhaOnibus,
      navigationOptions: {
        title: 'Detalhes da Linha',
      },
    },
    DetalhesVeiculo: {
      screen: DetalheVeiculos,
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