import { Context, logging, u128 } from "near-sdk-as";
import { Rentals, CustomerRent, addRentals } from "./model";

/* Rental Owner Functions*/
export function createRental(Brand: string, Model: string, ModelYear: u16, cost: u128, isRented: bool = false): Rentals {
  return Rentals.addRentalModel(Brand, Model, ModelYear, cost, isRented);
}

export function deleteRental(id: u32): void {
  Rentals.deleteRentalModel(id);
}

export function listAllRentals(): Rentals[] {
  return Rentals.findAllCarsModel();
}

export function getCarsById(id: u32): Rentals {
  return Rentals.findCarsByIdModel(id);
}

export function updateCars(id: u32, updates: addRentals): Rentals {
  return Rentals.updateCarStateModel(id, updates);
}

export function deleteAllCars(): void {
  Rentals.deleteAllCarsModel();
}
export function updateCarCost(id: u32, cost: u128): Rentals[] {
  Rentals.updateRentCostModel(id, cost);
  return listAllRentals();
}

/* -------------------------------- */

/* Customer Functions*/

export function rentACar(id: u32): Rentals[] {
  CustomerRent.addCustomeronCar(id, Context.sender);
  return listAllRentals();
}

export function returnCar(id: u32): Rentals[] {
  CustomerRent.returnCustomeronCar(id, Context.sender);
  return listAllRentals();
}
export function listAllCars(): Rentals[] {
  return Rentals.findAllCarsModel();
}

/* ------------------ */
// near call $CONTRACT createRental '{"Brand":"Fiat","Model":"Albea","ModelYear":2008,"cost":"1500000000000000000000","iRented":false}' --accountId $OWNER
// near call $CONTRACT createRental '{"Brand":"Fiat","Model":"Albea","ModelYear":2008,"cost":"15000000","isRented":false}' --accountId sasurgan.testnet
