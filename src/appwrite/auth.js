import { Account, Avatars, Client, ID } from "appwrite";

const client = new Client();

client
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("653fedcf55995d0bbc39");

const account = new Account(client);
const avatars = new Avatars(client);

const createAccount = async ({ email, password, name }) => {
   try {
      const userAccount = await account.create(
         ID.unique(),
         email,
         password,
         name
      );
      if (userAccount) return await loginUser({ email, password });
      else return userAccount;
   } catch (error) {
      console.error("Appwrite service :: createAccount error:", error);
      throw error;
   }
};

const loginUser = async ({ email, password }) => {
   try {
      return await account.createEmailSession(email, password);
   } catch (error) {
      console.error("Appwrite service :: loginUser error:", error);
      throw error;
   }
};

const getCurrentUser = async () => {
   try {
      return await account.get();
   } catch (error) {
      console.error("Appwrite service :: getCurrentUser error:", error);
      throw error;
   }
};

const getAvatarInitials = (name = "") => {
   try {
      const response = avatars.getInitials(name);
      return response.href;
   } catch (error) {
      console.log("Appwrite service :: getAvatarInitials :: error", error);
      throw error;
   }
};

const logoutUser = async () => {
   try {
      await account.deleteSessions();
   } catch (error) {
      console.error("Appwrite service :: logoutUser error:", error);
      throw error;
   }
};

export {
   createAccount,
   loginUser,
   logoutUser,
   getCurrentUser,
   getAvatarInitials,
};
