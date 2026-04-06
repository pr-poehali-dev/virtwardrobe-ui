import Icon from "@/components/ui/icon";
import { Section, ClothingItem, Outfit } from "@/types";

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
