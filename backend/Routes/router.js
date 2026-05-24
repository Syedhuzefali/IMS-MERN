const express = require('express');
const router = express.Router();
const products = require('../Models/Products');


// ===============================
// Insert Product
// ===============================
router.post('/insertproduct', async (req, res) => {

    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {

        const pre = await products.findOne({
            ProductBarcode: ProductBarcode
        });

        if (pre) {

            return res.status(422).json({
                message: "Product already exists"
            });

        }

        const addProduct = new products({
            ProductName,
            ProductPrice,
            ProductBarcode
        });

        await addProduct.save();

        console.log(addProduct);

        res.status(201).json(addProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ===============================
// Get All Products
// ===============================
router.get('/', async (req, res) => {

    try {

        const getProducts = await products.find({});

        console.log(getProducts);

        res.status(200).json(getProducts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ===============================
// Get Single Product
// ===============================
router.get('/:id', async (req, res) => {

    try {

        const getProduct = await products.findById(req.params.id);

        if (!getProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json(getProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ===============================
// Update Product (PUT)
// ===============================
router.put('/updateproduct/:id', async (req, res) => {

    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {

        const updateProducts = await products.findByIdAndUpdate(
            req.params.id,
            {
                ProductName,
                ProductPrice,
                ProductBarcode
            },
            {
                new: true
            }
        );

        console.log("Data Updated");

        res.status(200).json(updateProducts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ===============================
// Delete Product
// ===============================
router.delete('/deleteproduct/:id', async (req, res) => {

    try {

        const deleteProduct = await products.findByIdAndDelete(req.params.id);

        console.log("Data Deleted");

        res.status(200).json(deleteProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});


// ===============================
// Patch Product
// ===============================
router.patch('/patchproduct/:id', async (req, res) => {

    try {

        const updateProduct = await products.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(updateProduct);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;