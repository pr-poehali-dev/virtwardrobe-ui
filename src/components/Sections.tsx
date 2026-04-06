import Icon from "@/components/ui/icon";
import { Section, ClothingItem, Outfit, CATEGORIES } from "@/types";

interface HomeSectionProps {
  items: ClothingItem[];
  outfits: Outfit[];
  favoriteItems: ClothingItem[];
  favoriteOutfits: Outfit[];
  navigate: (s: Section) => void;
  toggleFavoriteOutfit: (id: number) => void;
}

export function HomeSection({ items, outfits, favoriteItems, favoriteOutfits, navigate, toggleFavoriteOutfit }: HomeSectionProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
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
                    <p className="font-body text-xs text-muted-foreground tracking-wider mt-0.5">{outfit.date}</p>
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
  );
}

interface WardrobeSectionProps {
  items: ClothingItem[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  toggleFavoriteItem: (id: number) => void;
  navigate: (s: Section) => void;
}

export function WardrobeSection({ items, activeCategory, setActiveCategory, toggleFavoriteItem, navigate }: WardrobeSectionProps) {
  const filteredItems = activeCategory === "Все" ? items : items.filter((i) => i.category === activeCategory);

  return (
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
  );
}

interface OutfitSectionProps {
  outfits: Outfit[];
  items: ClothingItem[];
  toggleFavoriteOutfit: (id: number) => void;
}

export function OutfitSection({ outfits, items, toggleFavoriteOutfit }: OutfitSectionProps) {
  return (
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
                <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
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
  );
}

interface AddSectionProps {
  addForm: { name: string; category: string; color: string; tags: string };
  setAddForm: (form: { name: string; category: string; color: string; tags: string }) => void;
  onSubmit: () => void;
}

export function AddSection({ addForm, setAddForm, onSubmit }: AddSectionProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">НОВАЯ ВЕЩЬ</p>
        <h2 className="font-display text-5xl font-light text-foreground">Добавить</h2>
      </div>

      <div className="animate-fade-up space-y-6">
        <div className="border border-dashed border-border aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/30 transition-colors group">
          <Icon name="Upload" size={28} className="text-muted-foreground mb-3 opacity-40 group-hover:opacity-100 transition-opacity" />
          <p className="font-body text-sm text-muted-foreground">Загрузить фото</p>
          <p className="font-body text-xs text-muted-foreground/50 mt-1">JPG, PNG до 10 МБ</p>
        </div>

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
          onClick={onSubmit}
          className="w-full py-4 bg-foreground text-background font-body text-xs tracking-widest hover:opacity-80 transition-opacity"
        >
          ДОБАВИТЬ В ГАРДЕРОБ
        </button>
      </div>
    </div>
  );
}

interface RandomSectionProps {
  randomOutfit: ClothingItem[] | null;
  generateRandom: () => void;
  onSave: () => void;
}

export function RandomSection({ randomOutfit, generateRandom, onSave }: RandomSectionProps) {
  return (
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
              onClick={onSave}
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
  );
}

interface FavoritesSectionProps {
  favoriteItems: ClothingItem[];
  favoriteOutfits: Outfit[];
  toggleFavoriteItem: (id: number) => void;
  toggleFavoriteOutfit: (id: number) => void;
}

export function FavoritesSection({ favoriteItems, favoriteOutfits, toggleFavoriteItem, toggleFavoriteOutfit }: FavoritesSectionProps) {
  return (
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
  );
}
