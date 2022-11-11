import "./style.css";
import { Canvas } from "@react-three/fiber";
import { SpaceDust } from "./components/SpaceDust";
import GUI from "lil-gui";
import { PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { useRef } from "react";
import Controller from "./components/Controller";
import Model2 from "./components/Model2";
import Section from "./components/Section";
import Picture from "./components/Picture";
import Galaxy from "./components/Galaxy";

function App() {
  const gui = new GUI();
  const cameraRef = new useRef(null);
  // const modelRef = new useRef(null);

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas className="webgl">
          <ScrollControls pages={2}>
            <Controller cameraRef={cameraRef} />
            <PerspectiveCamera ref={cameraRef} />
            <ambientLight />
            <directionalLight position={[1, 1, 1]} />
            <SpaceDust count={10000} />
            {gui && <Model2 gui={gui} />}
            <Section text="prova" />
            <Picture url={["/texture1.jpg"]} position={[-16, -0.5, 45]} />
            <Galaxy />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
