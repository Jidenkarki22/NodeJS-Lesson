const express = require('express')
const router = express.Router();
const menuItem = require('../models/menuItem')

router.post('/', async (req,res) => {
    try{
            const data2 = req.body //Assuming the request body contains the person data

             // create a new Person document using the Mongoose model
            const newMenu = new menuItem(data2)

            // save the new person to the database
            const response =  await newMenu.save()
                console.log('data saved')
                res.status(200).json(response)

    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
    
})

router.get('/', async (req,res) =>{
    try{
        const data2 = await menuItem.find();
        console.log('data fetched')
        res.status(200).json(data2)
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal error'})
    }
})

router.get('/:Taste', async (req,res) =>{
    try{
        const Taste = req.params.Taste;
        if(Taste == 'sweet' || Taste == 'spicy' || Taste == 'salty') {

            const response = await menuItem.find({taste: Taste});
            console.log('data recevied');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'There is no any Data.'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router;