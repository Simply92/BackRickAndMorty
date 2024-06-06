const axios = require("axios");

 const dotenv = require("dotenv");
dotenv.config()
const urlApi = process.env.API_URL
 
 const getCharById = async (req, res) => {
     try {
         const { id } = req.params;
         const { data } = await axios(`${urlApi}/${id}`);
 
         const character = {
             id: data.id,
             name: data.name,
             species: data.species,
             origin: data.origin,
             image: data.image,
             gender: data.gender,
             status: data.status,
             location: data.location
         };
         return character.name
              ? res.status(200).json(character)
              : res.status(404).send('Not found')
     } catch (error) {
        return res.status(500).send({error: error.message});
     }
 };
 
 module.exports = getCharById;
