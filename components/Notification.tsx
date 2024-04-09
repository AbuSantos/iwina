"use client"
import { useState, useRef } from "react";
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";

const Notification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const { data: session, status } = useSession()
    //@ts-ignore
    const userId = session?.user?.id

    return (
        <KnockProvider
            apiKey={"pk_test_wZqFpjqAWM5wEij9FTpxN-bCmfnhFB5Eb3fRsEidKZE"}
            userId={userId}
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
                </>
            </KnockFeedProvider>
        </KnockProvider>
    );
};

export default Notification