import React, {Component} from 'react';
import './css/trackandtrace.css';
import GpsInfo from '../gpsinfo/gpsinfo.js';
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
    // console.log('Clicked Prev >>', this, node);
    node.scrollBy(-(width + gap), 0);
  }


  next =()=> {

    const gap = 5;
    const node = this.carousel.current;
    let width = node.offsetWidth;
    // console.log('Clicked NExt >>', this, node);
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
      <div id="trackAndTraceWrapper">
        <div id="content">
          <div ref={this.carousel} id="carousel">
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
            <DefaultCard  data={assetData} id={this.props.id}/>
          </div>
        </div>
        <button style={{ display: display}} onClick={ this.prev } id="prev">
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
        <button onClick={ this.next } id="next">
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
        </button>
      </div>
      )
  }
}