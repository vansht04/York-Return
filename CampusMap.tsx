import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Map as MapIcon, Layers, Navigation2, Crosshair, Package, Search } from 'lucide-react';
import { Item } from '../types';

// York University Keele Campus Center
const KEELE_CAMPUS_CENTER: [number, number] = [43.7735, -79.5019];

// Fix Leaflet icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Custom Marker for and "vibe"
const yorkIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #E31837; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(227, 24, 55, 0.5);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function LocationMarker({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Reported Spot</Popup>
    </Marker>
  );
}

interface CampusMapProps {
  items?: Item[];
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
}

export default function CampusMap({ items = [], onLocationSelect, interactive = true }: CampusMapProps) {
  const [viewMode, setViewMode] = useState<'streets' | 'satellite'>('satellite');

  const tileLayer = useMemo(() => {
    if (viewMode === 'streets') {
      return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png';
    }
    return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  }, [viewMode]);

  return (
    <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white group">
      <MapContainer
        center={KEELE_CAMPUS_CENTER}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayer}
        />

        {onLocationSelect && <LocationMarker onLocationSelect={onLocationSelect} />}
        
        {items.filter(i => i.latitude && i.longitude && i.status === 'active').map(item => (
          <Marker 
            key={item.id} 
            position={[item.latitude!, item.longitude!]}
            icon={L.divIcon({
              className: 'custom-item-icon',
              html: `<div style="background-color: ${item.type === 'lost' ? '#E31837' : '#10b981'}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2);"></div>`,
              iconSize: [20, 20]
            })}
          >
            <Popup>
              <div className="p-2">
                <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${item.type === 'lost' ? 'text-red-500' : 'text-emerald-500'}`}>
                  {item.type}
                </p>
                <h4 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <MapIcon className="w-2.5 h-2.5" /> {item.location}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {!onLocationSelect && (
          <Marker position={KEELE_CAMPUS_CENTER} icon={yorkIcon}>
            <Popup className="custom-popup">
              <div className="p-1">
                <h4 className="font-black text-xs uppercase tracking-widest text-[#E31837]">York University</h4>
                <p className="text-[10px] font-bold text-gray-400">Campus Hub • Secure Zone</p>
              </div>
            </Popup>
          </Marker>
        )}

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
        <div className="bg-white/95 backdrop-blur-xl p-2 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col gap-1.5 border border-white">
          <button
            onClick={() => setViewMode(viewMode === 'streets' ? 'satellite' : 'streets')}
            className={`p-3.5 rounded-2xl transition-all duration-300 ${viewMode === 'satellite' ? 'bg-[#E31837] text-white shadow-xl scale-110' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
            title="Toggle Hybrid View"
          >
            <Layers className="w-5 h-5" />
          </button>
          
          <div className="h-px bg-gray-100 mx-2 my-1" />
          
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${KEELE_CAMPUS_CENTER[0]},${KEELE_CAMPUS_CENTER[1]}`, '_blank')}
            className="p-3.5 rounded-2xl text-emerald-500 hover:bg-gray-100 transition-all duration-300"
            title="Open in Maps"
          >
            <Navigation2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overlay info */}
      <div className="absolute bottom-6 left-6 pointer-events-none z-10">
        <div className="bg-gray-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-white shadow-2xl transition-all group-hover:translate-x-2">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Campus View</p>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <Crosshair className="w-3 h-3 text-red-500 animate-pulse" />
            York University, Keele
          </h4>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-lg">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Live Interactive Grid</span>
        </div>
      </div>
    </div>
  );
}
