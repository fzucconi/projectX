import React from "react";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Controller(props) {
  //Scene Position
  const scenePos = useRef({});

  useEffect(() => {
    const onMouseMove = (e) => {
      //Mouse Position's infos
      const info = {
        x: (e.clientX / window.innerWidth - 0.5) * 1.5,
        y: -(e.clientY / window.innerHeight - 0.5) * 1.5,
      };
      scenePos.current = info;
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [props.gui]);

  useFrame(({ scene }) => {
    //Scene Animation
    scene.rotation.y = -scenePos.current?.x || 0;
    //scene.rotation.y = -scenePos.current.x;
  });

  return <></>;
}
export default Controller;
