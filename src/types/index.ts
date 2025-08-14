export interface CartItem {
  id: number;
  nameZh: string;
  nameEn: string;
  price: number;
  quantity: number;
  imageThumbnail: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (dish: any, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface DishTag {
  key: string;
  icon: string;
  labelZh: string;
  labelEn: string;
}

export interface OrderSummary {
  items: CartItem[];
  total: number;
  restaurant: {
    name: string;
    phone: string;
    address: string;
  };
}

export type Locale = "zh" | "en";
