import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/renderer/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-10 max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
      <Input
        placeholder="Kunden suchen nach Name oder Vorname..."
        className="pl-12 h-14 text-lg rounded-2xl shadow-sm focus:shadow-md transition-all bg-card"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
