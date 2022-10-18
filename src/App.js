import "./style.css";
import { Canvas } from "@react-three/fiber";
import { SpaceDust } from "./components/SpaceDust";
import GUI from "lil-gui";
import { PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { useRef } from "react";
import Controller from "./components/Controller";
import { Model } from "./components/Model";
import { Astronaut } from "./components/Astronaut";
import Section from "./components/Section";

function App() {
  const gui = new GUI();

  const cameraRef = new useRef(null);

  console.log(gui);

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas className="webgl">
          <ScrollControls pages={2}>
            <Controller cameraRef={cameraRef} />
            <PerspectiveCamera ref={cameraRef} />
            <ambientLight />
            <directionalLight position={[1, 1, 1]} />
            <SpaceDust count={5000} />
            {gui && <Model gui={gui} />}
            <Astronaut />
            <Section text="prova" />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
