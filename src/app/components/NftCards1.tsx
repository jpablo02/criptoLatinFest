import React, { useState } from "react";
import Image from "next/image";
import { MintNFT1 } from "../../app/mint-nft1";
// import AnimatedCircle from "../ui/AnimatedCircle"; // Ajusta la ruta según sea necesario

const images = [
  "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/1.jpg",
  "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/2.jpg",
  "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/3.jpg",
  "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/4.jpg",
  "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/5.jpg",
  // Agrega más URLs de imágenes aquí
];

const NftCards1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? prevIndex : prevIndex + 1));
  };

  return (
    <div className="">
      
      <div className="relative z-20">
        <Image
          src={images[currentIndex]}
          width={1200}
          height={630}
          alt="NFT Image"
          className="object-contain w-full h-auto"
          layout="responsive"
        />
      </div>
      <div className="card-body relative z-30 flex items-center justify-between mt-4">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Prev
          </button>
        )}
        <div className="flex flex-col items-center">
          {currentIndex === images.length - 1 && <MintNFT1 />} {/* Botón Mint NFT solo en la última imagen */}
        </div>
        {currentIndex < images.length - 1 && (
          <button
            onClick={handleNext}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NftCards1;
