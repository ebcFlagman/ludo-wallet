import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from "@/renderer/components/ui/button";
import { Input } from "@/renderer/components/ui/input";
import { Label } from "@/renderer/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/renderer/components/ui/dialog";
import { CustomerFormData } from "@/renderer/hooks/useCustomers";

interface AddCustomerDialogProps {
  onAdd: (data: CustomerFormData) => Promise<{ success: boolean; error?: string }>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ 
  onAdd,
  open: externalOpen,
  onOpenChange: setExternalOpen
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Speichere...');
    
    const result = await onAdd(formData);
    
    if (result.success) {
      setStatus('Kunde erfolgreich erstellt!');
      setTimeout(() => {
        setStatus(null);
        setOpen(false);
        setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      }, 1500);
    } else {
      setStatus(result.error || 'Fehler beim Erstellen des Kunden.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-xl px-5 shadow-md shadow-primary/10 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95">
          <UserPlus size={18} />
          <span className="font-semibold">Kunde hinzufügen</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Neuen Kunden erfassen</DialogTitle>
          <DialogDescription>Geben Sie die Daten des neuen Kunden ein, um ein Wallet zu erstellen.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                required
                placeholder="z.B. Max"
                className="rounded-xl"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                required
                placeholder="Mustermann"
                className="rounded-xl"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              placeholder="+41 79 123 45 67"
              className="rounded-xl"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="max.mustermann@beispiel.ch"
              className="rounded-xl"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <DialogFooter className="pt-6">
            <Button type="submit" disabled={status === 'Speichere...'} className="w-full h-11 rounded-xl text-base font-semibold transition-all shadow-lg shadow-primary/20">
              {status === 'Speichere...' ? 'Wird gespeichert...' : 'Kunde speichern'}
            </Button>
          </DialogFooter>

          {status && status !== 'Speichere...' && (
            <div className={`mt-2 p-3 rounded-xl text-center text-sm font-semibold animate-in fade-in zoom-in duration-300 ${status.includes('Fehler') ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-green-50 text-green-700 border border-green-100'}`}>
              {status}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
