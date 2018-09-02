import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";

// Utils
import setAuthToken from "../utils/setAuthToken";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

class Store {
  constructor() {
    this.user = null;
  }

  get isAuthenticated() {
    return !!this.user;
  }

  setCurrentUser(decoded) {
    this.user = decoded;
  }

  logoutUser() {
    AsyncStorage.removeItem("jwtToken").then(
      () => {
        this.user = null;
        setAuthToken();
      },
      () => {
        console.log("something went wrong with logging out");
      }
    );
  }

  loginUser(username, password) {
    const userData = {
      username: username,
      password: password
    };
    instance
      .post("/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token).then(
          () => {
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
          },
          () => console.log("something went wrong with setting jwt token")
        );
      })
      .catch(err => console.log("something went wrong logging in"));
  }

  checkForToken = () => {
    AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          const currentTime = Date.now() / 1000;

          // Decode token and get user info
          const decoded = jwt_decode(token);

          // Check token expiration
          if (decoded.exp >= currentTime) {
            // Set auth token header
            setAuthToken(token);
            // Set user and isAuthenticated
            this.setCurrentUser(decoded);
          } else {
            this.logoutUser();
            // Redirect to login
          }
        }
      })
      .catch(err => console.error(err));
  };
}

decorate(Store, {
  user: observable,
  isAuthenticated: computed
});

export default new Store();
