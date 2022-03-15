import axios from "axios";
import { EXTEND_SESSION_URL, LOCAL_STORAGE, LOGIN_URL } from "../config";

const sec = 1_000;
const minute = sec * 60;

function expires() {
  const storage = localStorage.getItem(LOCAL_STORAGE.LOGGED_IN);
  if (storage) {
    return parseInt(storage);
  } else {
    return 0;
  }
}

async function extendSession() {
  try {
    await axios.get(EXTEND_SESSION_URL, {
      withCredentials: true,
    });
    setLogin(Date.now() + 3600 * 1_000);
  } catch (err: any) {
    console.error(err);
  }
}

export function loggedIn() {
  const diff = expires() - Date.now();
  if (diff > 15 * minute) return true; // return true if there is more than 15 mins of session
  if (diff <= 0) return false;

  // extend session if there are less than 15 minutes of session
  extendSession();
  return true;
}

export function setLogin(expires: number) {
  localStorage.setItem(LOCAL_STORAGE.LOGGED_IN, expires.toString());
}

interface LoginResponse {
  username: string;
  email: string;
}

export async function fetchLogin(username: string, password: string) {
  try {
    await axios.post<LoginResponse>(
      LOGIN_URL,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setLogin(Date.now() + 3600 * 1_000);
    return {
      errMsg: "",
    };
  } catch (err: any) {
    if (err.response?.data?.errors) {
      return {
        errMsg: err.response.data.errors[0].message,
      };
    }
    console.error(err);
    return {
      errMsg: "Something went wrong",
    };
  }
}
