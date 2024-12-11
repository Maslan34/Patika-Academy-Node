const Furniture = require('../models/Furniture');

const getAllFurnitures = async (req, res) => {
  try {
    const getAllFurnitures = await Furniture.find();
    res.render("furnitures", { furnitures: getAllFurnitures });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching furnitures", details: error.message });
  }
};

const addNewFurniture = async (req, res) => {
  try {
    //console.log(req.body); // Log the request body for debugging
    const furniture = await Furniture.create(req.body);
    //console.log(furniture)
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding new furniture", details: error.message });
  }
};

const getFurniture = async (req, res) => {
  try {
    const furnitureFetched = await Furniture.findOne({ slug: req.params.slug });
    if (!furnitureFetched) {
      return res.status(404).json({ error: "Furniture not found" });
    }
    res.render("furnitures-single", { furniture: furnitureFetched });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the furniture", details: error.message });
  }
};

const deleteFurniture = async (req, res) => {
  try {
    const deletedFurniture = await Furniture.findOneAndDelete({slug: req.params.slug });
    if (!deletedFurniture) {
      return res.status(404).json({ error: "Furniture not found" });
    }
    console.log(deletedFurniture);
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the furniture", details: error.message });
  }
};

const updateFurniture = async (req, res) => {
  try {
    // Gelen veriler
    const { name, description, origin } = req.body;

    // Güncellenen veriyi bul ve güncelle
    const updatedFurniture = await Furniture.findOneAndUpdate(
      { slug: req.params.slug }, // Hangi dokümanın güncelleneceğini belirtir
      { name, description, origin }, // Güncellenecek alanlar
      { new: true, } // Yeni güncellenmiş dokümanı döndür ve doğrulama çalıştır
    );

    // Eğer doküman bulunmazsa hata döndür
    if (!updatedFurniture) {
      return res.status(404).json({ error: "Furniture not found" });
    }

    // Başarılı bir şekilde güncellenmiş dokümanı döndür
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the furniture", details: error.message });
  }
};

module.exports = {
  addNewFurniture,
  getAllFurnitures,
  getFurniture,
  deleteFurniture,
  updateFurniture
};
