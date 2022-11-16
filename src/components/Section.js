import React, { useEffect, useRef } from "react";
import ReactDOM from "react";
import { Html, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Link from "./Link";
import gsap from "gsap";
import { Portal } from "react-portal";

function Section(props) {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);
  const view1 = props.view1;
  const view2 = props.view2;
  const view3 = props.view3;
  const view4 = props.view4;
  const { camera, scene } = useThree();
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
      z: -50,
    });
    view1.current.classList.toggle("hide");
    view2.current.classList.toggle("hide");
    view3.current.classList.toggle("hide");
    view4.current.classList.toggle("hide");
    //gsap.to(".webgl div", {
    //overflow: "hidden",
    // });
    console.log(view2.current);
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

  const galaxy = (event) => {
    event.preventDefault();
    console.log(camera.position);
    gsap.to(scene.position, {
      duration: 1.5,
      ease: "power2.inOut",
      y: 20,
    });
    view1.current.classList.toggle("hide");
    view2.current.classList.toggle("hide");
    view3.current.classList.toggle("hide");
    view4.current.classList.toggle("hide");
    //gsap.to(".webgl div", {
    //overflow: "hidden",
    // });
  };

  const back = (event) => {
    event.preventDefault();
    console.log(scene.position);
    gsap.to(scene.position, {
      duration: 1.5,
      ease: "power2.inOut",
      z: 0,
      y: 0,
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
      const show1 = scroll.visible(0 / 1, 0.05 / 1);
      const show2 = scroll.visible(0.4 / 1, 0.15 / 1);
      const show3 = scroll.visible(0.8 / 1, 0.25 / 1);
      top.current.classList.toggle("show", show1);
      middle.current.classList.toggle("show", show2);
      bottom.current.classList.toggle("show", show3);
    }
  });

  useEffect(() => {
    if (view2 && view2.current) {
      ReactDOM.createPortal(view2.current, document.body);
    }
  }, [view2]);

  return (
    <>
      <Html style={{ height: "100vh" }} center={true} fullscreen={false}>
        <section className="section">
          <div className="link" onClick={onClick} ref={view1}>
            <h1>
              <Link children="APOD" />
            </h1>
            <p className="subText" ref={top} style={{ fontSize: 20 }}>
              Visit the NASA Astronomy Picture Of The Day planet
            </p>
          </div>
        </section>
        <section className="section">
          <div className="link" onClick={blackHole} ref={view3}>
            <h1>
              <Link children="Black hole" />
            </h1>
            <p className="subText" ref={middle} style={{ fontSize: 20 }}>
              Simulate a Black Hole
            </p>
          </div>
        </section>
        <section className="section">
          <div className="link" onClick={galaxy} ref={view4}>
            <h1>
              <Link children="Galaxy" />
            </h1>
            <p className="subText" ref={bottom} style={{ fontSize: 20 }}>
              Visit my Galaxy shader
            </p>
          </div>
        </section>
        <Portal>
          <div
            onClick={back}
            className="link hide"
            style={{ position: "fixed", bottom: "0", left: "0" }}
            ref={view2}
          >
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
        </Portal>
      </Html>
    </>
  );
}

export default Section;
