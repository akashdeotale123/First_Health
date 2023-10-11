import React from 'react'
import './smoke.css'
import sm from './smoke.mp4'

export default function SearchProvider() {
  return (
    // <section>
    //   {/* <video src="smoke.mp4" autoplay muted></video>     */}

    //   <video width="100%"  controls auto >
    //   <source src={sm} type="video/mp4"/>

    //  </video>
    //   <h1>
    //     <span>AKASH</span>
    //     <span>DEOTALE</span>

    //   </h1>
    // </section>

    <section>
    {/* <video src={sm} autoplay muted></video> */}

    <video src={sm} width="100%"  controls autoplay  >
    <source  type="video/mp4"/>

    </video>
    <h1>
      <span>AKASH</span>
      <span>DEOTALE</span>
    </h1>
  </section>
  )
}
