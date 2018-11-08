import React, {Component} from 'react';
import Router from './src/routes.js';
import Splash from './src/screens/splash.js';
const Emitter= require('tiny-emitter/instance');

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loaded:false,
    }
  }
  componentDidMount=()=>{
    setTimeout(this._sairDoSplash.bind(this), 1000);
  }
  _sairDoSplash=()=>{
      this.setState({loaded:true})
  }

  render() {
    return ((this.state.loaded?<Router screenProps={{Emitter}}/>:<Splash/>));
  }
}

