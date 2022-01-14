// Code written by Therese Bruzell
// Declare constances
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const Woman = require('../models/woman');

//Getting all women
router.get('/', async (req, res)=>{
    try {
        console.log("request recieved")
        const women = await Woman.find().sort({name: 1})
        res.json(women)

    } catch (err){
        res.status(500).json({message: err.message});
        console.log("request errored")
        console.log(err.message)
    }
})

//Get one woman
router.get('/woman/:id', getWoman, (req, res)=>{
    res.send(res.thisWoman);
})


//Getting all women based on category
router.get('/women/:category', async (req, res)=>{
    try {
        const parameter = req.params.category;
        const women = await Woman.find({category: parameter}).sort({cat: 1})
        res.json(women)
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

//Post woman
router.post('/', async (req, res)=>{

    const woman = new Woman({
        name: req.body.name,
        years: req.body.years,
        quote: req.body.quote,
        description: req.body.description,
        image: req.body.image,
        category: req.body.cat
    })

    try {
        const newWoman = await woman.save()
        res.status(201).json(newWoman)

    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//Put woman
router.put('/woman/:id', getWoman, async (req, res)=>{

    res.thisWoman.name = req.body.name;
    res.thisWoman.years = req.body.years;
    res.thisWoman.quote = req.body.quote;
    res.thisWoman.description = req.body.description;
    res.thisWoman.image = req.body.image,
    res.thisWoman.category = req.body.cat;

    try {
        const updatedWoman = await res.thisWoman.save()
        res.json(updatedWoman);

    } catch (err){
        res.status(400);
    }
})

//Delete woman
router.delete('/woman/:id', getWoman, async (req, res)=>{
    try{
        await res.thisWoman.remove()
        res.json({message: "Deleted"})

    } catch (err){
        return res.status(500).json({message: err.message})
    }
})

// Middleware to shorten commandos requiring id
async function getWoman(req, res, next){
    let woman

    try{

    woman = await Woman.findOne({'_id':mongoose.Types.ObjectId(req.params.id)})
        if (woman == null){
            return res.status(404).json({message: 'Cannot find' + woman})
        }
    } catch (err){
        return res.status(500).json({message: err.message})

    }
    res.thisWoman = woman
    next()
}

module.exports = router;