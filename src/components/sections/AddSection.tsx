import Icon from "@/components/ui/icon";
import { CATEGORIES } from "@/types";

type AddForm = { name: string; category: string; color: string; tags: string; _previewUrl: string };

interface AddSectionProps {
  addForm: AddForm;
  setAddForm: (form: AddForm) => void;
  onSubmit: () => void;
}

export function AddSection({ addForm, setAddForm, onSubmit }: AddSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAddForm({ ...addForm, _previewUrl: url });
  };

  const previewUrl = addForm._previewUrl;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-2">НОВАЯ ВЕЩЬ</p>
        <h2 className="font-display text-5xl font-light text-foreground">Добавить</h2>
      </div>

      <div className="animate-fade-up space-y-6">
        <label className="block border border-dashed border-border aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/30 transition-colors group overflow-hidden relative">
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <Icon name="Upload" size={28} className="text-muted-foreground mb-3 opacity-40 group-hover:opacity-100 transition-opacity" />
              <p className="font-body text-sm text-muted-foreground">Загрузить фото</p>
              <p className="font-body text-xs text-muted-foreground/50 mt-1">JPG, PNG до 10 МБ</p>
            </>
          )}
        </label>

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
