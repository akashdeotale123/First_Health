import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import batchimg from "../Image/ophthalmologist-consulting-woman-in-clinic-2021-09-24-04-16-18-utc.jpg";
import claimimg from "../Image/patient-consulting-with-doctor-2021-08-29-18-27-29-utc.jpg";
import patientimg from "../Image/smiling-black-doctor-consulting-female-doctor-in-c-2023-01-31-18-10-19-utc.jpg";
import Cards from './Cards';



export default function Carousels() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
    <Container className='mt-4'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{height :"500px"}}>
        <img
          className="d-block w-100"
          src={batchimg}
          alt="First slide"
        />
        <Carousel.Caption  style={{color :"black","font-weight": "600"}}>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          <Cards/>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={{height :"500px"}}>
        <img
          className="d-block w-100"
          src={claimimg}
          alt="Second slide"
        />

        <Carousel.Caption style={{color :"black","font-weight": "600"}}>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          <Cards/>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={{height :"500px"}}>
        <img
          className="d-block w-100"
          src={patientimg}
          alt="Third slide"
        />

        <Carousel.Caption style={{color :"black","font-weight": "600"}}>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
          <Cards/>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
    </>
  )
}
