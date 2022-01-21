import axios from "axios";
import React, { Component } from "react";
import { CONTACT_URL } from "../../config";
import styles from "./styles/BookingForm.module.css";

class BookingForm extends Component {
  url = CONTACT_URL;
  state = {
    name: {
      ref: React.createRef<HTMLInputElement>(),
      error: "",
    },
    email: {
      ref: React.createRef<HTMLInputElement>(),
      error: "",
    },
    venue: {
      ref: React.createRef<HTMLInputElement>(),
      error: "",
    },
    comment: {
      ref: React.createRef<HTMLTextAreaElement>(),
      error: "",
    },
  };

  submitForm = async () => {
    // collect values
    // send request
  };

  sendForm = async () => {
    try {
      await axios.post(this.url, this.state);
      this.setState({
        name: "",
        email: "",
        venue: "",
        comment: "",
      });
    } catch (err: any) {
      if (err.response?.status === 400) {
      }
    }
  };

  render() {
    return (
      <div className={styles.component}>
        <div className="container">
          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.pairMember}>
                <div className={styles.lineInput}>
                  <input
                    className={styles.textInput}
                    id="name"
                    type="text"
                    ref={this.state.name.ref}
                    placeholder="Name.."
                  />
                  <p ref={this.state.name.error}></p>
                </div>
              </div>
              <div className={styles.pairMember}>
                <div className={styles.lineInput}>
                  <input
                    className={styles.textInput}
                    id="email"
                    type="text"
                    ref={this.state.email.ref}
                    placeholder="Email..."
                  />
                  <p ref={this.state.email.error}></p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.lineInput}>
                <input
                  className={styles.textInput}
                  id="venue"
                  type="text"
                  ref={this.state.venue.ref}
                  placeholder="Venue (Optional)..."
                />
                <p ref={this.state.venue.error}></p>
              </div>
            </div>
            <div className={styles.box}>
              <textarea
                name="Comments"
                id="comment"
                className={styles.commentBox}
                ref={this.state.comment.ref}
                placeholder="Comment..."
              ></textarea>
              <p ref={this.state.comment.error}></p>
            </div>
            <div className={styles.box}>
              <input className={styles.button} type="button" value="Submit" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingForm;
