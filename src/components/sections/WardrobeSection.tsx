import Icon from "@/components/ui/icon";
import { Section, ClothingItem, CATEGORIES } from "@/types";

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
