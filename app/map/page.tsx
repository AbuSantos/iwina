"use client"
import Map from "@/components/maps/Map";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet"

const DEFAULT_CENTER = [38.907132, -77.036546]
const Markerwhatever = (props) => {
    const [position, setPosition] = useState()

    let greenIcon = new L.Icon({
        iconUrl: '../../public/images/parent.png',
        shadowUrl: '../../public/images/parent.png',

        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    return (
        <div>
            <Map width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker
                        position={[38.907132, -77.036546]}
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