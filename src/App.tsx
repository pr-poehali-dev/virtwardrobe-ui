import { useState } from "react";
import { Section, ClothingItem, Outfit, INITIAL_ITEMS, INITIAL_OUTFITS } from "@/types";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import {
  HomeSection,
  WardrobeSection,
  OutfitSection,
  AddSection,
  RandomSection,
  FavoritesSection,
} from "@/components/Sections";

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

  const handleAddSubmit = () => {
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
  };

  const handleSaveRandom = () => {
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
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader
        section={section}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigate={navigate}
      />

      <main className="flex-1 pt-16">
        {section === "home" && (
          <HomeSection
            items={items}
            outfits={outfits}
            favoriteItems={favoriteItems}
            favoriteOutfits={favoriteOutfits}
            navigate={navigate}
            toggleFavoriteOutfit={toggleFavoriteOutfit}
          />
        )}
        {section === "wardrobe" && (
          <WardrobeSection
            items={items}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            toggleFavoriteItem={toggleFavoriteItem}
            navigate={navigate}
          />
        )}
        {section === "outfit" && (
          <OutfitSection
            outfits={outfits}
            items={items}
            toggleFavoriteOutfit={toggleFavoriteOutfit}
          />
        )}
        {section === "add" && (
          <AddSection
            addForm={addForm}
            setAddForm={setAddForm}
            onSubmit={handleAddSubmit}
          />
        )}
        {section === "random" && (
          <RandomSection
            randomOutfit={randomOutfit}
            generateRandom={generateRandom}
            onSave={handleSaveRandom}
          />
        )}
        {section === "favorites" && (
          <FavoritesSection
            favoriteItems={favoriteItems}
            favoriteOutfits={favoriteOutfits}
            toggleFavoriteItem={toggleFavoriteItem}
            toggleFavoriteOutfit={toggleFavoriteOutfit}
          />
        )}
      </main>

      <AppFooter section={section} navigate={navigate} />
    </div>
  );
}
