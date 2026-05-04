import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface FarmMapProps {
  center: LatLngExpression;
  zoom?: number;
}

// Punjab Farm Polygon (Mock Punjab coordinate around Amritsar)
const farmPolygon: LatLngExpression[] = [
  [31.6340, 74.8723],
  [31.6360, 74.8723],
  [31.6360, 74.8750],
  [31.6340, 74.8750],
];

const FarmMap: React.FC<FarmMapProps> = ({ center, zoom = 15 }) => {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-white/10">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon 
          pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.3 }} 
          positions={farmPolygon}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-green-700">Agri-Intelligence Farm PB-001</h3>
              <p className="text-sm">Crop: Wheat | Stage: 45 Days</p>
              <p className="text-sm">Area: 2.4 Hectares</p>
            </div>
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
};

export default FarmMap;
