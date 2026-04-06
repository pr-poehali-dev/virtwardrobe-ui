import Icon from "@/components/ui/icon";
import { ClothingItem, Outfit } from "@/types";

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
