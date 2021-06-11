import { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapMarkers = (props: IAPIResponse) => {
  const { list } = props;
  const [markers, setMarkers] = useState<any[]>([]);  

  useEffect(() => {
    if (list && list.length) {
      const newMarkers: any[] = [];
      list.forEach(item => {
        const { latitude, longitude } = item.position;
        newMarkers.push({
          key: `marker-${item.id}`,
          position: { latitude, longitude },
          title: `${item.street} ${item.number}`
        });
      })
      setMarkers(newMarkers);
    }
  }, [list]);

  return (
    <MarkerClusterGroup spiderfyDistanceMultiplier={2}>
      {markers.map(marker => (
        <Marker key={marker.key} position={[marker.position.latitude, marker.position.longitude]}>
          <Popup>
            {marker.title}
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export default MapMarkers;