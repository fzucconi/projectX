/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Model2 = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/model2.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (group.current && props.gui) {
      props.gui
        .add(group.current.rotation, "x")
        .max(Math.PI)
        .min(-Math.PI)
        .step(0.01)
        .name("x-rotation");
      props.gui
        .add(group.current.rotation, "y")
        .max(Math.PI)
        .min(-Math.PI)
        .step(0.01)
        .name("y-rotation");
      props.gui.add(group.current.position, "z", -10, 10, 0.01);
      actions[animations[3].name].reset().play();
    }
  }, [props.gui, actions, animations]);

  /*   useEffect(() => {
    if (group && group.current) {
      props.setRef(group.current);
    }
  }, [group, group.current]); */

  const scroll = useScroll();

  useFrame(({ clock, camera }) => {
    //scroll Range

    const r1 = scroll.curve(0 / 1, 1 / 1);
    const cameraRange = scroll.range(0 / 1, 1 / 1);

    //ScrollBased Animations
    group.current.position.x = -2 * r1;

    group.current.position.y = -cameraRange * 10;

    camera.position.y = -cameraRange * 10;
    camera.updateProjectionMatrix();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Swim"
          position={[1, -1, 2]}
          rotation={[Math.PI / 2.5, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="vanguard_Mesh001"
            geometry={nodes.vanguard_Mesh001.geometry}
            material={materials["VanguardBodyMat.001"]}
            skeleton={nodes.vanguard_Mesh001.skeleton}
          />
          <skinnedMesh
            name="vanguard_visor001"
            geometry={nodes.vanguard_visor001.geometry}
            material={materials["Vanguard_VisorMat.001"]}
            skeleton={nodes.vanguard_visor001.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/model2.glb");

export default Model2;
