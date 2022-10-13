import "./style.css";
import { Canvas } from "@react-three/fiber";
import { SpaceDust } from "./components/SpaceDust";
import GUI from "lil-gui";
import { PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { useRef } from "react";
import Controller from "./components/Controller";
import { Model } from "./components/Model";
import Section from "./components/Section";

function App() {
  const gui = new GUI();
  const cameraRef = new useRef(null);

  console.log(gui);

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas className="webgl">
          <ScrollControls pages={3}>
            <Controller cameraRef={cameraRef} />
            <PerspectiveCamera ref={cameraRef} />
            <ambientLight />
            <directionalLight position={[1, 1, 1]} />
            <SpaceDust count={5000} />
            {gui && <Model gui={gui} />}
          </ScrollControls>
          <Section  text="prova"  position={[-1, 0, -10]} />
          <Section text="prova1" position={[1, -1, -10]}  />
          <Section text="prova2" position={[-1, -2, -10]}  /> 
        </Canvas>
      </div>
      
     
    </div>
  );
}

export default App;
