"use client"
import Map from "@/components/maps/Map";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet"
import parent from "../../public/images/parent.png"

const DEFAULT_CENTER = [52.520007, 13.404954]
const Markerwhatever = (props) => {
    // const [position, setPosition] = useState()
    const getLiveLocation = () => {
        navigator.geolocation.watchPosition(success, error)
    }

    function success(pos) {
        //latitude of the user and the longitude of the user, also the acuracy of both in 100
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const accuracy = pos.coords.accuracy

        //now we're passing the variables to the marker, the accuracy would create a circle around the marker

    }

    let greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",

        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


    return (
        <div>
            <Map width="800" height="400" center={DEFAULT_CENTER} zoom={13}>
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
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </>
            </Map>
        </div>
    );
}
export default Markerwhatever