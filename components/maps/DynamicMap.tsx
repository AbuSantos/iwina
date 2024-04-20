"use client";
import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import parent from "../../public/images/parent.png"
const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {

  return (
    <MapContainer  {...rest} style={{ height: "300px", width: "100%" }} zoom={13} >
      {children}
    </MapContainer>
  )
};

export default Map
