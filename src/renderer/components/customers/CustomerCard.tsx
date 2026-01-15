import React from 'react';
import { Mail, Phone, Trash2, Plus, Minus, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/renderer/components/ui/card";
import { Button } from "@/renderer/components/ui/button";
import { Badge } from "@/renderer/components/ui/badge";
import { Customer } from "@/renderer/hooks/useCustomers";

interface CustomerCardProps {
  customer: Customer;
  onDeleteRequest: (customer: Customer) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onDeleteRequest }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl flex justify-between items-center gap-2">
              <span className="truncate">{customer.firstName} {customer.lastName}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => onDeleteRequest(customer)}
              >
                <Trash2 size={16} />
              </Button>
            </CardTitle>
            <CardDescription className="flex flex-col gap-1 mt-2">
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span className="truncate">{customer.email}</span>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span className="truncate">{customer.phone}</span>
                </div>
              )}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg font-bold shrink-0 ml-2">
            {customer.points} Pkt.
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Plus size={16} /> Einzahlen
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Minus size={16} /> Abbuchen
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-3">
        <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
          <History size={16} /> Historie anzeigen
        </Button>
      </CardFooter>
    </Card>
  );
};
