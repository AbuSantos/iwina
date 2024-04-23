import { useEffect, useState } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"

export default function MainMarker({ x, greenIcon, fillBlueOptions }) {
    const [circle, setCircle] = useState(null)
    const [marker, setMarker] = useState(null)
    // console.log(x.lat);
    const map = useMap(); // Access the map instance using useMap hook
    // console.log(map);
    useEffect(() => {
        if (map && x) {
            // Remove previous circle and marker if they exist

            if (circle) {
                map.removeLayer(circle)
                map.removeLayer(marker)
            }

            const newCircle = (L.circle([x.lat, x.lng], {
                radius: x.acc,
            }).addTo(map));

            const newMarker = (L.marker([x.lat, x.lng], {
                // icon: greenIcon,
            }).addTo(map));

            setCircle(newCircle)
            setMarker(newMarker)
            // Fit the map's viewport to the bounds of the circle
            map.fitBounds(newCircle.getBounds());
        }
    }, [map, x]);
    // console.log(L.marker);

    return (
        <Marker
            position={[x.lat, x.lng]}
            eventHandlers={{
                click: () => {
                    console.log('marker clicked')
                },
            }}
        >
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    )
}