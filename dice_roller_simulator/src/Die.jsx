import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { MeshStandardMaterial, BoxGeometry } from "three";
import { Html, Text } from "@react-three/drei";

/**
 * Die component
 * - entry: { id, sides, value, ts }
 * - onSettled(entry) called when visual settle completes
 *
 * Physics: each die spawns above the ground with randomized spin and linear impulse.
 * Visual settle detection: die checks its velocity (via the physics body) and when it
 * remains near-zero for a short window we call onSettled.
 *
 * The authoritative value is entry.value (the RNG). We display that number above the die after settle.
 */

export default function Die({ entry, index = 0, onSettled }) {
  const ref = useRef();
  // box body (approx cube), mass can scale with sides a bit
  const mass = Math.max(1, Math.min(3, entry.sides / 6));
  const [boxRef, api] = useBox(() => ({
    mass,
    position: [index * 0.8 - 0.8, 4 + index * 0.2, (Math.random() - 0.5) * 0.6],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    args: [0.9, 0.9, 0.9],
  }));

  useEffect(() => {
    // Apply an initial random impulse + torque to make things lively
    const force = [ (Math.random() - 0.5) * 6, 6 + Math.random() * 4, (Math.random() - 0.5) * 6 ];
    const torque = [ (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6 ];

    // small delay so body exists
    setTimeout(() => {
      api.applyImpulse(force, [0, 0, 0]);
      api.applyTorque(torque);
    }, 50);

    // settle detection
    let settled = false;
    let settleTimer = null;
    const checkInterval = setInterval(() => {
      api.velocity.subscribe((v) => {
        const speed = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        // low velocity & low angular speed => start settle timer
        if (speed < 0.12) {
          if (!settleTimer) {
            settleTimer = setTimeout(() => {
              if (!settled) {
                settled = true;
                onSettled(entry);
              }
            }, 900); // must be low for 0.9s
          }
        } else {
          if (settleTimer) {
            clearTimeout(settleTimer);
            settleTimer = null;
          }
        }
      });
    }, 120);

    return () => {
      clearInterval(checkInterval);
      if (settleTimer) clearTimeout(settleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Material colors
  const asphalt = "#302f2c";
  const paper = "#efede3";

  return (
    <group ref={ref}>
      <mesh ref={boxRef} castShadow receiveShadow>
        <boxBufferGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={asphalt} metalness={0.2} roughness={0.6} />
      </mesh>

      {/* show the numeric result above the die once it exists visually */}
      <Html position={[0, 0.9, 0]} center>
        <div style={{
          minWidth: 36,
          background: paper,
          color: asphalt,
          fontWeight: 700,
          padding: "6px 10px",
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif"
        }}>
          {entry.value}
        </div>
      </Html>
    </group>
  );
}
