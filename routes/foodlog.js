const express = require('express'),
    router = express.Router(),
    foodSearch = require('../models/searchModel'),
    foodData = require('../models/nutritionModel.js');


router.get('/', async(req, res, next)=>{
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: false,
        info: false,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

router.post("/search", async(req,res,next)=>{
    console.log(req.body);
    const {search} = req.body;
    const searchRes = await foodSearch(search);
    console.log(searchRes);
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: searchRes,
        info: false,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

router.post("/nutritiondata", async(req,res,next)=>{
    const {id} = req.body;
    const foodInfo = await foodData(id);
    console.log(foodInfo);
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: false,
        info: foodInfo,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

module.exports = router;