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


echo ------------------------
echo 'About to call createRental() on the contract. This function adding rental.'
echo 'Please fill required fields !'
read -p "Brand: " brand
read -p "Model: " model
read -p "ModelYear: " modelyear
read -p "cost: " cost
near call $CONTRACT createRental '{"Brand":"'"$brand"'","Model":"'"$model"'","ModelYear":'$modelyear',"cost":"'"$cost"'"}' --accountId $OWNER



echo ------------------------
echo 'About to call listAllRentals() on the contract. This function listing rentals.'
near view $CONTRACT listAllRentals '{}' --accountId $OWNER


echo ------------------------
echo 'About to call getCarsById() on the contract. This function get rentals by ID. Just copy above the ID !'
read -p "Car ID:" carid
near call $CONTRACT getCarsById '{"id":'$carid'}' --accountId $OWNER

echo ------------------------
echo 'About to call updateCars() on the contract. This function update rentals by ID. Just copy above the ID !'
read -p "Car ID:" carupdateid
read -p "Brand: " brandupdate
read -p "Model: " modelupdate
read -p "ModelYear: " modelyearupdate
read -p "cost: " costupdate
near call $CONTRACT updateCars '{"id":'$carupdateid',"updates":{"Brand":"'$brandupdate'","Model":"'$modelupdate'","ModelYear":'$modelyearupdate',"cost":"'$costupdate'"}}' --accountId $OWNER

echo ------------------------
echo 'About to call updateCarCost() on the contract. This function update rentals cost by ID.'
read -p "Car ID:" carupdateidCost
read -p "New Cost: " costnewupdate
near call $CONTRACT updateCarCost '{"id":'$carupdateidCost',"cost":"'$costnewupdate'"}' --accountId $OWNER



echo ------------------------
echo 'About to call deleteRental() on the contract. This function delete rentals by ID.'
read -p "Car ID:" caridDelete
near call $CONTRACT deleteRental '{"id":'$caridDelete'}' --accountId $OWNER

echo ------------------------
echo 'About to call deleteAllCars() on the contract. This function delete all rentals! '
near call $CONTRACT deleteAllCars '{}' --accountId $OWNER