import React from 'react';
import Badge from '@mui/material/Badge';
import H from "@here/maps-api-for-javascript";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        data: this.props.location,
        hasData: false
      }
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }


  validate (value) {
    return value === '' || value === undefined || value === null ? false : true;
  }

  componentDidMount() {
    // console.log('mounted',this, this.map)
    

    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const { location } = this.props;
      // console.log(location)
      if ( this.validate(location) ){

        let lat = location.lat;
        let lng = location.long;
        const platform = new H.service.Platform({
          apikey: 'BWBsAh_xGfd6_BdguHOQLAyMl2cNm_loHRD6gemyQNE'
        });
        const layers = platform.createDefaultLayers();
        const map = new H.Map(
          this.ref.current,
          layers.vector.normal.map,
          {
            center: {lat:lat, lng:lng},
            zoom: 8,
          },
        );

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        let locationMarker = new H.map.Marker({lat:lat, lng:lng});
        map.addObject(locationMarker);
        
        let ui = H.ui.UI.createDefault(map, layers);
        this.map = map;
      }
    }
  }


  render() {
    // console.log('rendering..', !this.map, this.map )
    // if (this.validate())
    const { hasData } = this.state

    return (

          <div
            style={{ height:'300px' }}
            ref={this.ref}
           />
    )
  }
}