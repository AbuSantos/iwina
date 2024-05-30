import { useEffect, useState, useRef } from "react";
import { Marker, useMap, } from "react-leaflet";
import L from "leaflet"

export default function MainMarker({ greenIcon, fillBlueOptions, data }) {
    const map = useMap(); // Access the map instance using useMap hook
    const [circle, setCircle] = useState(null)
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        // if (typeof window !== null) {
        const { latitude, longitude, accuracy, username } = data;

        // Add marker for each position
        AddChildMarker(latitude, longitude, accuracy, username);
        // }
    }, [data]);

    function AddChildMarker(lat, lng, acc, username) {
        if (map) {
            // Remove previous circle and marker if they exist
            if (circle) {
                map.removeLayer(circle)
                map.removeLayer(marker)
            }
            // Create circle and marker for the position
            const newCircle = L.circle([lat, lng], { radius: acc }).addTo(map);
            const newMarker = L.marker([lat, lng]).addTo(map).bindPopup(`${username} is currently here`);

            setCircle(newCircle)
            setMarker(newMarker)

            // Fit the map's viewport to the bounds of the circle
            map.fitBounds(newCircle.getBounds());
        }
    }

    return null; // Return null because markers are added directly to the map
}
