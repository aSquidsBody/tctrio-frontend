const local = "http://localhost:3000";

const url = function (path: string) {
  return path;
};

export const ALBUM_URL = url("/api/music/album");
export const TOKEN_URL = url("/api/music/spotify-token");
export const MUSIC_HIGHLIGHTS_URL = url("/api/music/highlights");
export const VIDEO_HIGHLIGHTS_URL = url("/api/videos/highlights");
export const YOUTUBE_URL = url("/api/videos");
export const CONTACT_URL = url("/api/contact");
export const ABOUT_URL = url("/api/about");
export const SHOWS_URL = url("/api/about/shows");

export const MOBILEWIDTH = 650; // pixels

export const SPOTIFY =
  "https://open.spotify.com/artist/63GbQYzf0EbxtI9D23IdrU?si=kLVHVQ3ISASnn7MB7mSvcA&dl_branch=1";

export const YOUTUBE =
  "https://www.youtube.com/channel/UCvRNBogmlEFFfBJyKIJqV-g";

export const TWITTER = "https://twitter.com/tctrio";

export const INSTAGRAM = "https://www.instagram.com/tctrio";

export const FACEBOOK = "https://www.facebook.com/tctrio";
