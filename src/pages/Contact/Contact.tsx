import React, { Component } from "react";
import Body from "../Body";
import CustomHeader from "../../components/CustomHeader";
import BookingForm from "../../components/contact/BookingForm";
import SocialsBar from "../../components/contact/SocialsBar";

import styles from "./styles/Contact.module.css";
import { pageview } from "react-ga";

class Contact extends Component {
  componentDidMount() {
    pageview(window.location.pathname);
  }

  render() {
    return (
      <Body page={"Contact"}>
        <div className={styles.component}>
          <CustomHeader value="Booking Form" />
          <BookingForm />
          <div className={styles.socialsBar}>
            <SocialsBar />
          </div>
        </div>
      </Body>
    );
  }
}

export default Contact;
