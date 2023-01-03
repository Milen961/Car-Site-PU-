const { getAllByDate, getRecent } = require('../services/carService');

const homeController = require('express').Router()


homeController.get('/',  async (req, res) => {
    let view;
    let cars = [];

    if (req.user){
        // user home page
        view = 'user-home',
        cars = await getAllByDate(req.query.search);
    }else {
        // guest home page
      view = 'guest-home',
      cars = await getRecent();
    }

   res.render(view, {
    title: 'Home Page',
    cars,
    search: req.query.search

   });
});

module.exports = homeController;