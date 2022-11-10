import { useEffect, useRef } from "react";
import { AdditiveBlending } from "three";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { useFrame, extend } from "@react-three/fiber";

const Galaxy = (props) => {
  const geometry = useRef();
  const galaxyMaterial = useRef();
  useEffect(() => {
    geometry.current.setAttribute(
      "aRandomness",
      new THREE.BufferAttribute(randomness, 3)
    );
    geometry.current.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scales, 1)
    );
    geometry.current.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  });
  /**
   * Galaxy
   */
  const parameters = {};
  parameters.count = 20000;
  parameters.size = 0.5;
  parameters.radius = 10;
  parameters.branches = 4;
  parameters.spin = 1;
  parameters.randomness = 0.5;
  parameters.randomnessPower = 3;
  parameters.insideColor = "#ff6030";
  parameters.outsideColor = "blue";

  /**
   * Geometry
   */
  //geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count);
  const randomness = new Float32Array(parameters.count * 3);
  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    //Scales
    scales[i] = Math.random();
  }

  //geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  //geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  // geometry.setAttribute( "aRandomness",new THREE.BufferAttribute(randomness, 3));

  useFrame((state, delta) => (galaxyMaterial.current.uTime += delta * 0.05));
  return (
    <group position={[0, -32, 0]}>
      <points>
        <bufferGeometry ref={geometry}>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <galaxyMaterial
          depthWrite={false}
          ref={galaxyMaterial}
          uTime={0}
          uSize={100}
          blending={AdditiveBlending}
          vertexColors={true}
        />
      </points>
    </group>
  );
};
extend({
  // shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
  // extend makes it available in JSX, in this case <galaxyMaterial />
  GalaxyMaterial: shaderMaterial(
    {
      uTime: 0,
      uSize: 100,
      aRandomness: new THREE.Vector3(0, 0, 0),
    },
    glsl`
    uniform float uSize;
  attribute float aScale;
  attribute vec3 aRandomness;

  varying vec3 vColor;

  uniform float uTime;
  
  void main(){

            //Position
            vec4 modelPosition = modelMatrix * vec4(position,1.0);

            //Spin
            float angle = atan(modelPosition.x , modelPosition.z);
            float distanceToCenter = length(modelPosition.xz);
            float angleOffset = (1.0 / distanceToCenter)* uTime;
            angle += angleOffset;
            modelPosition.x = cos(angle) * distanceToCenter;
            modelPosition.z = sin(angle) * distanceToCenter;

            //Randomness
            modelPosition.xyz += aRandomness; 
           
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            //Size
            gl_PointSize = uSize * aScale;
            gl_PointSize *= ( 1.0 / - viewPosition.z );

            //Color
            vColor = color;
          
        }`,
    glsl`varying vec3 vColor;
 
    void main(){
            //LightPoint
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 10.0);
            
            //FinalColor
            vec3 color = mix(vec3(0.0), vColor, strength);
            gl_FragColor = vec4(color, 1.0);
    }
            `
  ),
});
export default Galaxy;
