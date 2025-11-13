"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Place } from "@/mock/places";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  selectedPlaces: Place[];
  routeCoordinates: [number, number][];
}

function LeafletMap({ selectedPlaces, routeCoordinates }: LeafletMapProps) {
  useEffect(() => {
    // Leaflet icon yollarını düzelt
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }
  }, []);

  return (
    <MapContainer
      center={[41.6772, 26.555]}
      zoom={13}
      className="w-full"
      style={{ height: "calc(100% - 42px)" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {selectedPlaces.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]}>
          <Popup>
            <div className="font-semibold text-center">
              <span className="text-2xl">{place.icon}</span>
              <br />
              {place.name}
            </div>
          </Popup>
        </Marker>
      ))}

      {routeCoordinates.length > 1 && (
        <Polyline
          positions={routeCoordinates}
          color="#ef4444"
          weight={4}
          opacity={0.8}
        />
      )}
    </MapContainer>
  );
}

export default LeafletMap;
