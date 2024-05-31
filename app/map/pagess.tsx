import ServerComponent from '@/components/maps/FetchLocation';
import Markerwhatever from '@/components/maps/Maping';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
// import { getSession } from 'next-auth/react';

export default async function Page() {
    const session = await getServerSession();
    console.log(session)
    const userId = session?.user?.id;
    const username = session?.user?.name;
    // console.log("session", userId);
    const role = session?.user?.role;

    const { familyLocationId, initialData } = await ServerComponent({ userId, role });

    return (
        <Markerwhatever
            initialData={initialData}
            userId={userId}
            username={username}
            role={role}
            familyLocationId={familyLocationId}
        />
    );
}
