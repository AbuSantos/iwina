"use client";
import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import parent from "../../public/images/parent.png"
const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/parent.png',
        iconUrl: '/images/parent.png',
        shadowSize: [50, 50],
      });
    })();
  }, []);
  


  return (
    <MapContainer  {...rest} style={{ height: "450px", width: "100%" }} zoom={15} >
      {children}
    </MapContainer>
  )
};

export default Map
