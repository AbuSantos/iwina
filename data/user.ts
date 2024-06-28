import NewUser from "@/(models)/NewUser";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await NewUser.findOne({ email: email });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await NewUser.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};
