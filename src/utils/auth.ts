import { LOCAL_STORAGE } from "../config";

export function loggedIn() {
  const storage = localStorage.getItem(LOCAL_STORAGE.LOGGED_IN);
  return storage === "true";
}

export function setLogin(login: boolean) {
  if (login) localStorage.setItem(LOCAL_STORAGE.LOGGED_IN, "true");
  else localStorage.setItem(LOCAL_STORAGE.LOGGED_IN, "false");
}
