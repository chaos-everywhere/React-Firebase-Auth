import React from "react"
import Signup from "./Signup"
import { Container, Jumbotron } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import ImageBg from "../images/image_bg.jpeg"
import LeftSide from "../components/LeftSide";
import Menu from "../components/Menu";
import RightSide from "../components/RightSide";

function App() {
  return (
    <div className="App">
    <Menu />
    <Row className="landing">
      <Col ><LeftSide /></Col>
      
      <Col ><RightSide /></Col>
    </Row>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
      </div>
  )
}

export default App
