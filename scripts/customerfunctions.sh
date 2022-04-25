#!/usr/bin/env bash

if [ -z "$CONTRACT" ]
then
      echo "Please enter your contract account!"
      read -p "Contract account : " CONTRACT
else
      echo "\$CONTRACT is NOT empty"
fi
if [ -z "$OWNER" ]
then
      echo "Please enter your contract account!"
      read -p "OWNER account : " OWNER
else
      echo "\$OWNER is NOT empty"
fi


echo 'Initializing some data.....'
near call $CONTRACT createRental '{"Brand":"Mazda","Model":"MX-5","ModelYear":2008,"cost":"5"}' --accountId $OWNER


echo '--------------------'
echo 'About to call rentACar() on the contract. This function does rent a car.Just copy above the ID !'
read -p "Rental ID: " rentalid
read -p "Amount: " amount
near call $CONTRACT rentACar '{"id":'$rentalid'}' --accountId $OWNER --deposit $amount

echo '--------------------'
echo 'About to call listAllCars() on the contract. This function listing rentals.'
near view $CONTRACT listAllCars '{}' --accountId $OWNER

echo '--------------------'
echo 'About to call returnCar() on the contract. This function does rent a car.Write your rental id below'
read -p "Return ID: " returnid
near call $CONTRACT returnCar '{"id":'$returnid'}' --accountId $OWNER


