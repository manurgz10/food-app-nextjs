"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const DeleteButton = ({id} : {id: string }) => {

    const deleteProduct = async (id: string) => {
        const response = await fetch(`${apiUrl}/products/${id}`, {
            method: "DELETE",
            cache: "no-store",
          });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            router.push("/menu");
    }

    const {data: session, status} = useSession();
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return;
    }

  return (
    <button onClick={() => deleteProduct(id)} className="bg-red-400 pg-2 rounded-full absolute top-4 right-4">
        <Image src="/delete.png" alt="delete" width={40} height={40} />
    </button >
  )
}

export default DeleteButton