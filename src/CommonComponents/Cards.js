import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { AiTwotoneHome, AiFillDatabase, AiFillFile, AiOutlineQuestionCircle, AiFillCaretRight, AiFillMedicineBox, AiFillReconciliation, AiTwotoneFolderOpen, AiFillProfile } from "react-icons/ai";
import { Icon } from '@iconify/react';

export default function Cards() {
  return (
    <div>
        <Container>
         <Row>
            <Col xs={3} className='mb-2'>
              <Card border="primary" style={{ width: '12rem' }} className='card'>
                <Card.Header>
                  <Icon icon="carbon:batch-job" className='card-icon' />
                </Card.Header>
                <Card.Body className=' mt-2'>
                  <Card.Title className='card-heading'>
                    <a className='card-heading mt-2'>Batch <AiFillCaretRight /></a>
                  </Card.Title>
                  <Card.Text className='card-text'>
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={3} className='mb-2'>
              <Card border="primary" style={{ width: '12rem' }} className='card'>
                <Card.Header>
                  <Icon icon="akar-icons:reciept" className='card-icon' />
                </Card.Header>
                <Card.Body>
                  <Card.Title className='card-heading'>
                    <a className='card-heading'>Claim <AiFillCaretRight /></a>
                  </Card.Title>
                  <Card.Text className='card-text'>
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={3} className='mb-2'>
              <Card border="primary" style={{ width: '12rem' }} className='card'>
                <Card.Header>
                  <Icon icon="material-symbols:patient-list-outline" className='card-icon' />
                </Card.Header>
                <Card.Body>
                  <Card.Title className='card-heading'>
                    <a className='card-heading'>Patient <AiFillCaretRight /></a>
                  </Card.Title>
                  <Card.Text className='card-text'>
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={3} className='mb-2'>
              <Card border="primary" style={{ width: '12rem' }} className='card'>
                <Card.Header>
                  <Icon icon="maki:doctor" className='card-icon' />
                </Card.Header>
                <Card.Body>
                  <Card.Title className='card-heading'>
                    <a className='card-heading'>Provider <AiFillCaretRight /></a>
                  </Card.Title>
                  <Card.Text className='card-text'>
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
    </div>
  )
}
