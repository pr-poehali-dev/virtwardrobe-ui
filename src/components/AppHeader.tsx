import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "@/types";

interface AppHeaderProps {
  section: Section;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigate: (s: Section) => void;
}

export default function AppHeader({ section, mobileMenuOpen, setMobileMenuOpen, navigate }: AppHeaderProps) {
  return (
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
  );
}
