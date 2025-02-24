import { prisma } from "@/lib/prisma";
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error in getUserById", error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByEmail", error);
    return null;
  }
};
