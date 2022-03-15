// const local = "http://localhost:3000";

const url = function (path: string) {
  // return local + path;
  return path;
};

export const ORIGINAL = false;
export const POP_OUT = false;
export const POP_OUT_COLOR_SCHEME = false;

export const NAV_ELEMS_WIDTH = 340; // px
export const BACKGROUND_GREY = "#303030";
export const MUSIC_CARD_COLOR = BACKGROUND_GREY;
export const MOBILE_HOME_COLOR = "#a4a4a4";
export const BACKGROUND_GREY_GRADIENT =
  "linear-gradient(0.35turn, #404040, 3%, #303030, 85%, #404040)";
// export const BACKGROUND_GREY = "var(--primary-color)";
export const WEBSITE_WIDTH = {
  STRING: "1480px",
  NUMBER: 1480,
};

export const HIGHLIGHT_SONGS = "highlightSongs";
export const HIGHLIGHT_VIDEOS = "highlightVideos";
export const MAIN_VIDEOS = "mainVideos";

export const ALBUM_URL = url("/api/music/album");
export const TOKEN_URL = url("/api/music/spotify-token");
export const MUSIC_HIGHLIGHTS_URL = url(
  "/api/music/playlists/" + HIGHLIGHT_SONGS
);
export const VIDEO_HIGHLIGHTS_URL = url(
  "/api/videos/playlists/" + HIGHLIGHT_VIDEOS
);
export const SPOTIFY_PLAYLISTS_URL = url("/api/music/playlists");
export const YOUTUBE_PLAYLISTS_URL = url("/api/videos/playlists");

export const YOUTUBE_URL = url("/api/videos/playlists/" + MAIN_VIDEOS);
export const CONTACT_URL = url("/api/contact");
export const ABOUT_URL = url("/api/about");
export const SHOWS_URL = url("/api/about/shows");
export const CURRENT_USER = url("/api/users/current-user");
export const UPDATE_USER = url("/api/users/update");
export const LOGIN_URL = url("/api/users/signin");
export const LOGOUT_URL = url("/api/users/signout");
export const SIGNUP_URL = url("/api/users/signup");
export const EXTEND_SESSION_URL = url("/api/users/extend-session");
export const LOCAL_STORAGE = {
  LOGGED_IN: "tctrioLoggedIn",
  EXPIRATION: "tctrioExpires",
};
export const LOGIN_ROUTE = "login";

export const MOBILEWIDTH = 650; // pixels

export const SPOTIFY =
  "https://open.spotify.com/artist/63GbQYzf0EbxtI9D23IdrU?si=kLVHVQ3ISASnn7MB7mSvcA&dl_branch=1";

export const YOUTUBE =
  "https://www.youtube.com/channel/UCvRNBogmlEFFfBJyKIJqV-g";

export const TWITTER = "https://twitter.com/tctrio";

export const INSTAGRAM = "https://www.instagram.com/tctrio";

export const FACEBOOK = "https://www.facebook.com/tctrio";
