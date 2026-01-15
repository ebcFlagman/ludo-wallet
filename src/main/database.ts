import "reflect-metadata";
import { DataSource, Like } from "typeorm";
import { Customer } from "./entities/Customer";
import { PointHistory } from "./entities/PointHistory";
import * as path from "path";
import {app} from "electron";
const dbPath = path.join(app.getPath("userData"), "ludo-wallet.sqlite");

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Customer, PointHistory],
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Datenbank erfolgreich initialisiert unter:", dbPath);
        }
    } catch (error) {
        console.error("Fehler bei der Datenbank-Initialisierung:", error);
        throw error;
    }
};

// Hilfsfunktionen für den Datenzugriff

export const createCustomer = async (data: Partial<Customer>) => {
    const customerRepo = AppDataSource.getRepository(Customer);
    const customer = customerRepo.create(data);
    return await customerRepo.save(customer);
};

export const updatePoints = async (customerId: number, amount: number, reason?: string) => {
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        const customer = await transactionalEntityManager.findOneBy(Customer, { id: customerId });
        if (!customer) throw new Error("Kunde nicht gefunden");

        customer.points += amount;
        await transactionalEntityManager.save(customer);

        const history = new PointHistory();
        history.customer = customer;
        history.changeAmount = amount;
        history.newBalance = customer.points;
        history.reason = reason;

        await transactionalEntityManager.save(history);
        return customer;
    });
};

export const getAllCustomers = async (searchTerm?: string) => {
    const customerRepo = AppDataSource.getRepository(Customer);
    if (searchTerm) {
        return await customerRepo.find({
            where: [
                { firstName: Like(`%${searchTerm}%`) },
                { lastName: Like(`%${searchTerm}%`) }
            ]
        });
    }
    return await customerRepo.find();
};

export const getCustomerHistory = async (customerId: number) => {
    return await AppDataSource.getRepository(PointHistory).find({
        where: { customer: { id: customerId } },
        order: { createdAt: "DESC" }
    });
};

export const deleteCustomer = async (customerId: number) => {
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        // Zuerst die Historie löschen (wegen Foreign Key Constraints)
        await transactionalEntityManager.delete(PointHistory, { customer: { id: customerId } });
        // Dann den Kunden löschen
        const result = await transactionalEntityManager.delete(Customer, customerId);
        return result.affected && result.affected > 0;
    });
};
