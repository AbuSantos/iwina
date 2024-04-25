"use client"
import Map from "@/components/maps/Map";
import { Icon, map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"
import MainMarker from "@/components/maps/Marker";
import { useSession } from "next-auth/react";
import { useTaskContext } from "@/context/TaskContext";
import io, { Socket } from 'socket.io-client';


const Markerwhatever = (props) => {
    const socketRef = useRef<Socket | null>(null);
    const fillBlueOptions = { fillColor: 'blue' }
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0
    })

    const mapRef = useRef(null)
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    //@ts-ignore
    const userId = session?.user?.id
    //@ts-ignore
    const role = session?.user?.role
    const familyLocation = {}
    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

    // const sendLocation = async (coordinates: {}) => {
    //     try {
    //         const res = await fetch(`api/location/${userId}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(coordinates)
    //         })
    //         if (!res) {
    //             throw new Error('Failed to send coordinates to server');

    //         }
    //         console.log('Coordinates sent successfully');
    //     }
    //     catch (error) {
    //         console.error('Error sending coordinates to server:', error.message);
    //     }
    // }
    const familyLocationId = role === "parent" ? userId : state.data?.[0]?.creator



    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.watchPosition((pos) => {
    //             const { latitude, longitude, accuracy } = pos.coords
    //             if (familyLocationId && userId) {
    //                 sendLocation({ latitude, longitude, accuracy, userId, familyLocationId })
    //                 // familyLocation[userId] = familyId;
    //                 // console.log(familyLocation[userId])
    //             }
    //         })
    //     }

    // }, [])
    // console.log(state.data)

    // useEffect(() => {
    //     socketRef.current = io("http://localhost:8080");

    //     if (userId && familyId) {
    //         socketRef.current.emit("join-location", userId, familyId);
    //     } else {
    //         console.log("User or Room ID is missing");
    //     }

    //     // Cleanup function to remove the event listener and disconnect the socket
    //     return () => {
    //         if (socketRef.current) {
    //             socketRef.current.disconnect();
    //         }
    //     };
    // }, [userId, familyId]);

    // useEffect(() => {
    //     socketRef.current = io("http://localhost:8080");
    //     socketRef.current.on("receive-coordinates", async (data) => {
    //         const newData = await data
    //         console.log(newData);
    //     })

    //     return () => {
    //         if (socketRef.current) {
    //             // socketRef.current.off("receive-message");
    //             socketRef.current.disconnect();
    //         }
    //     };
    // }, [userId, familyId])

    const sendLocationData = (lat, lng, acc) => {
        if (socketRef.current && familyLocationId) {
            socketRef.current.emit("coordinates", familyLocationId, lat, lng, acc)
        }
    }

    // useEffect(() => {
    //     socketRef.current = io("http://localhost:8080");

    //     navigator.geolocation.getCurrentPosition((pos) => {
    //         const { longitude, latitude, accuracy } = pos.coords;

    //         sendLocationData(longitude, latitude, accuracy)
    //     });

    //     return () => {
    //         if (socketRef.current) {
    //             // socketRef.current.off("receive-message");
    //             socketRef.current.disconnect();
    //         }
    //     };

    // }, [familyId]);


    let greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

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