const { Favorite, User } = require("../DB_connection");

const postFav = async (req, res) => {
  
  try {
    const { character, email } = req.body;
    
    const {id, name, species, image, gender, status} = character

    const usuario = await User.findOne({ where: { email: email } });
    
    if (usuario) {
      
      const [favorite] = await Favorite.findOrCreate({
        where: { id },
        defaults: { name, status, image, species, gender }
    });
  
      const addFavoritePromise = await usuario.addFavorite(favorite);
      
      await Promise.all([addFavoritePromise]);
      const favAll = await Favorite.findAll()

      return res.status(200).json(favAll);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
