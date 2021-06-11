import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MapMarkers from './MapMarkers';

const PropertiesMap = (props: IAPIResponse) => {
  const { center } = props;

  return (
    <MapContainer
      style={{ width: "100%", height: "90vh" }} 
      center={center}
      zoom={8}
      scrollWheelZoom="center"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers {...props} />
      
    </MapContainer>
  )
}

export default PropertiesMap;