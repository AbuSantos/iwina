"use client"
import Map from "@/components/maps/Map";
import { Icon, map } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"
import parent from "../../public/images/parent.png"

const DEFAULT_CENTER = [37.774929, -122.419416]
const Markerwhatever = (props) => {
    const fillBlueOptions = { fillColor: 'blue' }
    function error(err) {
        if (err.code === 1) {
            alert("Please allow geolocation access!")
        } else {
            alert("Cannot get Geolocation")
        }
    }

    let greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


    return (
        <div>
            <Map width="800" height="400" center={DEFAULT_CENTER} zoom={13} scrollWheelZoom={false} bounds={DEFAULT_CENTER}>
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker
                        position={DEFAULT_CENTER}
                        eventHandlers={{
                            click: () => {
                                console.log('marker clicked')
                            },
                        }}
                        icon={greenIcon}
                    >
                        <CircleMarker
                            center={DEFAULT_CENTER}
                            pathOptions={fillBlueOptions} radius={100}
                        >
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </CircleMarker>
                    </Marker>
                </>
            </Map>
        </div>
    );
}
export default Markerwhatever