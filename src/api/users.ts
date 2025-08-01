import axios from "axios";
import type { User } from "../types/user";

const ENDPOINT_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (): Promise<Array<User>> => {
  try {
    const response = await axios.get(ENDPOINT_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
