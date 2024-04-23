"use client"
import Map from "@/components/maps/Map";
import { Icon, map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"
import parent from "../../public/images/parent.png"
import MainMarker from "@/components/maps/Marker";


const Markerwhatever = (props) => {

    const fillBlueOptions = { fillColor: 'blue' }
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0
    })
    const mapRef = useRef(null)

    useEffect(() => {
        try {
            if ('geolocation' in navigator) {
                navigator.geolocation.watchPosition((pos) => {
                    const { longitude, latitude, accuracy } = pos.coords;
                    setX({
                        lat: latitude,
                        lng: longitude,
                        acc: accuracy
                    });
                });
            } else {
                console.error('Geolocation is not available.');
            }
        } catch (err) {
            if (err.code === 1) {
                alert("Please allow geolocation access!")
            } else {
                alert("Cannot get Geolocation")
            }
        }

    }, []);

   


    let greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    // console.log(L);


    return (
        <div>
            <Map width="800" height="500" center={[x.lat, x.lng]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <MainMarker x={x} greenIcon={greenIcon} fillBlueOptions={fillBlueOptions} />
                </>
            </Map>
        </div>
    );
}
export default Markerwhatever