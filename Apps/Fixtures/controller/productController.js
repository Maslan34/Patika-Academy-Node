const Product = require("../models/Product");
const User = require("../models/User");
const Furniture = require("../models/Furniture");

const getAllProducts = async (req, res) => {
  const user = await User.findById(gloabalUserSessionId);
  const furnitures = await Furniture.find();

  const getAllProducts = await Product.find();
  res.render("products", {
    products: getAllProducts,
    user: user,
    furnitures: furnitures,
  });
};

const addNewProduct = async (req, res) => {
  //console.log(req.body);

  const product = await Product.create(req.body);
  res.redirect("/products");
};

const getProduct = async (req, res) => {
  const user = await User.findById(gloabalUserSessionId);
  const productFetched = await Product.findOne({
    slug: req.params.slug,
  }).populate("furniture");
  res.render("products-single", { product: productFetched, user: user });
};

const deleteProduct = async (req, res) => {
  console.log(req.params.slug);
  try {
    const deletedProduct = await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    //console.log(deletedProduct);
    res.status(200).redirect("/products");
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the Product",
      details: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    // Gelen veriler
    const { name, description, origin } = req.body;

    // Güncellenen veriyi bul ve güncelle
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug }, // Hangi dokümanın güncelleneceğini belirtir
      { name, description, origin }, // Güncellenecek alanlar
      { new: true } // Yeni güncellenmiş dokümanı döndür ve doğrulama çalıştır
    );

    // Eğer doküman bulunmazsa hata döndür
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Başarılı bir şekilde güncellenmiş dokümanı döndür
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the Product",
      details: error.message,
    });
  }
};

const reserveProduct = async (req, res) => {
  const productFetched = await Product.findOne({
    slug: req.params.slug,
  }).populate("furniture");

  const user = await User.findById(gloabalUserSessionId);

  const updatedUser = await User.findOneAndUpdate(
    { _id: gloabalUserSessionId },
    {
      $push: {
        products: productFetched._id, //
      },
    },
    { new: true } // Güncellenmiş dökümana erişmek için
  );
  res.render("products-single", { product: productFetched, user: user });
};

const cancelProduct = async (req, res) => {
  const productFetched = await Product.findOne({
    slug: req.params.slug,
  }).populate("furniture");
  const user = await User.findById(gloabalUserSessionId);

  const updatedUser = await User.findOneAndUpdate(
    { _id: gloabalUserSessionId },
    { $pull: { products: productFetched._id } }
  )
    .then((result) => {
      console.log("Element removed:", result);
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  const furnitures = await Furniture.find();

  const getAllProducts = await Product.find();
  res.render("products", {
    products: getAllProducts,
    user: user,
    furnitures: furnitures,
  });
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  reserveProduct,
  cancelProduct,
};
