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

export const spotifyToTrack = (spotifyTrack: SpotifyTrack): Track => {
  return {
    artist: spotifyTrack.artists[0],
    duration: spotifyTrack.duration,
    id: spotifyTrack.id,
    uri: spotifyTrack.uri,
    previewUrl: spotifyTrack.preview_url,
    externalUrl: spotifyTrack.external_urls.spotify,
    type: spotifyTrack.album.album_type,
    name: spotifyTrack.name,
    images: {
      large: spotifyTrack.album.images[0],
      medium: spotifyTrack.album.images[1],
      small: spotifyTrack.album.images[2],
    },
    releaseDate: spotifyTrack.album.release_date,
  };
};

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

export interface Track extends Item {
  artist: Artist;
  duration: number;
  previewUrl: string;
  images: {
    large: AlbumCover;
    medium: AlbumCover;
    small: AlbumCover;
  };
  releaseDate?: string;
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
