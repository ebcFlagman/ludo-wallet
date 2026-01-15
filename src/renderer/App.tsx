import React, { useState } from 'react';
import { useCustomers, Customer } from "@/renderer/hooks/useCustomers";
import { Navbar } from "@/renderer/components/Navbar";
import { SearchBar } from "@/renderer/components/SearchBar";
import { CustomerList } from "@/renderer/components/customers/CustomerList";
import { AddCustomerDialog } from "@/renderer/components/customers/AddCustomerDialog";
import { DeleteCustomerDialog } from "@/renderer/components/customers/DeleteCustomerDialog";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  
  const { 
    customers, 
    addCustomer, 
    deleteCustomer 
  } = useCustomers(searchTerm);

  const handleDeleteRequest = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (customerToDelete) {
      const result = await deleteCustomer(customerToDelete.id);
      if (result.success) {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar>
        <AddCustomerDialog 
          onAdd={addCustomer} 
          open={addCustomerOpen} 
          onOpenChange={setAddCustomerOpen} 
        />
      </Navbar>

      <main className="max-w-6xl mx-auto p-8">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
        />

        <CustomerList 
          customers={customers} 
          searchTerm={searchTerm} 
          onDeleteRequest={handleDeleteRequest}
          onAddClick={() => setAddCustomerOpen(true)}
        />
      </main>

      <DeleteCustomerDialog 
        customer={customerToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default App;
