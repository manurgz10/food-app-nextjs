import { MenuType } from "@/types/types";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getData = async () => {
  try {
    const response = await fetch(`${apiUrl}/categories`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.categories || []; // Asegúrate de que siempre devuelva un arreglo
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};


const MenuPage = async () => {
  const menu = await getData();
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.length > 0 ? (
        menu.map((category: MenuType) => (
          <Link
            href={`/menu/${category.slug}`}
            key={category.id}
            className="w-full h-1/3 bg-cover p-8 md:h-1/2"
            style={{ backgroundImage: `url(${category.img})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          >
            <div className={`text-${category.color} w-1/2`}>
              <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
              <p className="text-sm my-8">{category.desc}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};


export default MenuPage;