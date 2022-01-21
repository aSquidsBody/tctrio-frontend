export interface SpotifyItem {
  type: string;
  id: string;
  name: string;
  artists: Artist[];
  ["external_urls"]: {
    spotify: string;
  };
  uri: string;
}

// response to https://api.spotify.com/v1/tracks/song_id
export interface SpotifyTrack extends SpotifyItem {
  duration: number;
  ["preview_url"]: string;
  ["track_number"]: number;
  album: {
    album_type: string;
    ["external_urls"]: string;
    id: string;
    images: AlbumCover[];
    ["release_date"]: string;
    type: string;
    uri: string;
  };
}

// response to https://api.spotify.com/v1/tracks/song_id
export interface SongResData {
  preview_url: string;
  album: {
    external_urls: { spotify: string };
    album_type: string;
    type: string;
    images: { url: string }[];
    release_date: string;
  };
  name: string;
}

// A preview generated from SongResData
export interface SongPreview {
  previewUrl: string;
  url: string;
  type: string;
  name: string;
  albumLarge: string;
  albumMedium: string;
  albumSmall: string;
  releaseDate: string;
}

export interface Media {
  ids: string[];
}

export interface SpotifyTokenResp {
  expires: string;
  accessToken: string;
}

export interface SpotifyToken {
  expires: Date;
  accessToken: string;
}

interface Item {
  id: string;
  type: string;
  name: string;
  uri: string;
  externalUrl: string;
}

export interface AlbumCover {
  height?: number;
  width?: number;
  url: string;
}

export interface Artist {
  name: string;
  uri: string;
  id: string;
}

//  used by playlist interface
export interface Track {
  id: string;
  album: {
    images: {
      large: AlbumCover;
      medium: AlbumCover;
      small: AlbumCover;
    };
    releaseDate: string;
  };
  previewUrl: string;
  externalUrl: string;
  name: string;
}

export interface Playlist {
  id: string;
  tracks: Track[];
}
/////////////////////

export interface SpotifyItem {
  type: string;
  id: string;
  name: string;
  artists: Artist[];
  ["external_urls"]: {
    spotify: string;
  };
  uri: string;
}

export interface Media {
  ids: string[];
}

export interface SpotifyTokenResp {
  expires: string;
  accessToken: string;
}

export interface SpotifyToken {
  expires: Date;
  accessToken: string;
}

interface Item {
  id: string;
  type: string;
  name: string;
  uri: string;
  externalUrl: string;
}

export interface Album extends Item {
  albumType: string;
  artist: Artist;
  images: {
    large: AlbumCover;
    medium: AlbumCover;
    small: AlbumCover;
  };
  numTracks: number;
  releaseDate: string;
}

export interface AlbumCover {
  height?: number;
  width?: number;
  url: string;
}

export interface Artist {
  name: string;
  uri: string;
  id: string;
}
