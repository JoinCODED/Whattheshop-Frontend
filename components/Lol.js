import React, { Component } from "react";
import { Icon } from "native-base";

class Lol extends Component {
  render() {
    return (
      <Icon
        type="Octicons"
        name="smiley"
        style={{
          fontSize: 300,
          alignSelf: "center",
          paddingTop: "50%",
          color: "red"
        }}
      />
    );
  }
}

export default Lol;
