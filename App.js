import React, { Component } from "react";
import Expo, { AppLoading } from "expo";
import { I18nManager } from "react-native";

// Component
import MainContent from "./components/MainContent";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";

// NativeBase
import { Root, Container } from "native-base";

// Store
import authStore from "./stores/authStore";

// Routing
import { NativeRouter } from "react-router-native";

I18nManager.forceRTL(false);

class App extends Component {
  constructor() {
    super();
    this.state = {
      fontsReady: false
    };
  }

  componentDidMount() {
    this.loadFonts();
    authStore.checkForToken();
  }

  loadFonts() {
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
      .then(() => this.setState({ fontsReady: true }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.fontsReady) {
      return <AppLoading />;
    }
    return (
      <Root>
        <NativeRouter>
          <Container>
            <MainHeader />
            <MainContent />
            <MainFooter />
          </Container>
        </NativeRouter>
      </Root>
    );
  }
}

export default App;
