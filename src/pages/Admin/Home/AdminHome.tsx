import React, { useEffect, useState } from "react";
import ManageBio from "../../../components/admin/ManageBio";
import ManageSpotify from "../../../components/admin/ManageSpotify";
import ManageUser from "../../../components/admin/ManageUser";
import ManageYoutube from "../../../components/admin/ManageYoutube";
import ManageShows from "../../../components/admin/shows/ManageShows";
import styles from "./styles/AdminHome.module.css";

function AdminHome() {
  const [selected, setSelected] = useState("");
  const userName = "User Settings";
  const spotifyName = "Spotify";
  const youtubeName = "Youtube";
  const showsName = "Shows";
  const bioName = "Bio";
  const [opened, setOpened] = useState(<></>);

  useEffect(() => {
    let opened: JSX.Element;
    if (selected === userName) opened = <ManageUser />;
    else if (selected === bioName) opened = <ManageBio />;
    else if (selected === showsName) opened = <ManageShows />;
    else if (selected === youtubeName) opened = <ManageYoutube></ManageYoutube>;
    else if (selected === spotifyName) opened = <ManageSpotify></ManageSpotify>;
    else opened = <div></div>;
    setOpened(opened);
  }, [selected]);

  return (
    <div className={styles.component}>
      <div className={styles.redBar}></div>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.menu}>
              <MenuElement
                name={userName}
                selected={selected}
                setSelected={setSelected}
              />
              <MenuElement
                name={spotifyName}
                selected={selected}
                setSelected={setSelected}
              />
              <MenuElement
                name={youtubeName}
                selected={selected}
                setSelected={setSelected}
              />
              <MenuElement
                name={showsName}
                selected={selected}
                setSelected={setSelected}
              />
              <MenuElement
                name={bioName}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.rightBox}>{opened}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuElementProps {
  name: string;
  setSelected: (selected: string) => void;
  selected: string; // not clicked, but selected
}

function MenuElement(props: MenuElementProps) {
  const [mouseDown, setMouseDown] = useState(false);
  const [hover, setHover] = useState(false);

  function onMouseDown(e: React.MouseEvent) {
    setMouseDown(true);
    props.setSelected(props.name);
    document.onmouseup = onMouseUp;
  }

  function onMouseUp() {
    document.onmouseup = null;
  }

  function isSelected() {
    return props.selected === props.name;
  }

  // styles
  const inputStyle: React.CSSProperties = {
    color: isSelected() ? (mouseDown ? "#66ffff" : "#44dddd") : "black",
    cursor: hover ? "pointer" : "default",
    transition: "all .05s ease",
    WebkitTransition: "all .05s ease",
    MozTransition: "all .05s ease",
  };

  const inputOverlay: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    height: "100%",
    width: "100%",
    background: hover ? (mouseDown ? "#bfbfbf" : "#bbb") : "none",
    zIndex: -1,
    transition: "all .05s ease",
    WebkitTransition: "all .05s ease",
    MozTransition: "all .05s ease",
    borderRadius: "5px",
  };

  return (
    <div key={props.name} className={styles.selection}>
      <input
        style={inputStyle}
        type="button"
        value={props.name}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      <div style={inputOverlay}></div>
    </div>
  );
}

export default AdminHome;
