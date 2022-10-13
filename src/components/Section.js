import React from "react";
import { Html } from '@react-three/drei'

function Section(props) {
  return (
    <Html   className="section">
    <section>
      <h1>{props.text}</h1>
    </section>
    </Html>
  );
}

export default Section;
