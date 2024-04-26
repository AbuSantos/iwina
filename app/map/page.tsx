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
import useSocket from "@/context/useSocket";

const Markerwhatever = (props) => {
    // const socketRef = useRef<Socket | null>(null);
    const fillBlueOptions = { fillColor: 'blue' }
    const [x, setX] = useState({
        lat: 0,
        lng: 0,
        acc: 0
    })

    const mapRef = useRef(null)
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    // console.log(session);

    //@ts-ignore
    const userId = session?.user?.id
    //@ts-ignore
    const role = session?.user?.role
    const socket = useSocket('http://localhost:8080');
    const familyLocation = {}

    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

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
            socket.on("receive-coordinates", ({ familyId, longitude, latitude, accuracy }) => {
                // console.log(familyId, longitude, latitude, accuracy);
                setX({ lat: latitude, lng: longitude, acc: accuracy });

            })
        }

    }, [socket])

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
            socket.emit("coordinates", familyLocationId, lat, lng, acc)
        }
    }

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
            <div className="flex justify-between p-4" >
                {
                    role === "parent" ? <>
                        {
                            state.data?.map((kid) => <button key={kid.id} className="bg-green-600 p-3 text-sm outline-none rounded-sm ">{kid.username}'s location</button>)
                        }
                    </> : <div>
                        <button> {session?.user?.name}'s location</button>
                        {
                            state.data?.map((kid) => <button key={kid.id} className="bg-green-600 p-3 text-sm outline-none rounded-sm ">{kid.username}'s location</button>)
                        }
                    </div>
                }

            </div>
        </div>

    );

}
export default Markerwhatever