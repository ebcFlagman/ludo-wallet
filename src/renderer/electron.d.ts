export interface IElectronAPI {
  createCustomer: (data: any) => Promise<any>;
  getAllCustomers: (searchTerm?: string) => Promise<any[]>;
  updatePoints: (customerId: number, amount: number, reason?: string) => Promise<any>;
  getCustomerHistory: (customerId: number) => Promise<any[]>;
  deleteCustomer: (customerId: number) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
