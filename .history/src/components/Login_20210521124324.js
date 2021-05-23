import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container, Jumbotron } from "react-bootstrap"

import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ImageBg from "../images/image_bg.jpeg"
import { Component } from "react"

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
    <div>
        <br/>
        <br/>
        <br/>
        <Form onSubmit={handleSubmit} style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
            <Form.Group >
                <Form.Label>Enter your email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group >
                <Form.Label>Enter your password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    </div>
  );
}
