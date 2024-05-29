"use client";
import dynamic from 'next/dynamic';
import { useEffect } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Dynamic import to prevent SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });

const Map = ({ children, className, width, height, ...rest }) => {
  useEffect(() => {
    // Set up Leaflet default icon paths
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/girlchild.png',
      iconUrl: '/images/girlchild.png',
      shadowUrl: '/images/marker-shadow.png', // Ensure you have this file or remove this line
    });
  }, []);

  return (
    <MapContainer {...rest} style={{ height: "450px", width: "100%" }} zoom={15}>
      {children}
    </MapContainer>
  );
};

export default Map;
