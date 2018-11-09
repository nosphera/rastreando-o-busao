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
    this._sairDoSplash = this._sairDoSplash.bind(this);
  }
  componentDidMount=()=>{
    setTimeout(this._sairDoSplash, 3000);
  }
  _sairDoSplash=()=>{
      this.setState({loaded:true})
  }

  render() {
    return ((!this.state.loaded?<Splash/>:<Router screenProps={{Emitter}}/>));
  }
}

