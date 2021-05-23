import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container, Jumbotron } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ImageBg from "../images/image_bg.jpeg"
import { Component } from "react"


export async function getUserByUID(UID) {
  return await firebase.database().ref(`Users/${UID}`).once('value');
} 

export default function Login() {
  var sectionStyle = {
    backgroundImage: `url(${ImageBg})`,
  }
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  

  const getMyData = async () => {
    let UID = firebase.auth().currentUser.uid;
    let userData = await getUserDataByUID(UID);
    // this will be null if there's no user data
    // all users' data will be in userData for example:
    console.log(userData.image) // will log the image url you saved.
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
      <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </Container>
  )
}
