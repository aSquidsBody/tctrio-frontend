import { Component } from "react";
import Body from "../Body";
import CustomHeader from "../../components/CustomHeader";
import BookingForm from "../../components/contact/BookingForm";
import SocialsBar from "../../components/contact/SocialsBar";

import styles from "./styles/Contact.module.css";

class Contact extends Component {
  render() {
    return (
      <Body>
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
