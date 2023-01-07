const Car = require("../models/Car");

 
 async function getAllByDate(search){
  const query = {};
  if (search){
   query.title = new RegExp(search, 'i');
  }
    return Car.find(query).sort({ createdAt: 1}).lean()
  }
      
 async function getRecent(){
   return Car.find({}).sort({ userCount: -1 }).limit(3).lean();
 }

 async function createCar(car){
  return Car.create(car);
 }

 async function getById(id){
   return Car.findById(id).lean()
 }

 async function deleteById(id){
   return Car.findByIdAndDelete(id)
 }

 async function updateById(id, data){
   const existing = await Car.findById(id)
   existing.title = data.title;
   existing.brand = data.brand;
   existing.year = data.year;
   existing.registrationPlate = data.registrationPlate;
   existing.passedKm = data.passedKm;
   existing.oilChangedDate = data.oilChangedDate;
   existing.nextDateForOilChange = data.nextDateForOilChange;
   existing.description = data.description;
   existing.imageUrl = data.imageUrl;
   

   return existing.save()
 }

 async function enrollUser(carId, userId){
   const existing = await Car.findById(carId)
   existing.users.push(userId);
   existing.userCount++;
   return existing.save()
 }

 module.exports = {
    getAllByDate,
    createCar,
    getRecent,
    getById,
    deleteById,
    updateById,
    enrollUser
 }