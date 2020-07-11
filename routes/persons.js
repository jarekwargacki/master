const express = require('express');
const app = express();
const router = express.Router();
const Person = require('../models/Person');



// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/.././views/posts.html'));
//     //res.json('posts');
// });

//////////////////////////////////////////////////////////////////////////////////////////////////get all posts

router.get('/', async (req, res) => {
    try {
        const persons = await Person.find()
        res.json(persons)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////create one

router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    })
    try {
        const newPerson = await person.save()
        res.status(201).json(newPerson)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////get one

router.get('/:id', getPerson, (req, res) => {
    res.json(res.person)
})

//////////////////////////////////////////////////////////////////////////////////////////////////delete post 
router.delete('/:id', getPerson, async (req, res) => {
    try {
        await res.person.remove()
        res.json({message: 'Deleted Person'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


//////////////////////////////////////////////////////////////////////////////////////////////////update post 

router.patch('/:id', getPerson, async (req, res) => {
    if (req.body.name != null) {
        res.person.name = req.body.name
    }
    //if (req.body.subscribedToChannel != null) {
    //    res.person.subscribedToChannel = req.body.subscribedToChannel
    //}
    try {
        const updatedPerson = await res.person.save()
        res.json(updatedPerson)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////getPerson
async function getPerson(req, res, next) {
    let person
    try {
        person = await Person.findById(req.params.id);
        if (person == null) {
            return res.status(404).json({message: 'Cannot find subscriber'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.person = person;
    next();
}
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;



