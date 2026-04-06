import Icon from "@/components/ui/icon";
import { ClothingItem } from "@/types";

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
