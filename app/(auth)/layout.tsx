import { World, GlobeConfig } from "@/components/ui/globe";
import React from "react";

// Configuration for the globe
const globeConfig: GlobeConfig = {
  pointSize: 1.5,
  globeColor: "#1d1f21",
  showAtmosphere: true,
  atmosphereColor: "#3a3a3c",
  atmosphereAltitude: 0.25,
  emissive: "#333333",
  emissiveIntensity: 0.2,
  shininess: 1,
  polygonColor: "rgba(255, 255, 255, 0.6)",
  ambientLight: "#f0f0f0",
  directionalLeftLight: "#ffddc1",
  directionalTopLight: "#ffe4e1",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.5,
  rings: 2,
  maxRings: 5,
  initialPosition: {
    lat: 0,
    lng: 0,
  },
  autoRotate: true,
  autoRotateSpeed: 1.2,
};

// Function to generate random positions
const generateRandomPositions = (num: number): Position[] => {
  const positions: Position[] = [];
  for (let i = 0; i < num; i++) {
    const startLat = Math.random() * 180 - 90;
    const startLng = Math.random() * 360 - 180;
    const endLat = Math.random() * 180 - 90;
    const endLng = Math.random() * 360 - 180;
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    positions.push({
      order: i + 1,
      startLat,
      startLng,
      endLat,
      endLng,
      arcAlt: Math.random() * 0.6 + 0.1, // Random arc height
      color, // Random color
    });
  }
  return positions;
};

// Generate 50 random positions
const data = generateRandomPositions(70);

const TextOverlay = () => (
  <div className='absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
    <h1 className='text-4xl font-extrabold font-inter text-center whitespace-nowrap'>
      Grow your money with us.
    </h1>
    <p className='text-semibold font-ibm-plex-sans text-center'>
      THE MORAN BANK
    </p>
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex min-h-screen w-full font-inter relative'>
      <div className='flex-1'>{children}</div>
      <div className='flex-1 flex justify-center items-center bg-blue-100 relative'>
        <div className='w-full h-full max-w-1/2 max-h-1/2 relative'>
          <World globeConfig={globeConfig} data={data} />
          <TextOverlay />
        </div>
      </div>
    </main>
  );
}
