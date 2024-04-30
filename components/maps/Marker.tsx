import { useEffect, useState, useRef } from "react";
import { Marker, useMap, } from "react-leaflet";
import L from "leaflet"
import ChildDetail from "./ChildDetails";

export default function MainMarker({ greenIcon, fillBlueOptions, data }) {
    const map = useMap(); // Access the map instance using useMap hook
    console.log(data);

    useEffect(() => {
        // Check if data exists and it's an array
        // if (data && Array.isArray(data)) {
        //     // Iterate over each position in the data array
        //     data.forEach(pos => {
                // Destructure position data
                const { latitude, longitude, accuracy, username } = data;

                // Add marker for each position
                AddChildMarker(latitude, longitude, accuracy, username);
        //     });
        // }
    }, [data]);

    function AddChildMarker(lat, lng, acc, username) {
        if (map) {
            // Create circle and marker for the position
            const circle = L.circle([lat, lng], { radius: acc }).addTo(map);
            const marker = L.marker([lat, lng]).addTo(map).bindPopup(`${username} is currently here`);

            // Fit the map's viewport to the bounds of the circle
            map.fitBounds(circle.getBounds());
        }
    }

    return null; // Return null because markers are added directly to the map
}
