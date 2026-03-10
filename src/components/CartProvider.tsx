 "use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type CartItemCore = {
  id: string;
  name: string;
  pricePerEvent: number;
};

export type CartItem = CartItemCore & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addItem: (item: CartItemCore) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "decorent-cart-v1";

function loadInitialState(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items
        .filter((i) => i && typeof i.id === "string")
        .map((i) => ({
          id: i.id,
          name: i.name,
          pricePerEvent: Number(i.pricePerEvent) || 0,
          quantity: Math.max(1, Number(i.quantity) || 1)
        }))
    };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initial = loadInitialState();
    setState(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // игнорируем проблемы с localStorage в MVP
    }
  }, [state, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const totalAmount = state.items.reduce(
      (sum, item) => sum + item.pricePerEvent * item.quantity,
      0
    );
    const totalItems = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      items: state.items,
      totalAmount,
      totalItems,
      addItem: (item) => {
        setState((prev) => {
          const existing = prev.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: prev.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            };
          }
          return {
            items: [
              ...prev.items,
              {
                ...item,
                quantity: 1
              }
            ]
          };
        });
      },
      increaseQuantity: (id) => {
        setState((prev) => ({
          items: prev.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }));
      },
      decreaseQuantity: (id) => {
        setState((prev) => ({
          items: prev.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0)
        }));
      },
      removeItem: (id) => {
        setState((prev) => ({
          items: prev.items.filter((i) => i.id !== id)
        }));
      },
      clear: () => setState({ items: [] })
    };
  }, [state]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

