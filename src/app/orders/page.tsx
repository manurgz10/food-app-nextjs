"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {

  const { data: session, status } = useSession();

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch(`${apiUrl}/orders`).then((res) =>
        res.json(),
      ),
  })

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ status, id });
    toast.success('Order status updated');
    };

    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ status, id }: { status: string, id: string }) => 
      fetch(`${apiUrl}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
       }
  });

  if (isPending) return 'Loading...'
  console.log(data);

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order: OrderType) => (
            <tr key={order.id} className={`${order.status !== "delivered" && "bg-red-50"}`}>
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">{order.createdAt.toString().slice(0,10 )}</td>
              <td className="py-6 px-1">$ {order.price}</td>
              <td className="hidden md:block py-6 px-1">{order.products.map((product) => product.title).join(', ')
                }</td>
              {session?.user.isAdmin ? (
                <td className="py-6 px-1">
                  <form className="flex items-center justify-items-center gap-4" onSubmit={(e) => handleUpdate(e, order.id)}>
                  <input placeholder={order.status} className="p-2 ring-1 ring-red-100 rounded-md" />
                  <button className="bg-red-400 text-white p-2 rounded-md">
                    <Image src="/pencil.png" width={20} height={20} alt="Edit" />
                  </button>
                  </form>
                </td>) : (
              <td className="py-6 px-1">{order.status}</td>
                )}
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
