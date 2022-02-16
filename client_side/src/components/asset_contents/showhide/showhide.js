import React, {Component} from 'react';


export default class ShowHide extends Component {
  _isMounted = false
  constructor(props){
    super(props)
    this.state = {
      errorMessage:'',
    }
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  
  render(){
  	// console.log(this.prop)
    return (
		<div>
			{
				this.props.open && this.props.children
			} 
		</div> 
      )
  }
}