import axios from "axios";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CONTACT_URL } from "../../config";

const SUCCESS_MESSAGE = "Form submitted successfully";

function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [venue, setVenue] = useState("");
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState("");

  const isDesktop = useMediaQuery({ query: "(min-width: 650px)" });

  async function sendForm() {
    try {
      await axios.post(CONTACT_URL, { name, email, venue, comment });
      setName("");
      setEmail("");
      setVenue("");
      setComment("");
      setStatus(SUCCESS_MESSAGE);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        console.error(err.response.data.errors);
        setStatus(err.response.data.errors[0].message);
      } else {
        console.error(err);
        setStatus("Something went wrong");
      }
    }
  }

  // styles
  const component: React.CSSProperties = {
    position: "relative",
  };

  const form: React.CSSProperties = {
    margin: "auto",
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const box: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    margin: isDesktop ? undefined : "10px 0px",
    padding: isDesktop ? "10px 5px" : "0px",
    alignItems: isDesktop ? undefined : "center",
    justifyContent: "center",
  };

  const row: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    margin: isDesktop ? undefined : "0px",
    padding: isDesktop ? "10px 5px" : "0px",
    alignItems: isDesktop ? undefined : "center",
    justifyContent: "space-between",
  };

  const pairMember: React.CSSProperties = {
    width: isDesktop ? "48%" : "100%",
    margin: isDesktop ? undefined : "0px",
    padding: isDesktop ? undefined : "0px",
  };

  const lineInput: React.CSSProperties = {
    width: "100%",
    margin: isDesktop ? undefined : "10px 0px",
  };

  const textInput: React.CSSProperties = {
    fontFamily: "var(--alternate-font)",
    fontSize: "1rem",
    lineHeight: "2rem",
    padding: "5px 13px",
    width: "100%",
  };

  const commentBox: React.CSSProperties = {
    fontFamily: "var(--alternate-font)",
    fontSize: "1rem",
    lineHeight: "2rem",
    padding: "5px 13px",
    width: "100%",
    minHeight: " 250px",
    resize: "none",
  };

  const button = (): React.CSSProperties => ({
    fontFamily: "var(--alternate-font)",
    fontSize: "1rem",
    lineHeight: "2rem",
    width: "30%",
    minWidth: "122px",
    background: "var(--primary-color)",
    color: "var(--white-color)",
    cursor: hover ? "pointer" : "",
    opacity: hover ? 0.9 : 1,
  });

  const statusDiv: React.CSSProperties = {
    color: status === SUCCESS_MESSAGE ? "var(--selected-color)" : "red",
    display: status === "" ? "none" : "",
    width: "75%",
    fontFamily: "var(--alternate-font)",
    margin: "auto",
  };

  return (
    <div style={component}>
      <div className="container">
        <div style={form}>
          <div style={row}>
            <div style={pairMember}>
              <div style={lineInput}>
                <input
                  style={textInput}
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name.."
                />
              </div>
            </div>
            <div style={pairMember}>
              <div style={lineInput}>
                <input
                  style={textInput}
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                />
              </div>
            </div>
          </div>
          <div style={row}>
            <div style={lineInput}>
              <input
                style={textInput}
                id="venue"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue (Optional)..."
              />
            </div>
          </div>
          <div style={box}>
            <textarea
              name="Comments"
              id="comment"
              style={commentBox}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment..."
            ></textarea>
          </div>
          <div style={box}>
            <input
              style={button()}
              type="button"
              value="Submit"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={sendForm}
            />
          </div>
        </div>
        <div style={statusDiv}>{status}</div>
      </div>
    </div>
  );
}

export default BookingForm;
