import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container, Jumbotron } from "react-bootstrap"
import Button from "@material-ui/core/Button"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ImageBg from "../images/image_bg.jpeg"
import { Component } from "react"
import { Fab } from "@material-ui/core"

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
            <Fab variant="extended" disabled={loading} className={classes.extendedIcon} type="submit" color="primary">
              Log In
            </Fab>
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
