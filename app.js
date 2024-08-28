
const http = require('http');
const express = require('express');
let success = require('./message');
const morgan = require('morgan');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const Livre = require('./models/livre');






const app = express();
app.use(morgan(`dev`));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/livres")
.then(() => console.log('Connexion à la base de données réussie'))
.catch((err) => console.log('Erreur de connexion à la base de données :', err))


app.post('/livrs', (req, res) =>{
    const newLivre = new Livre({...req.body});
    newLivre.save();
    res.json(newLivre);
    });
app.get('/livres', async (req, res) =>{
        try {
            const livres = await Livre.find();
            res.json(livres);
        } catch (err) {
            res.send({ message: 'erreur ', error: err });
        }
    })

    app.put('/livs/:id',async (req, res) =>{
        try {
            const livreId = req.params.id;
            const updatedLivre = await Livre.findByIdAndUpdate(livreId,req.body);
            if (updatedLivre) {
                res.json(updatedLivre);
            } else {
                res.send({ message: 'livre non trouve' });
            }
        } catch (err) {
            res.send({ message: 'erreur de mise à jour du livre', error: err });
        }
    })

    app.delete('/lvs/:id',async (req, res) =>{
        try {
            const livreId = req.params.id;
            const deletedLivre = await Livre.findByIdAndDelete(livreId);
            if (deletedLivre) {
                res.send({ message: 'livre est suprime' });
            } else {
                res.send({ message: 'livre not trouve' });
            }
        } catch (err) {
            res.send({ message: 'erreur lors de la supression du livre', error: err });
        }
    })


app.listen(3000, () =>{
    console.log("serveur demare sur le port 3000");
});





