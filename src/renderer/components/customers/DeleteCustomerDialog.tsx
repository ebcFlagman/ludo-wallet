import React from 'react';
import { Button } from "@/renderer/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/renderer/components/ui/dialog";
import { Customer } from "@/renderer/hooks/useCustomers";

interface DeleteCustomerDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({ 
  customer, 
  open, 
  onOpenChange, 
  onConfirm 
}) => {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Kunde löschen</DialogTitle>
          <DialogDescription>
            Sind Sie sicher, dass Sie <strong>{customer.firstName} {customer.lastName}</strong> löschen möchten? 
            Diese Aktion kann nicht rückgängig gemacht werden und löscht auch die gesamte Punkthistorie.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
            Abbrechen
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="rounded-xl">
            Unwiderruflich löschen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
