export interface Page {
  name: string;
  endpoint: string;
}

export const PAGES: Page[] = [
  {
    name: "Home",
    endpoint: "/",
  },
  {
    name: "Music",
    endpoint: "/music",
  },
  {
    name: "About",
    endpoint: "/about",
  },
  {
    name: "Contact",
    endpoint: "/contact",
  },
];
