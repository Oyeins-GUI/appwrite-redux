import { Client, Account } from "appwrite";

const client = new Client();

client
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("653fedcf55995d0bbc39");

export const account = new Account(client);
export { ID } from "appwrite";
