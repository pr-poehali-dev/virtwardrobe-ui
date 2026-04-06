import Icon from "@/components/ui/icon";
import { ClothingItem, Outfit } from "@/types";

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
