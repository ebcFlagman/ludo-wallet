import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Button } from "@/renderer/components/ui/button";
import { Customer } from "@/renderer/hooks/useCustomers";
import { CustomerCard } from "./CustomerCard";

interface CustomerListProps {
  customers: Customer[];
  searchTerm: string;
  onDeleteRequest: (customer: Customer) => void;
  onAddClick: () => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  searchTerm, 
  onDeleteRequest, 
  onAddClick 
}) => {
  if (customers.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer) => (
          <CustomerCard 
            key={customer.id} 
            customer={customer} 
            onDeleteRequest={onDeleteRequest} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-dashed p-16 text-center shadow-sm max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-muted w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 text-muted-foreground transform -rotate-6 group hover:rotate-0 transition-transform duration-500">
        <Users size={48} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold mb-3">Keine Kunden gefunden</h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        {searchTerm 
          ? `Wir konnten für "${searchTerm}" keine Übereinstimmungen finden. Versuchen Sie es mit einem anderen Suchbegriff.` 
          : "Es sind noch keine Kunden im System erfasst. Beginnen Sie jetzt damit, Ihren ersten Kunden anzulegen."}
      </p>
      {!searchTerm && (
        <Button onClick={onAddClick} className="gap-2 rounded-xl px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20">
          <UserPlus size={20} />
          <span>Ersten Kunden hinzufügen</span>
        </Button>
      )}
    </div>
  );
};
