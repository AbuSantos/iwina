"use client"
import { useState, useRef, Suspense, useEffect } from "react";
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import NotificationToaster from "./NotificationToaster";

interface SessionUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}
const Notification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const { data: session, status } = useSession()
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const user = session.user as SessionUser;
            setUserId(user.id);
        } else {
            console.log("Session or user data is not available yet.");
        }
    }, [session, status]);

    if (status === "loading" || userId === null) {
        return <div>Loading...</div>; // Or a loading spinner
    }
    if (!session || !session.user || !(session.user as any).id) {
        return <div>User not authenticated</div>; // Or redirect to login
    }
    console.log(userId)

    return (
        <Suspense fallback={<div>Loading notifications...</div>} >

            <KnockProvider
                userId={userId}
                apiKey={"pk_test_wZqFpjqAWM5wEij9FTpxN-bCmfnhFB5Eb3fRsEidKZE"}
            >
                <KnockFeedProvider feedId={"98d6ef2d-9d8b-480e-a345-c1fab2a0f15d"}>
                    <>
                        <NotificationIconButton
                            ref={notifButtonRef}
                            onClick={(e) => setIsVisible(!isVisible)}
                        />
                        <NotificationFeedPopover
                            buttonRef={notifButtonRef}
                            isVisible={isVisible}
                            onClose={() => setIsVisible(false)}
                        />
                        <NotificationToaster />
                    </>
                </KnockFeedProvider>
            </KnockProvider>
        </Suspense>

    );
};




export default Notification