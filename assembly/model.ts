import { PersistentUnorderedMap, math, u128, context, logging } from "near-sdk-as";

export const rents = new PersistentUnorderedMap<u32, Rentals>("rents");

@nearBindgen
export class CustomerRent {
    enoughToRent: boolean;
    wantId: u32
    deposit: u128;
    sender: string;
    constructor(wantId: u32, deposit: u128) {
        this.wantId = wantId;
        this.enoughToRent = context.attachedDeposit >= u128.from(deposit);
        this.sender = context.sender;
    }
    static addCustomeronCar(id: u32, sender: string): void {
        let data = Rentals.findCarsByIdModel(id);
        const customrent = new CustomerRent(id, data.cost);
        let addUpdate = new addRentals();
        if (customrent.enoughToRent) {
            // Some update process
            addUpdate.Brand = data.Brand;
            addUpdate.Model = data.Model;
            addUpdate.ModelYear = data.ModelYear;
            addUpdate.cost = data.cost;
            addUpdate.isRented = true;
            addUpdate.rentedBy = sender.toString();
            logging.log(sender);
            Rentals.updateCarStateModel(id, addUpdate);
        } else {
            assert(customrent.enoughToRent, "Not enough coin for rent !");
        }
    }
    static returnCustomeronCar(id: u32, sender: string): void {
        let data = Rentals.findCarsByIdModel(id);
        let addUpdate = new addRentals();
        addUpdate.Brand = data.Brand;
        addUpdate.Model = data.Model;
        addUpdate.ModelYear = data.ModelYear;
        addUpdate.cost = data.cost;
        addUpdate.isRented = data.isRented ? !data.isRented : data.isRented;
        let customer = data.rentedBy != sender ? data.rentedBy : ""; // Prevent collision
        addUpdate.rentedBy = customer;
        Rentals.updateCarStateModel(id, addUpdate);
    }
}

@nearBindgen
export class addRentals {
    Brand: string;
    Model: string;
    ModelYear: u16;
    isRented: bool;
    cost: u128;
    rentedBy: string;
}

@nearBindgen
export class Rentals {
    id: u32;
    Brand: string;
    Model: string;
    ModelYear: u16;
    isRented: bool;
    cost: u128;
    rentedBy: string;
    constructor(Brand: string, Model: string, ModelYear: u16, cost: u128, isRented: bool) {
        this.id = math.hash32<string>(Brand);
        this.Brand = Brand;
        this.Model = Model;
        this.ModelYear = ModelYear;
        this.cost = cost;
        this.isRented = isRented;
        this.rentedBy = "";
    }
    static addRentalModel(Brand: string, Model: string, ModelYear: u16, cost: u128, isRented: bool): Rentals {
        const rental = new Rentals(Brand, Model, ModelYear, cost, isRented);
        rents.set(rental.id, rental);
        return rental;
    }
    static deleteRentalModel(id: u32): void {
        rents.delete(id);
    }
    static findCarsByIdModel(id: u32): Rentals {
        return rents.getSome(id);
    }
    static findAllCarsModel(): Rentals[] {
        let limit = rents.length;
        let offset: u32 = 0;
        return rents.values(offset, offset + limit);
    }
    static updateCarStateModel(id: u32, updates: addRentals): Rentals {
        const rentsT = this.findCarsByIdModel(id);
        rentsT.Brand = updates.Brand;
        rentsT.Model = updates.Model;
        rentsT.ModelYear = updates.ModelYear;
        rentsT.cost = updates.cost;
        rentsT.isRented = updates.isRented;
        rentsT.rentedBy = updates.rentedBy;
        rents.set(id, rentsT);
        return rentsT;
    }
    static deleteAllCarsModel(): void {
        rents.clear();
    }
    static updateRentCostModel(id: u32, cost: u128): void {
        let data = this.findCarsByIdModel(id);
        let addUpdate = new addRentals();
        addUpdate.Brand = data.Brand;
        addUpdate.Model = data.Model;
        addUpdate.ModelYear = data.ModelYear;
        addUpdate.cost = cost;
        addUpdate.isRented = data.isRented;
        addUpdate.rentedBy = data.rentedBy;
        this.updateCarStateModel(id, addUpdate);
    }
}


