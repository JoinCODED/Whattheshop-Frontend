import React, { Component } from "react";
import { Icon, View, Text } from "native-base";

class PrivateLul extends Component {
  render() {
    return (
      <View>
        <Icon
          type="Octicons"
          name="lock"
          style={{ fontSize: 180, alignSelf: "center", paddingTop: "50%" }}
        />
        <Text style={{ fontSize: 50, alignSelf: "center" }}>
          Private Route n00b
        </Text>
      </View>
    );
  }
}

export default PrivateLul;
