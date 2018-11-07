import React, {Component} from 'react';
import Router from './src/routes.js';
import Splash from './src/screens/splash.js';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loaded:false,
    }
  }
  componentDidMount=()=>{
    setTimeout(this._sairDoSplash.bind(this), 2000);
  }
  _sairDoSplash=()=>{
      this.setState({loaded:true})
  }

  render() {
    if(!this.state.loaded){
      return( <Splash/>);
    }
    return (
      <Router/>
    );
  }
}

