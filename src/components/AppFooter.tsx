import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "@/types";

interface AppFooterProps {
  section: Section;
  navigate: (s: Section) => void;
}

export default function AppFooter({ section, navigate }: AppFooterProps) {
  return (
    <>
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
    </>
  );
}
