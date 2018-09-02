import React, { Component } from "react";

// NativeBase
import { Footer, FooterTab, Button, Icon } from "native-base";

// Router
import { Link } from "react-router-native";

class MainFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Link component={Button} to="/lol">
            <Icon type="Octicons" name="smiley" />
          </Link>
          <Link component={Button} to="/privateLul">
            <Icon name="lock" />
          </Link>
          <Link component={Button} to="/profile">
            <Icon name="person" />
          </Link>
        </FooterTab>
      </Footer>
    );
  }
}

export default MainFooter;
