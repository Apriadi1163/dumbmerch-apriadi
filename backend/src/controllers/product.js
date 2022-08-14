const { product, user, category, productcategory } = require("../../models")

exports.addProduct = async (req, res) => {
    try {
      let { categoryId } = req.body;
      if (categoryId) {
        categoryId = categoryId.split(",");
      }
      const data = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.file.filename,
        qty: req.body.qty,
        idUser: req.user.id,
      };
  
      let newProduct = await product.create(data);

      // const productCategoryData = categoryId.map((item) => {
      //   return { idProduct: newProduct.id, idCategory: parseInt(item) };
      // });
  
      // await categoryProduct.bulkCreate(productCategoryData);
      if (categoryId) {
        const productCategoryData = categoryId.map((item) => {
          return { idProduct: newProduct.id, idCategory: parseInt(item) };
        });
  
        await productcategory.bulkCreate(productCategoryData);
      }
  
      let products = await product.findOne({
        where: {
          id: newProduct.id,
        },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["password", "createdAd", "updatedAt"],
            },
          },
          {
            model: category,
            as: "categories",
            through: {
              model: productcategory,
              as: "bridge",
              attributes: [],
            },
            attributes: {
              exclude: ["idUser", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["idUser", "createdAt", "updatedAt"],
        },
      });
  
      products = JSON.parse(JSON.stringify(products));
      res.status(200).send({
        status: "Success",
        message: "Add Product Success",
        data: {
          ...products,
          image: process.env.PATH_FILE + products.image,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "Add Product Failed",
        message: "Server Error",
      });
    }
};

exports.getProducts = async (req, res) => {
  try{
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes:{
            exclude:["password", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes:{
        exclude:["idUser", "createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.status(200).send({
      status: "success",
      message: "Get all data products",
      data,
    });
  }catch(error){
    console.log(error)
    res.status(404).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try{
    let data = await product.findOne({
      where: { id },
      include: [
        {
          model: user,
          as: "user",
          attributes:{
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productcategory,
            as: "bridge",
          },
          attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes:{
        exclude: ["idUser", "createdAt", "updatedAt"],
      }
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.status(200).send({
      status: "Success",
      message: `Get detail product: ${id} success`,
      data,
    });
  }catch(error){
    console.log(error);
    res.status(404).send({
      status: "failed",
      message: "server error",
    });
  }
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    // if (req.file) {
    //   data.image = req.file.filename;
    // }
    console.log(data);
    let updateProduct = await product.update(
      {
        ...data,
        image: req.file.filename,
        idUser: req.user.id,
      },
      { where: { id } }
    );

    updateProduct = JSON.parse(JSON.stringify(data));

    updateProduct = {
      ...updateProduct,
      image: process.env.PATH_FILE + req.file.filename,
    };

    res.status(200).send({
      status: "Success",
      message: `Update product at id: ${id} success`,
      data: {
        products: updateProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Updated product failed",
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    await productcategory.destroy({
      where: {
        idProduct: id,
      },
    });

    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
