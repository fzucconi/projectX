import React, { useEffect, useRef, useState } from "react";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import axios from "axios";

const Picture = (props) => {
  //var today = new Date().toISOString().slice(0, 10);
  // const [date, setDate] = useState(today);
  const [textureUrl, setTextureUrl] = useState(
    "https://b3d.interplanety.org/wp-content/upload_content/2016/08/01-3.jpg"
  );

  const pic = useRef(null);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        "https://imsea.herokuapp.com/api/1?q=nasaAPOD"
      );
      if (data.results && data.results.length > 0) {
        setTextureUrl(data.results[+2]);
        console.log(textureUrl + " nuovo");
      }
    };
    search();
  }, [textureUrl]);

  useFrame((clock) => {
    pic.current.rotation.y = clock.clock.elapsedTime * 0.2;
  });
  const texture = useTexture(textureUrl);
  return (
    <>
      <Sphere args={[2]} position={props.position} ref={pic}>
        <meshStandardMaterial map={texture} transparent />
      </Sphere>
    </>
  );
};

export default Picture;
