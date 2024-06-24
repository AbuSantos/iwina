'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, Suspense } from "react";
// import { TileLayer } from "react-leaflet";
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
import L from "leaflet";
import { useSession } from "next-auth/react";
import { useTaskContext } from "@/context/TaskContext";
import useSocket from "@/context/useSocket";

const MainMarker = dynamic(() => import('../Marker').then(mod => mod.default), { ssr: false });
const Map = dynamic(() => import('../Map').then(mod => mod.default), { ssr: false });

const Location = () => {
    const fillBlueOptions = { fillColor: 'blue' };
    const [data, setData] = useState([]);

    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0,
        key: 0
    });
    const [position, setPosition] = useState([]);
    const mapRef = useRef(null);
    const { data: session } = useSession();
    const { state, fetchTasks } = useTaskContext();
    const [kidsData, setKidsData] = useState([])
    const userId = (session?.user as any)?.id;
    const username = (session?.user as any)?.name;
    const role = (session?.user as any)?.role;
    const socket = useSocket('http://localhost:8080');

    useEffect(() => {
        if (userId && role) {
            const fetchkids = async () => {
                try {
                    const res = await fetch(`api/users/${userId}/user/kids?role=${role}`)
                    if (!res.ok) {
                        throw new Error('Failed to fetch kids')
                    }
                    const data = await res.json();
                    setKidsData(data)
                } catch (error) {
                    console.log(error.message);
                }
            }
            fetchkids()
            // fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`);
        }
    }, [userId, role, fetchTasks]);

    const familyLocationId = role === "parent" ? userId : kidsData?.[0]?.creator;

    useEffect(() => {
        if (socket) {
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
        const fetchLocations = async () => {
            try {
                const res = await fetch(`api/location/${familyLocationId}/getlocation`);
                if (!res.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching locations", error);
            }
        };

        if (familyLocationId) {
            fetchLocations();
        }
    }, [familyLocationId]);

    useEffect(() => {
        if (data.length > 0) {
            const lastPos = data[data.length - 1];
            setX(
                {
                    lat: lastPos.latitude,
                    lng: lastPos.longitude,
                    acc: lastPos.accuracy,
                    key: lastPos._id
                }
            );
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



export default Location;
