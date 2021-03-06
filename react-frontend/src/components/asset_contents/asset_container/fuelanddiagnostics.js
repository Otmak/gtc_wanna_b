import React, {Component} from 'react';
import './css/trackandtrace.css';
import JbusEvents from '../jbus/jbusevents.js';
import JbusTripReport from '../jbustrip/jbustripenghrs.js';
import JbusTripFuel from '../jbustrip/jbustripfuel.js';
import DefaultCard from '../regular/regular.js';


export default class FuelAndDiagnostics extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
      display : 'none',
    }
    this.carousel = React.createRef();
  }


  prev =()=> {

    const gap = 5;
    const node = this.carousel.current;
    let width = node.offsetWidth;
    node.scrollBy(-(width + gap), 0);
  }


  next =()=> {

    const gap = 5;
    const node = this.carousel.current;
    let width = node.offsetWidth;
    node.scrollBy(width + gap, 0);
    this.setState( {'display': 'flex'});
  }


  render(){ 
    // console.log(this)
    const { assetData, display } = this.state; 
    // <Path data={assetData} id={this.props.id} gps={this.props.gps} />
    const cdata= {
      'Time' : '30 Mar 2015',
      'Asset' :'HTD test 20',
      'Location': 'home',
    }
    return (
      <div className="trackAndTraceWrapper">
        <div className="content">
          <div ref={this.carousel} className="carousel">
            <JbusEvents data={assetData} id={this.props.id} gps={this.props.gps} />
            <JbusTripReport data={assetData} id={this.props.id} gps={this.props.gps} />
            <JbusTripFuel data={assetData} id={this.props.id} gps={this.props.gps} />
          </div>
        </div>
  {/*      <button style={{ display: display}} onClick={ this.prev } className="prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1976d2"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
          </svg>
        </button>
        <button onClick={ this.next } className="next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1976d2"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
          </svg>
        </button>*/}
      </div>
      )
  }
}