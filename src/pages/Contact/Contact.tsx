import React, { Component } from "react";
import Body from "../Body";
import CustomHeader from "../../components/CustomHeader";
import BookingForm from "../../components/contact/BookingForm";
import SocialsBar from "../../components/contact/SocialsBar";

import { pageview } from "react-ga";

class Contact extends Component {
  componentDidMount() {
    pageview(window.location.pathname);
  }

  componentStyle: React.CSSProperties = {
    minHeight: "calc(100vh - var(--menu-height))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  contentStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  socialsBar: React.CSSProperties = {};

  render() {
    return (
      <Body page={"Contact"}>
        <div style={this.componentStyle}>
          <div style={this.contentStyle}>
            <CustomHeader value="Booking Form" />
            <BookingForm />
          </div>

          <div style={this.socialsBar}>
            <SocialsBar />
          </div>
        </div>
      </Body>
    );
  }
}

export default Contact;
