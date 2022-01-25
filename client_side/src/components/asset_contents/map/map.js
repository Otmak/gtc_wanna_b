import React from 'react';
import H from "@here/maps-api-for-javascript";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        data: '',
      }
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: 'BWBsAh_xGfd6_BdguHOQLAyMl2cNm_loHRD6gemyQNE'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          center: {lat: 0, lng: 0},
          zoom: 2,
        },
      );
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      this.map = map;
    }
  }

  render() {
    return (
      <div
        style={{ height:'300px' }}
        ref={this.ref}
      />
    )
  }
}