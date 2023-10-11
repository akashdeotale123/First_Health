import React from 'react'
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';


export default function CommonForms() {
    return (
        <>
            <Container>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="password"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPasswordCustom">Password</label>
                </Form.Floating>
                <br />
                <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects"
                >
                    <Form.Select aria-label="Floating label select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </FloatingLabel>
                <br />
                <Form.Check
                    type="checkbox"
                    label={`disabled `}
                    id={`disabled-default-`}
                />
                <br />
                <Form.Check
                    type="radio"
                    label="1"
                    id="name"
                />
                <br />
                <Button variant="primary">Primary</Button>{' '}
            </Container>
        </>
    )
}
