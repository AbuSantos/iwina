import { getSession } from "next-auth/react";

export async function getFamilyLocationId(userId, role) {
  if (role === "parent") {
    return userId;
  } else {
    const fetchkids = async () => {
      try {
        const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);
        if (!res.ok) {
          throw new Error("Failed to fetch kids");
        }
        const data = await res.json();
        return data.map((kid) => kid.creator)(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchkids();
  }
}

export async function fetchInitialData(familyLocationId) {
  try {
    const res = await fetch(`api/location/${familyLocationId}/getlocation`);
    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching initial locations", error);
    return [];
  }
}

export default async function ServerComponent({ userId, role }) {
  const familyLocationId = await getFamilyLocationId(userId, role);
  const initialData = await fetchInitialData(familyLocationId);
  return { familyLocationId, initialData };
}
