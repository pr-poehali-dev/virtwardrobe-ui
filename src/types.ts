export type Section = "home" | "wardrobe" | "outfit" | "add" | "random" | "favorites";

export interface ClothingItem {
  id: number;
  name: string;
  category: string;
  color: string;
  image: string;
  favorite: boolean;
  tags: string[];
}

export interface Outfit {
  id: number;
  name: string;
  items: number[];
  image: string;
  favorite: boolean;
  date?: string;
}

export const INITIAL_ITEMS: ClothingItem[] = [
  {
    id: 1,
    name: "Льняная рубашка",
    category: "Верх",
    color: "Молочный",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/b859e0a6-642e-4ebc-9fd5-96db1d403e3a.jpg",
    favorite: false,
    tags: ["casual", "лето"],
  },
  {
    id: 2,
    name: "Прямые брюки",
    category: "Низ",
    color: "Бежевый",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/b859e0a6-642e-4ebc-9fd5-96db1d403e3a.jpg",
    favorite: true,
    tags: ["офис", "базовый"],
  },
  {
    id: 3,
    name: "Водолазка",
    category: "Верх",
    color: "Чёрный",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/5598356c-449d-4932-8a62-72748c43488b.jpg",
    favorite: false,
    tags: ["базовый", "зима"],
  },
  {
    id: 4,
    name: "Классические брюки",
    category: "Низ",
    color: "Графит",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/5598356c-449d-4932-8a62-72748c43488b.jpg",
    favorite: false,
    tags: ["офис", "базовый"],
  },
  {
    id: 5,
    name: "Оверсайз блейзер",
    category: "Верхняя одежда",
    color: "Шалфей",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/f9cc4c5a-fcfd-42a9-822e-4ce5a4d5b53a.jpg",
    favorite: true,
    tags: ["casual", "весна"],
  },
  {
    id: 6,
    name: "Джинсы",
    category: "Низ",
    color: "Голубой",
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/f9cc4c5a-fcfd-42a9-822e-4ce5a4d5b53a.jpg",
    favorite: false,
    tags: ["casual"],
  },
];

export const INITIAL_OUTFITS: Outfit[] = [
  {
    id: 1,
    name: "Офисный минимализм",
    items: [3, 4],
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/5598356c-449d-4932-8a62-72748c43488b.jpg",
    favorite: true,
    date: "2026-04-06",
  },
  {
    id: 2,
    name: "Весенняя прогулка",
    items: [5, 6],
    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/f9cc4c5a-fcfd-42a9-822e-4ce5a4d5b53a.jpg",
    favorite: false,
    date: "2026-04-05",
  },
];

export const CATEGORIES = ["Все", "Верх", "Низ", "Верхняя одежда", "Обувь", "Аксессуары"];

export const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "wardrobe", label: "Гардероб", icon: "Shirt" },
  { id: "outfit", label: "Образ дня", icon: "Sparkles" },
  { id: "add", label: "Добавить", icon: "Plus" },
  { id: "random", label: "Случайный", icon: "Shuffle" },
  { id: "favorites", label: "Избранное", icon: "Heart" },
] as const;
