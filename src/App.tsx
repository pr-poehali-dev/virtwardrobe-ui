import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "wardrobe" | "outfit" | "add" | "random" | "favorites";

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  color: string;
  image: string;
  favorite: boolean;
  tags: string[];
}

interface Outfit {
  id: number;
  name: string;
  items: number[];
  image: string;
  favorite: boolean;
  date?: string;
}

const INITIAL_ITEMS: ClothingItem[] = [
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

const INITIAL_OUTFITS: Outfit[] = [
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

const CATEGORIES = ["Все", "Верх", "Низ", "Верхняя одежда", "Обувь", "Аксессуары"];

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "wardrobe", label: "Гардероб", icon: "Shirt" },
  { id: "outfit", label: "Образ дня", icon: "Sparkles" },
  { id: "add", label: "Добавить", icon: "Plus" },
  { id: "random", label: "Случайный", icon: "Shuffle" },
  { id: "favorites", label: "Избранное", icon: "Heart" },
] as const;

export default function App() {
  const [section, setSection] = useState<Section>("home");
  const [items, setItems] = useState<ClothingItem[]>(INITIAL_ITEMS);
  const [outfits, setOutfits] = useState<Outfit[]>(INITIAL_OUTFITS);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [randomOutfit, setRandomOutfit] = useState<ClothingItem[] | null>(null);
  const [addForm, setAddForm] = useState({ name: "", category: "Верх", color: "", tags: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFavoriteItem = (id: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  };

  const toggleFavoriteOutfit = (id: number) => {
    setOutfits((prev) => prev.map((o) => (o.id === id ? { ...o, favorite: !o.favorite } : o)));
  };

  const generateRandom = () => {
    const tops = items.filter((i) => i.category === "Верх");
    const bottoms = items.filter((i) => i.category === "Низ");
    const outers = items.filter((i) => i.category === "Верхняя одежда");
    const result: ClothingItem[] = [];
    if (tops.length) result.push(tops[Math.floor(Math.random() * tops.length)]);
    if (bottoms.length) result.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
    if (outers.length && Math.random() > 0.5) result.push(outers[Math.floor(Math.random() * outers.length)]);
    setRandomOutfit(result);
    setSection("random");
  };

  const filteredItems =
    activeCategory === "Все" ? items : items.filter((i) => i.category === activeCategory);

  const favoriteItems = items.filter((i) => i.favorite);
  const favoriteOutfits = outfits.filter((o) => o.favorite);

  const navigate = (s: Section) => {
    if (s === "random") {
      generateRandom();
    } else {
      setSection(s);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="font-display text-2xl font-light tracking-widest text-foreground hover:opacity-70 transition-opacity"
          >
            VIRTWARDROBE
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Section)}
                className={`nav-link text-sm tracking-wider font-body font-light transition-opacity hover:opacity-100 ${
                  section === item.id ? "opacity-100 active" : "opacity-50"
                }`}
              >
                {item.label.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Section)}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm tracking-wider font-body font-light border-b border-border/40 transition-opacity ${
                  section === item.id ? "opacity-100" : "opacity-50"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* HOME */}
        {section === "home" && (
          <div className="min-h-[calc(100vh-64px)] flex flex-col">
            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
              <p className="animate-fade-up delay-100 font-body text-xs tracking-[0.3em] text-muted-foreground mb-8">
                ПЕРСОНАЛЬНЫЙ ГАРДЕРОБ
              </p>
              <h1 className="animate-fade-up delay-200 font-display text-6xl md:text-8xl font-light leading-none tracking-tight text-foreground mb-8">
                Твой стиль,<br />
                <em>в порядке</em>
              </h1>
              <p className="animate-fade-up delay-300 font-body text-sm text-muted-foreground max-w-sm leading-relaxed mb-12">
                Организуй гардероб, создавай образы и открывай новые сочетания каждый день
              </p>
              <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("wardrobe")}
                  className="px-8 py-3 bg-foreground text-background text-xs tracking-widest font-body font-normal hover:opacity-80 transition-opacity"
                >
                  МОЙ ГАРДЕРОБ
                </button>
                <button
                  onClick={() => navigate("random")}
                  className="px-8 py-3 border border-border text-foreground text-xs tracking-widest font-body font-normal hover:bg-secondary transition-colors"
                >
                  СЛУЧАЙНЫЙ ОБРАЗ
                </button>
              </div>
            </div>

            {/* Stats strip */}
            <div className="animate-fade-up delay-500 border-t border-border grid grid-cols-3">
              {[
                { label: "Вещей", value: items.length },
                { label: "Образов", value: outfits.length },
                { label: "В избранном", value: favoriteItems.length + favoriteOutfits.length },
              ].map((stat) => (
                <div key={stat.label} className="py-8 flex flex-col items-center border-r border-border last:border-r-0">
                  <span className="font-display text-4xl font-light text-foreground">{stat.value}</span>
                  <span className="font-body text-xs tracking-widest text-muted-foreground mt-1">
                    {stat.label.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            {/* Recent outfits */}
            <div className="border-t border-border px-6 py-12">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl font-light text-foreground mb-8">Последние образы</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outfits.map((outfit, i) => (
                    <div
                      key={outfit.id}
                      className="card-hover cursor-pointer bg-card border border-border overflow-hidden animate-fade-up"
                      style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                      onClick={() => navigate("outfit")}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={outfit.image}
                          alt={outfit.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <div>
                          <p className="font-display text-lg font-light text-foreground">{outfit.name}</p>
                          <p className="font-body text-xs text-muted-foreground tracking-wider mt-0.5">
                            {outfit.date}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavoriteOutfit(outfit.id); }}
                          className="transition-opacity hover:opacity-100 opacity-60"
                        >
                          <Icon name="Heart" size={18} className={outfit.favorite ? "fill-foreground" : ""} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WARDROBE */}
        {section === "wardrobe" && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">КОЛЛЕКЦИЯ</p>
                <h2 className="font-display text-5xl font-light text-foreground">Гардероб</h2>
              </div>
              <button
                onClick={() => navigate("add")}
                className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-xs tracking-widest font-body hover:opacity-80 transition-opacity"
              >
                <Icon name="Plus" size={14} />
                ДОБАВИТЬ
              </button>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 text-xs tracking-widest font-body border transition-colors ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-border hover:border-foreground/40"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, i) => (
                <div
                  key={item.id}
                  className="card-hover group bg-card border border-border overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
                >
                  <div className="aspect-square overflow-hidden bg-secondary relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleFavoriteItem(item.id)}
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Heart" size={14} className={item.favorite ? "fill-foreground" : ""} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-display text-base font-light text-foreground truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-body text-xs text-muted-foreground">{item.category}</p>
                      <span className="font-body text-xs text-muted-foreground/60">{item.color}</span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground font-body">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-24">
                <Icon name="Shirt" size={32} className="mx-auto text-muted-foreground mb-4 opacity-30" />
                <p className="font-display text-2xl font-light text-muted-foreground">Нет вещей в этой категории</p>
                <button onClick={() => navigate("add")} className="mt-4 font-body text-sm text-foreground underline opacity-60 hover:opacity-100">
                  Добавить вещь
                </button>
              </div>
            )}
          </div>
        )}

        {/* OUTFIT OF THE DAY */}
        {section === "outfit" && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">СЕГОДНЯ</p>
              <h2 className="font-display text-5xl font-light text-foreground">Образ дня</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {outfits.map((outfit, i) => (
                <div
                  key={outfit.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="card-hover bg-card border border-border overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-2xl font-light text-foreground">{outfit.name}</h3>
                          <p className="font-body text-xs text-muted-foreground tracking-wider mt-1">{outfit.date}</p>
                        </div>
                        <button
                          onClick={() => toggleFavoriteOutfit(outfit.id)}
                          className="p-2 hover:opacity-70 transition-opacity"
                        >
                          <Icon name="Heart" size={20} className={outfit.favorite ? "fill-foreground" : "opacity-40"} />
                        </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="font-body text-xs tracking-widest text-muted-foreground mb-2">СОСТАВ ОБРАЗА</p>
                        <div className="flex flex-wrap gap-2">
                          {outfit.items.map((itemId) => {
                            const item = items.find((i) => i.id === itemId);
                            return item ? (
                              <span key={itemId} className="font-body text-xs px-3 py-1 border border-border text-foreground">
                                {item.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD */}
        {section === "add" && (
          <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">НОВАЯ ВЕЩЬ</p>
              <h2 className="font-display text-5xl font-light text-foreground">Добавить</h2>
            </div>

            <div className="animate-fade-up space-y-6">
              {/* Upload zone */}
              <div className="border border-dashed border-border aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/30 transition-colors group">
                <Icon name="Upload" size={28} className="text-muted-foreground mb-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="font-body text-sm text-muted-foreground">Загрузить фото</p>
                <p className="font-body text-xs text-muted-foreground/50 mt-1">JPG, PNG до 10 МБ</p>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs tracking-widest text-muted-foreground block mb-2">НАЗВАНИЕ</label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    placeholder="Льняная рубашка, блейзер..."
                    className="w-full px-4 py-3 border border-border bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs tracking-widest text-muted-foreground block mb-2">КАТЕГОРИЯ</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none"
                  >
                    {CATEGORIES.filter((c) => c !== "Все").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs tracking-widest text-muted-foreground block mb-2">ЦВЕТ</label>
                  <input
                    type="text"
                    value={addForm.color}
                    onChange={(e) => setAddForm({ ...addForm, color: e.target.value })}
                    placeholder="Молочный, чёрный, шалфей..."
                    className="w-full px-4 py-3 border border-border bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs tracking-widest text-muted-foreground block mb-2">ТЕГИ</label>
                  <input
                    type="text"
                    value={addForm.tags}
                    onChange={(e) => setAddForm({ ...addForm, tags: e.target.value })}
                    placeholder="casual, офис, лето..."
                    className="w-full px-4 py-3 border border-border bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
                  />
                  <p className="font-body text-xs text-muted-foreground/50 mt-1.5">Через запятую</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!addForm.name.trim()) return;
                  const newItem: ClothingItem = {
                    id: Date.now(),
                    name: addForm.name,
                    category: addForm.category,
                    color: addForm.color || "—",
                    image: "https://cdn.poehali.dev/projects/93dae55f-eb20-4d91-bef8-4fa20bf2a132/files/b859e0a6-642e-4ebc-9fd5-96db1d403e3a.jpg",
                    favorite: false,
                    tags: addForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
                  };
                  setItems((prev) => [...prev, newItem]);
                  setAddForm({ name: "", category: "Верх", color: "", tags: "" });
                  navigate("wardrobe");
                }}
                className="w-full py-4 bg-foreground text-background font-body text-xs tracking-widest hover:opacity-80 transition-opacity"
              >
                ДОБАВИТЬ В ГАРДЕРОБ
              </button>
            </div>
          </div>
        )}

        {/* RANDOM OUTFIT */}
        {section === "random" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">СЛУЧАЙНАЯ ПОДБОРКА</p>
                <h2 className="font-display text-5xl font-light text-foreground">Образ дня</h2>
              </div>
              <button
                onClick={generateRandom}
                className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-xs tracking-widest font-body hover:bg-secondary transition-colors"
              >
                <Icon name="Shuffle" size={14} />
                ЕЩЁ РАЗ
              </button>
            </div>

            {randomOutfit && randomOutfit.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {randomOutfit.map((item, i) => (
                    <div
                      key={item.id}
                      className="animate-scale-in"
                      style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                    >
                      <div className="card-hover bg-card border border-border overflow-hidden">
                        <div className="aspect-square overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="font-display text-lg font-light text-foreground">{item.name}</p>
                          <p className="font-body text-xs text-muted-foreground mt-0.5">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-8 flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs tracking-widest text-muted-foreground">НРАВИТСЯ СОЧЕТАНИЕ?</p>
                    <p className="font-display text-xl font-light text-foreground mt-1">Сохрани этот образ</p>
                  </div>
                  <button
                    onClick={() => {
                      if (!randomOutfit) return;
                      const newOutfit: Outfit = {
                        id: Date.now(),
                        name: `Образ ${new Date().toLocaleDateString("ru")}`,
                        items: randomOutfit.map((i) => i.id),
                        image: randomOutfit[0].image,
                        favorite: false,
                        date: new Date().toISOString().split("T")[0],
                      };
                      setOutfits((prev) => [...prev, newOutfit]);
                      navigate("outfit");
                    }}
                    className="px-6 py-3 bg-foreground text-background font-body text-xs tracking-widest hover:opacity-80 transition-opacity"
                  >
                    СОХРАНИТЬ
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-24">
                <p className="font-display text-2xl font-light text-muted-foreground">Добавь вещи в гардероб</p>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES */}
        {section === "favorites" && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">КОЛЛЕКЦИЯ</p>
              <h2 className="font-display text-5xl font-light text-foreground">Избранное</h2>
            </div>

            {favoriteItems.length === 0 && favoriteOutfits.length === 0 ? (
              <div className="text-center py-24">
                <Icon name="Heart" size={32} className="mx-auto text-muted-foreground mb-4 opacity-30" />
                <p className="font-display text-2xl font-light text-muted-foreground">Пока здесь пусто</p>
                <p className="font-body text-sm text-muted-foreground/60 mt-2">
                  Нажимай ❤ на вещи и образы, чтобы сохранить
                </p>
              </div>
            ) : (
              <>
                {favoriteItems.length > 0 && (
                  <div className="mb-12">
                    <p className="font-body text-xs tracking-widest text-muted-foreground mb-6">ВЕЩИ</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {favoriteItems.map((item, i) => (
                        <div
                          key={item.id}
                          className="card-hover group bg-card border border-border overflow-hidden animate-fade-up"
                          style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
                        >
                          <div className="aspect-square overflow-hidden bg-secondary relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <button
                              onClick={() => toggleFavoriteItem(item.id)}
                              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1.5"
                            >
                              <Icon name="Heart" size={14} className="fill-foreground" />
                            </button>
                          </div>
                          <div className="p-4">
                            <p className="font-display text-base font-light text-foreground truncate">{item.name}</p>
                            <p className="font-body text-xs text-muted-foreground mt-1">{item.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {favoriteOutfits.length > 0 && (
                  <div>
                    <p className="font-body text-xs tracking-widest text-muted-foreground mb-6">ОБРАЗЫ</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {favoriteOutfits.map((outfit, i) => (
                        <div
                          key={outfit.id}
                          className="card-hover bg-card border border-border overflow-hidden animate-fade-up"
                          style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-5 flex items-center justify-between">
                            <div>
                              <p className="font-display text-xl font-light text-foreground">{outfit.name}</p>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">{outfit.date}</p>
                            </div>
                            <button onClick={() => toggleFavoriteOutfit(outfit.id)}>
                              <Icon name="Heart" size={18} className="fill-foreground" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
        <div className="grid grid-cols-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id as Section)}
              className={`flex flex-col items-center py-3 gap-1 transition-opacity ${
                section === item.id ? "opacity-100" : "opacity-35"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="font-body text-[9px] tracking-wider">{item.label.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="md:hidden h-16" />
    </div>
  );
}
