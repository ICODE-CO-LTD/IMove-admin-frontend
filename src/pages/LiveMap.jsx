import { useState, useCallback, useMemo } from 'react';
import { useLoadScript, GoogleMap, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import { Loader2, Car, Navigation } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 140px)'
};

const center = {
  lat: -1.9441, // Default to Kigali
  lng: 30.0619
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
};

export default function LiveMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", 
    // libraries: ['places'] // if needed
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['live-map'],
    queryFn: adminService.getLiveMapData,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { riders = [], activeRides = [] } = data || {};

  const mapContent = useMemo(() => {
    if (!isLoaded) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    if (loadError) return <div className="h-full flex items-center justify-center text-red-500">Error loading maps</div>;

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={options}
      >
        {/* Render Available Riders */}
        {riders.map((rider) => (
          rider.latitude && rider.longitude && (
            <Marker
              key={rider._id}
              position={{ lat: rider.latitude, lng: rider.longitude }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#3B82F6", // Blue
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
              }}
              onClick={() => setSelectedItem({ type: 'rider', data: rider })}
            />
          )
        ))}

        {/* Render Active Rides (Pickup/Dropoff/Rider) */}
        {activeRides.map((ride) => {
             // Example logic for ride markers - simplistic for now
             // Using rider position if available
            const riderPos = ride.rider_id ? { lat: ride.rider_id.latitude, lng: ride.rider_id.longitude } : null;
            const passengerPos = ride.passenger_id ? { lat: ride.passenger_id.latitude, lng: ride.passenger_id.longitude } : null;
            
            return (
                <div key={ride._id}>
                     {riderPos && (
                        <Marker
                        position={riderPos}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "#8B5CF6", // Purple for active ride
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "#FFFFFF",
                        }}
                        onClick={() => setSelectedItem({ type: 'ride', data: ride })}
                        />
                    )}
                    {/* Could add Polylines here if route data exists */}
                </div>
            )
        })}

        {selectedItem && (
          <InfoWindow
            position={{
              lat: selectedItem.data.latitude || selectedItem.data.rider_id?.latitude,
              lng: selectedItem.data.longitude || selectedItem.data.rider_id?.longitude
            }}
            onCloseClick={() => setSelectedItem(null)}
          >
            <div className="p-2 min-w-[200px]">
              <p className="font-bold text-gray-900">
                {selectedItem.type === 'rider' ? selectedItem.data.full_name : 'Ongoing Ride'}
              </p>
              {selectedItem.type === 'rider' && (
                 <div className="text-sm text-gray-600 mt-1">
                    <p>Status: {selectedItem.data.status}</p>
                    <p>Vehicle: {selectedItem.data.vehicle_type}</p>
                 </div>
              )}
               {selectedItem.type === 'ride' && (
                 <div className="text-sm text-gray-600 mt-1">
                    <p>Passenger: {selectedItem.data.passenger_id?.full_name}</p>
                    <p>Status: {selectedItem.data.status}</p>
                 </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }, [isLoaded, loadError, riders, activeRides, selectedItem]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Live Ride Monitoring</h2>
           <p className="text-slate-500">Real-time view of riders and ongoing trips</p>
        </div>
         <div className="flex gap-4 text-sm">
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                 <span className="text-slate-600">Available Riders</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                 <span className="text-slate-600">Active Rides</span>
             </div>
         </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-1">
         {mapContent}
      </div>
    </div>
  );
}
