import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// Fix for marker icons not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ItineraryMap = ({ destinations }) => {
  // Center the map based on the first destination or a default location
  const center = destinations.length > 0 ? destinations[0].location : { lat: 0, lng: 0 };

  return (
    <MapContainer center={center} zoom={0} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {destinations.map((dest, index) => (
        <Marker key={index} position={dest.location}>
          <Popup>{dest.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ItineraryMap;