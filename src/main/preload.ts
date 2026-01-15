import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  createCustomer: (data: any) => ipcRenderer.invoke('customer:create', data),
  getAllCustomers: (searchTerm?: string) => ipcRenderer.invoke('customer:getAll', searchTerm),
  updatePoints: (customerId: number, amount: number, reason?: string) => 
    ipcRenderer.invoke('customer:updatePoints', customerId, amount, reason),
  getCustomerHistory: (customerId: number) => 
    ipcRenderer.invoke('customer:getHistory', customerId),
  deleteCustomer: (customerId: number) => 
    ipcRenderer.invoke('customer:delete', customerId),
});
