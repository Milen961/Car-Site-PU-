const { createCar, getById, deleteById, updateById, enrollUser } = require('../services/carService');
const { parseError } = require('../util/parser');

const carController = require('express').Router();


carController.get('/create',(req, res) => {
    res.render('create', {
        title: 'Create car'
    });
});

   carController.get('/:id' , async (req, res) => {
      const car = await getById(req.params.id);
     
       car.isOwner = car.owner.toString() == req.user._id.toString()
       car.enrolled = car.users.map(x => x.toString()).includes(req.user._id.toString());
       
      res.render('details', {
        title: car.title,
        car
      });
   });

   carController.get('/:id/delete', async (req, res) => {
    const car = await getById(req.params.id);

    if (car.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login');

    } 

      await deleteById(req.params.id);
      res.redirect('/')
   });

carController.post('/create', async (req,res) => {
    const car = {
        title:req.body.title,
        brand: req.body.brand,
        year: req.body.year,
        registrationPlate:req.body.registrationPlate,
        passedKm:req.body.passedKm,
        oilChangedDate:req.body.oilChangedDate,
        nextDateForOilChange:req.body.nextDateForOilChange,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner:req.user._id

    };
    try {
    await createCar(car);
    res.redirect('/');
    } catch (error){
        res.render('create', {
            title: 'Create car',
            errors: parseError(error),
            body: car
        });
    }
});

carController.get('/:id/edit',  async (req, res) => {
    const car = await getById(req.params.id)

    if (car.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit car',
        car
    });
});

carController.post('/:id/edit', async (req, res) =>{
     const car = await getById(req.params.id)

    if (car.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login');    
    }

    try{
       await updateById(req.params.id, req.body)
        res.redirect(`/car/${req.params.id}`)
    }catch (error){
       res.render('edit', {
        title: 'Edit car',
        errors: parseError(error),
        car: req.body
       })
    }
});

carController.get('/:id/enroll', async (req, res) => {
    const car = await getById(req.params.id); 

    if(car.owner.toString() != req.user._id.toString() 
    && car.users.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await enrollUser(req.params.id, req.user._id);
        
    }
     res.redirect(`/car/${req.params.id}`);

});

module.exports = carController