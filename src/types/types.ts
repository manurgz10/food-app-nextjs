export type MenuType = {
    id: string;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
  };

export type ProductType = {
    id: string;
    title: string;
    desc: string;
    price: number;
    img?: string;
    catSlug: string;
    isFeatured: boolean;
    options?: { title: string; additionalPrice: number }[];
  };

export type OrderType = {
    id: string;
    date: string;
    price: number;
    products: CartItemType[];
    status: string;
    createdAt: Date;
  };

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    img?: string;
    quantity: number;
    optionTitle?: string;
  };

  export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
  };

export type ActionTypes = {
    addtoCart: (item:CartItemType) => void;
    removeFromCart: (item:CartItemType) => void;
  };