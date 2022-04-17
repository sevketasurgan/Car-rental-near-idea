# Car-rental SmartContract

### Car rental app on NEAR blockchain helps people rent a car with NEAR wallet.
- [x] You can rent car with your wallet.
- [x] Retrieve rental car .

## What is the project about ? 
The main idea is to adapt the car rental process to the blockchain part. You can safely continue your car rental with web3 technology. The only process required for this is to have a NEAR wallet. Then you can choose one of the cars in the Car Rental, make your payment and complete the rental process. Your car rental process has been completed.

## Project Requisities
Firstly, you must be login with your NEAR wallet. For this process you can use the below code.
```
near login
```

### 1- Install dependencies
```
npm install 
```
OR
```
yarn
```
### 2- Set the Account ID and Contract variables
If you are using Linux or Mac:
```
echo CONTRACT = <your-account-id>
echo OWNER = <your-testnet-account>
```

If you are using Windows:
```
$CONTRACT="<your-account-id>"
$OWNER="<your-testnet-account>"
```
### 3- Build And Deploy Project
```
yarn build:deploy
```


***

## Functions
* These functions are seperated **two** sections:<br>
1- Rental Owner Functions which is like **Admin** <br>
2- Customer Functions.<br>
* Here is also:<br>

| View Funcs        | Call Funcs |          
| ------------- |-------------:| 
| getCarsById()    | createRental() |
| listAllRentals() | deleteRental()      |  
| listAllCars()    |updateCars()      |   
|                  | deleteAllCars()     | 
|                   | updateCarCost()     | 
|                   | rentACar()      | 
|                   | retrieveCar()      | 





 
***
### Rental Owner Functions
### **createRental** <br>
This function has gives you to access adding Rental Car and  it's specs. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| Brand     | string | 
| Model      | string      |  
| ModelYear | u16      |   
| cost | u128 |
| isRented | bool `default:false` |

Usage:<br>

```
near call $CONTRACT createRental '{"Brand":"TypeBrand","Model":"TypeModel","ModelYear":TypeModelYear,"cost":"TypeCost","isRented":false}' --accountId $OWNER
```

### **deleteRental** <br>
This function has gives you to access deleting Rental Car. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 


Usage:<br>

```
near call $CONTRACT deleteRental '{"id":TypeID}' --accountId $OWNER
```
### **listAllRentals** <br>
This function has gives you to access listing Rental Cars. <br>

Function Parameters:<br>
* This function has no arguments.


Usage:<br>

```
near view $CONTRACT listAllRentals '{}' --accountId $OWNER
```

### **getCarsById** <br>
This function has gives you to access get Rental Car data by their ID. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 


Usage:<br>

```
near view $CONTRACT getCarsById '{"id":TypeID}' --accountId $OWNER
```

### **updateCars** <br>
This function has gives you to access update Rental Car data by their ID. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 
| updates     | addRentals`object` | 

addRentals Parameters:<br>
| Parameter        | Type           | 
| ------------- |:-------------:|
| Brand     | string | 
| Model      | string      |  
| ModelYear | u16      |   
| cost | u128 |
| isRented | bool |
| rentedBy | string |


Usage:<br>

```
near call $CONTRACT updateCars '{"id":TypeID,"updates":{"Brand":"TypeBrand","Model":"TypeModel","ModelYear":TypeModelYear,"cost":"TypeCost","isRented":false,"rentedBy":TypeRentedBy}}' --accountId $OWNER
```

### **deleteAllCars** <br>
This function has gives you to access delete all Rental Car data.<br>

Function Parameters:<br>
* This function has no arguments.


Usage:<br>

```
near call $CONTRACT deleteAllCars '{}' --accountId $OWNER
```

### **updateCarCost** <br>
This function has gives you to access edit and update Rental Car cost data by their ID. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 
| cost     | u128 | 


Usage:<br>

```
near call $CONTRACT updateCarCost '{"id":TypeID,"cost":"TypeCost"}' --accountId $OWNER
```

### Customer Functions

### **rentACar** <br>
This function has gives you to access Rent a Car with their ID. <br> For the rental process, you need to deposit a fee equal to the cost of the vehicle. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 

* You must be pay NEAR for rental process.

Usage:<br>

```
near call $CONTRACT rentACar '{"id":TypeID}' --accountId $OWNER --deposit TypeCarsRentingPrice
```

### **returnCar** <br>
This function has gives you to access return your car with their ID. <br>

Function Parameters:<br>


| Parameter        | Type           | 
| ------------- |:-------------:|
| id     | u32 | 



Usage:<br>

```
near call $CONTRACT returnCar '{"id":TypeID}' --accountId $OWNER
```

### **listAllCars** <br>
This function has gives you to access list all car in shop. <br>

Function Parameters:<br>
* This function has no arguments.

Usage:<br>

```
near view $CONTRACT listAllCars '{}' --accountId $OWNER
```


