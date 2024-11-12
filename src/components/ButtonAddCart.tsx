'use client';
import { useRouter } from "next/navigation";

const ButtonAddCart = ({catSlug}: {catSlug : string}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/menu/${catSlug}`)}
      className="bg-red-500 text-white p-2 rounded-md"
    >
      Explorar
    </button>
  );
};

export default ButtonAddCart;
