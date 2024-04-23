import { useEffect } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";

export default function MainMarker({ x, greenIcon, fillBlueOptions }) {
    console.log(x.lat);
    const map = useMap(); // Access the map instance using useMap hook
    console.log(map);

    // useEffect(() => {
    //     if (map) {
    //         map.setView([x.lat, x.lng]); // Center the map on the new position
    //     }
    // }, [x, map]);


    useEffect(() => {
        if (map) {
            map.fitBounds([
                [x.lat - 0.01, x.lng - 0.01],
                [x.lat + 0.01, x.lng + 0.01]
            ]);
        }
    }, [x])

    return (
        <Marker
            position={[x.lat, x.lng]}
            eventHandlers={{
                click: () => {
                    console.log('marker clicked')
                },
            }}
            icon={greenIcon}
        >
            <CircleMarker
                center={[x.lat, x.lng]}
                pathOptions={fillBlueOptions}
                radius={x.acc}
                bounds={[x.lat, x.lng]}
            >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </CircleMarker>
        </Marker>
    )
}