
import { useEffect, useState, useRef } from "react";
import { Marker, useMap, } from "react-leaflet";
import L from "leaflet"
import ChildDetail from "./ChildDetails";
import { useSession } from "next-auth/react";

export default function MainMarker({ greenIcon, fillBlueOptions, data }) {
    const { data: session } = useSession()
    //@ts-ignore
    const userId = session?.user?.id
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0
    })
    const [circle, setCircle] = useState(null)
    const [marker, setMarker] = useState(null)

    const map = useMap(); // Access the map instance using useMap hook

    useEffect(() => {
        data && data.map((pos) => {
            // if (pos.user === userId) {
            //     console.log(pos.latitude)
            // }
            console.log(pos);

            AddChildMarker(pos.latitude, pos.longitude, pos.accuracy, pos.username);
            setX({ lat: pos.latitude, lng: pos.longitude, acc: pos.accuracy })
        })
        // position.map((pos) => setX({ lat: pos.latitude, lng: pos.longitude, acc: pos.accuracy }))

    }, [data])



    function AddChildMarker(lat: number, lng: number, acc: number, username: string) {
        if (map && x) {
            // Remove previous circle and marker if they exist
            if (circle) {
                map.removeLayer(circle)
                map.removeLayer(marker)
            }

            const newCircle = (L.circle([lat, lng], {
                radius: acc,
            }).addTo(map))

            const newMarker = (L.marker([lat, lng]).addTo(map)).bindPopup(`${username} is currently here`);

            setCircle(newCircle)
            setMarker(newMarker)

            // Fit the map's viewport to the bounds of the circle
            map.fitBounds(newCircle.getBounds());
        }
    }

    return (
        <Marker
            position={[x.lat, x.lng]}
        >
        </Marker>
    )
}