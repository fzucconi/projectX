import React, { useEffect, useRef } from "react";
import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Section(props) {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);
  useEffect(() => {
    if (top.current) {
      console.log(top.current);
    }
  }, [top]);

  const scroll = useScroll();

  useFrame(() => {
    if (top.current) {
      const a = scroll.range(0 / 2, 2 / 2);
      console.log(a);
      const show1 = scroll.visible(0 / 2, 0.05 / 2);
      const show2 = scroll.visible(1 / 2, 0.2 / 2);
      const show3 = scroll.visible(1.9 / 2, 0.2 / 2);

      top.current.classList.toggle("show", show1);
      middle.current.classList.toggle("show", show2);
      bottom.current.classList.toggle("show", show3);
    }
  });

  return (
    <Html style={{ height: "100vh" }}>
      <section className="section">
        <div>
          <h1>{props.text}</h1>
          <p className="subText" ref={top} style={{ fontSize: 20 }}>
            lorem ipsum blablabla
          </p>
        </div>
      </section>
      <section className="section">
        <div>
          <h1>{props.text}</h1>
          <p className="subText" ref={middle} style={{ fontSize: 20 }}>
            lorem ipsum blablabla
          </p>
        </div>
      </section>
      <section className="section">
        <div>
          <h1>{props.text}</h1>
          <p className="subText" ref={bottom} style={{ fontSize: 20 }}>
            lorem ipsum blablablaa
          </p>
        </div>
      </section>
    </Html>
  );
}

export default Section;
