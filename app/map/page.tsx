"use client"
import Map from "@/components/maps/Map";
import { Icon, map } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { Marker, useMap, Popup, TileLayer, useMapEvents, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet"
import MainMarker from "@/components/maps/Marker";
import { useSession } from "next-auth/react";
import { useTaskContext } from "@/context/TaskContext";
import useSocket from "@/context/useSocket";

const Markerwhatever = (props) => {
    // const socketRef = useRef<Socket | null>(null);
    const fillBlueOptions = { fillColor: 'blue' }
    const [data, setData] = useState([])
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0,
        key: 0
    })
    const [position, setPosition] = useState([])
    const mapRef = useRef(null)
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()

    //@ts-ignore
    const userId = session?.user?.id
    const username = session?.user?.name

    //@ts-ignore
    const role = session?.user?.role
    const socket = useSocket('http://localhost:8080');


    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

    //create a family room ID
    const familyLocationId = role === "parent" ? userId : state.data?.[0]?.creator

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
                setPosition((prevPos) => [...prevPos, data])
            })
        }
    }, [socket])
    // console.log(position);


    useEffect(() => {
        if (socket) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { longitude, latitude, accuracy } = pos.coords;
                sendLocationData(longitude, latitude, accuracy)
            });
        }
    }, [socket, familyLocationId]);

    const sendLocationData = (lat, lng, acc) => {
        if (socket && familyLocationId) {
            socket.emit("coordinates", familyLocationId, lat, lng, acc, userId, username)
        }
    }

    let greenIcon = new L.Icon({
        iconUrl: "/images/girlchild.png",
        iconSize: [30, 30], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    // console.log(pos))
    useEffect(() => {
        const fetchLocations = async () => {

            try {
                const res = await fetch(`api/location/${familyLocationId}/getlocation`)
                if (!res.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await res.json()
                setData(data)
            } catch (error) {
                console.error("Error fetching locations", error);
            }
        }

        fetchLocations();
    }, [familyLocationId])
    // console.log(data);

    useEffect(() => {
        data && data.map((pos) => {
            // console.log(pos);
            setX({ lat: pos.latitude, lng: pos.longitude, acc: pos.accuracy, key: pos._id })
        })
    }, [data])


    return (
        <div>
            <Map width="800" height="500" center={[x.lat, x.lng]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                <>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {data && data.map((pos) => (
                        < MainMarker greenIcon={greenIcon} fillBlueOptions={fillBlueOptions} data={pos} key={pos._id} />
                    ))}
                </>
            </Map>
        </div>
    );
}
export default Markerwhatever
