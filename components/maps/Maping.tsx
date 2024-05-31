'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from "react";
import { TileLayer } from "react-leaflet";
import L from "leaflet";
import { useSession } from "next-auth/react";
import useSocket from "@/context/useSocket";

const MainMarker = dynamic(() => import('@/components/maps/Marker').then(mod => mod.default), { ssr: false });
const Map = dynamic(() => import('@/components/maps/Map').then(mod => mod.default), { ssr: false });

const Markerwhatever = ({ initialData, userId, username, role, familyLocationId }) => {
    const fillBlueOptions = { fillColor: 'blue' };
    const [data, setData] = useState(initialData);
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0,
        key: 0
    });
    const [position, setPosition] = useState([]);
    const mapRef = useRef(null);
    const socket = useSocket('http://localhost:8080');

    useEffect(() => {
        if (socket) {
            console.log("socket connected");

            if (userId && familyLocationId) {
                socket.emit("join-location", userId, familyLocationId);
            } else {
                console.log("User or Room ID is missing");
            }
        }
    }, [socket, userId, familyLocationId]);

    useEffect(() => {
        if (socket) {
            socket.on("receive-coordinates", (data) => {
                setPosition((prevPos) => [...prevPos, data]);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (typeof window !== "undefined" && socket) {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const { longitude, latitude, accuracy } = pos.coords;
                        sendLocationData(latitude, longitude, accuracy);
                    });
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }, [socket, familyLocationId]);

    const sendLocationData = (lat, lng, acc) => {
        if (socket && familyLocationId) {
            socket.emit("coordinates", familyLocationId, lat, lng, acc, userId, username);
        }
    };

    const greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",
        iconSize: [30, 30],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    useEffect(() => {
        if (data.length > 0) {
            const lastPos = data[data.length - 1];
            setX({ lat: lastPos.latitude, lng: lastPos.longitude, acc: lastPos.accuracy, key: lastPos._id });
        }
    }, [data]);

    return (
        <div>
            <Map center={[x.lat, x.lng]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    {data.map((pos) => (
                        <MainMarker greenIcon={greenIcon} fillBlueOptions={fillBlueOptions} data={pos} key={pos._id} />
                    ))}
                </>
            </Map>
        </div>
    );
};

export default Markerwhatever;
