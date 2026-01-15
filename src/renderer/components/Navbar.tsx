import React from 'react';
import { Wallet } from 'lucide-react';

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary shadow-lg shadow-primary/20 p-2.5 rounded-xl text-primary-foreground transform hover:rotate-6 transition-transform">
          <Wallet size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Ludo-Wallet</h1>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Digitaler Punktestand</p>
        </div>
      </div>
      {children}
    </nav>
  );
};
