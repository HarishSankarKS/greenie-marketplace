"use client";

import { useEffect, useRef } from "react";

interface MapPoint {
  lat: number;
  lng: number;
  label: string;
}

interface Props {
  origin: MapPoint;      // Transfer Station
  destination: MapPoint; // Delivery address
  truck: MapPoint;       // Current truck position
}

export default function LiveMap({ origin, destination, truck }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const truckMarkerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Guard against React StrictMode double-mount and HMR re-runs
    const container = mapRef.current as HTMLElement & { _leaflet_id?: number };
    if (container._leaflet_id) return; // already initialized

    import("leaflet").then((L) => {
      // Fix default marker icon paths (webpack bundling issue)
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Create map centered between origin and destination
      const centerLat = (origin.lat + destination.lat) / 2;
      const centerLng = (origin.lng + destination.lng) / 2;

      const map = L.map(mapRef.current!, { zoomControl: true, scrollWheelZoom: false });
      mapInstance.current = map;

      // OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom icons
      const greenIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:#1B5E20;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:16px;">📍</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const destIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:#DC2626;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:16px;">🏠</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const truckIcon = L.divIcon({
        className: "",
        html: `<div style="width:36px;height:36px;background:#F9A825;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,0.4);font-size:18px;animation:pulse 1.5s infinite;">🚛</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

      // Add origin marker (Transfer Station)
      L.marker([origin.lat, origin.lng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<b>📍 ${origin.label}</b><br/>Transfer Station`)
        .openPopup();

      // Add destination marker
      L.marker([destination.lat, destination.lng], { icon: destIcon })
        .addTo(map)
        .bindPopup(`<b>🏠 ${destination.label}</b><br/>Delivery Destination`);

      // Add truck marker (current position)
      const truckMarker = L.marker([truck.lat, truck.lng], { icon: truckIcon })
        .addTo(map)
        .bindPopup(`<b>🚛 ${truck.label}</b><br/>Live GPS Position`);
      truckMarkerRef.current = truckMarker;

      // Draw route polyline (straight line — in real app use OSRM route)
      const routePoints: [number, number][] = [
        [origin.lat, origin.lng],
        [truck.lat, truck.lng],
        [destination.lat, destination.lng],
      ];
      L.polyline(routePoints, {
        color: "#1B5E20",
        weight: 4,
        opacity: 0.7,
        dashArray: "6, 4",
      }).addTo(map);

      // Completed segment (origin → truck) in solid green
      L.polyline([[origin.lat, origin.lng], [truck.lat, truck.lng]], {
        color: "#4CAF50",
        weight: 4,
        opacity: 0.9,
      }).addTo(map);

      // Fit bounds to show all markers
      const bounds = L.latLngBounds(routePoints);
      map.fitBounds(bounds, { padding: [40, 40] });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,168,37,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(249,168,37,0); }
        }
      `}</style>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden" }}
      />
    </>
  );
}
