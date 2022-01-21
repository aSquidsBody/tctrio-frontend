import React, { Component } from "react";

import styles from "./styles/TextInput.module.css";
import sharedStyles from "../styles/Manage.module.css";

class TextInput extends Component<
  {
    name: string;
    value: string;
    optional?: boolean;
    type?: string;
    onKeyPress?: (e: React.KeyboardEvent) => Promise<void>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  {}
> {
  render() {
    return (
      <div className={styles.component}>
        <p className={sharedStyles.bold}>
          {this.props.name}{" "}
          {this.props.optional ? (
            <span className={styles.optional}>(Optional)</span>
          ) : null}
        </p>
        <div className={sharedStyles.manageInput}>
          <input
            className={styles.textInput}
            type={this.props.type || "text"}
            name={this.props.name}
            id={this.props.name}
            value={this.props.value}
            onKeyPress={this.props.onKeyPress}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}

export default TextInput;
