import { useEffect, useState, useRef } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"
import ChildDetail from "./ChildDetails";
import io, { Socket } from 'socket.io-client';
export default function MainMarker({ x, greenIcon, fillBlueOptions }) {
    const socketRef = useRef<Socket | null>(null)
    const [circle, setCircle] = useState(null)
    const [marker, setMarker] = useState(null)

    const map = useMap(); // Access the map instance using useMap hook
    function AddChildMarker(lat, lng, acc) {
        if (map && x) {
            // Remove previous circle and marker if they exist

            if (circle) {
                map.removeLayer(circle)
                map.removeLayer(marker)
            }

            const newCircle = (L.circle([lat, lng], {
                radius: acc,
            }).addTo(map))

            const newMarker = (L.marker([lat, lng]).addTo(map));

            setCircle(newCircle)
            setMarker(newMarker)

            // Fit the map's viewport to the bounds of the circle
            map.fitBounds(newCircle.getBounds());
        }
    }
    useEffect(() => {
        AddChildMarker(x.lat, x.lng, x.acc);
        // AddChildMarker(51.508972, -0.128794, x.acc);
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

        </Marker>
    )
}