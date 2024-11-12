'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


const Offer = () => {
  const router = useRouter();
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">Sabor que conquista, calidad que se siente</h1>
        <p className="text-white xl:text-xl">
        Disfruta nuestras hamburguesas hechas con ingredientes frescos, carne jugosa y combinaciones únicas. ¡Perfectas para satisfacer todos los antojos!
        </p>
        <button onClick={() => router.push('/menu')} className="bg-red-500 text-white rounded-md py-3 px-6">Explorar</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
