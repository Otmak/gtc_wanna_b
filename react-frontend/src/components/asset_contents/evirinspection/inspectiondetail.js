import React, {Component} from 'react';
import DefaultCard from '../card/card.js';


export default class InspectionDetail extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {

    }
  }


  render(){

    const { errorMessage, params} = this.state;
    return ( <DefaultCard title={"INSP DETAIL"}  message={errorMessage} />)

  }
}