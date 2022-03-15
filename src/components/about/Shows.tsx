import axios from "axios";
import React, { useEffect, useState } from "react";
import { SHOWS_URL } from "../../config";
import { Show } from "../../types/show";
import { ShowsList } from "./ShowsList";

interface ShowsResponse {
  upcomingShows: Show[];
  pastShows: Show[];
}

export async function fetchData(
  setUpcomingShows: (s: Show[]) => void,
  setPastShows: (s: Show[]) => void
) {
  const res = await axios.get<ShowsResponse>(SHOWS_URL);
  setUpcomingShows(res.data.upcomingShows);
  setPastShows(res.data.pastShows);
}

interface ShowsProps {
  style?: React.CSSProperties;
}

function Shows(props: ShowsProps) {
  const [upcomingShows, setUpcomingShows] = useState([] as Show[]);
  const [pastShows, setPastShows] = useState([] as Show[]);

  useEffect(() => {
    try {
      fetchData(setUpcomingShows, setPastShows);
    } catch (err: any) {
      console.error(err);
    }
  }, []);

  return (
    <div style={props.style}>
      <ShowsList
        showsList={upcomingShows}
        title={"Upcoming shows"}
        alt={false}
      ></ShowsList>
      <ShowsList
        showsList={pastShows}
        title={"Past Shows"}
        alt={true}
      ></ShowsList>
    </div>
  );
}

export default Shows;
