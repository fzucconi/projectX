import React, { useEffect, useRef } from "react";
import { Html, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Link from "./Link";
import gsap from "gsap";

function Section(props) {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);
  const view1 = useRef(null);
  const view2 = useRef(null);
  const view3 = useRef(null);
  const view4 = useRef(null);
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    if (view1.current && view2.current) {
    }
  }, [top, middle, bottom, view1, view2]);

  const onClick = (event) => {
    event.preventDefault();
    console.log(scene.position);
    gsap.to(scene.position, {
      duration: 1.5,
      ease: "power2.inOut",
      z: -15,
    });
    view1.current.classList.toggle("hide");
    view2.current.classList.toggle("hide");
    view3.current.classList.toggle("hide");
    view4.current.classList.toggle("hide");
    //gsap.to(".webgl div", {
    //overflow: "hidden",
    // });
  };
  const blackHole = (event) => {
    event.preventDefault();
    console.log(scene.scale);
    gsap.to(scene.rotation, {
      duration: 0.5,
      ease: "power2.easeInOut",
      x: 5,
    });
    gsap.to(scene.scale, {
      duration: 1,
      ease: "power2.easeInOut",
      x: 0,
      z: 0,
    });
    view1.current.classList.toggle("hide");
    view2.current.classList.toggle("hide");
    view3.current.classList.toggle("hide");
    view4.current.classList.toggle("hide");
  };

  const back = (event) => {
    event.preventDefault();
    console.log(scene.position);
    gsap.to(scene.position, {
      duration: 1.5,
      ease: "power2.inOut",
      z: 0,
    });
    gsap.to(scene.scale, {
      duration: 1.5,
      ease: "power2.inOut",
      z: 1,
      x: 1,
      y: 1,
    });
    gsap.to(scene.rotation, {
      duration: 2,
      ease: "power2.inOut",
      x: 0,
    });

    view1.current.classList.toggle("hide");
    view2.current.classList.toggle("hide");
    view3.current.classList.toggle("hide");
    view4.current.classList.toggle("hide");
  };

  const scroll = useScroll();
  useFrame(() => {
    if (top.current) {
      const show1 = scroll.visible(0 / 2, 0.05 / 2);
      const show2 = scroll.visible(1 / 2, 0.25 / 2);
      const show3 = scroll.visible(1.9 / 2, 0.25 / 2);

      top.current.classList.toggle("show", show1);
      middle.current.classList.toggle("show", show2);
      bottom.current.classList.toggle("show", show3);
    }
  });

  return (
    <Html style={{ height: "100vh" }}>
      <section className="section">
        <div className="link" onClick={onClick} ref={view1}>
          <h1>
            <Link
              scene={scene}
              //href="/src/App.js"
              children="Link1"
            />
          </h1>
          <p className="subText" ref={top} style={{ fontSize: 20 }}>
            lorem ipsum blablabla
          </p>
        </div>
      </section>
      <section className="section">
        <div className="link" onClick={blackHole} ref={view3}>
          <h1>
            <Link
              //href="/src/App.js"
              children="Link2"
            />
          </h1>
          <p className="subText" ref={middle} style={{ fontSize: 20 }}>
            lorem ipsum blablabla
          </p>
        </div>
      </section>
      <section className="section">
        <div className="link" ref={view4}>
          <h1>
            <Link
              //href="/src/App.js"
              children="Link3"
            />
          </h1>
          <p className="subText" ref={bottom} style={{ fontSize: 20 }}>
            lorem ipsum blablablaa
          </p>
        </div>
      </section>

      <div onClick={back} className="link hide" ref={view2}>
        <svg
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="white"
        >
          <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
        </svg>
      </div>
    </Html>
  );
}

export default Section;
