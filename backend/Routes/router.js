const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const authMiddleware = require('../middleware/auth');  // Import auth middleware


// ================= INSERT PRODUCT =================
router.post("/insertproduct", authMiddleware, async (req, res) => {

    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {

        // Check if product barcode already exists for THIS user
        const pre = await products.findOne({ ProductBarcode, userId: req.userId });

        if (pre) {
            return res.status(422).json({
                message: "Product already exists for this user"
            });
        }

        // Create product with userId
        const addProduct = new products({
            ProductName,
            ProductPrice,
            ProductBarcode,
            userId: req.userId  // Assign product to logged-in user
        });

        await addProduct.save();

        res.status(201).json(addProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= GET ALL PRODUCTS =================
router.get('/', authMiddleware, async (req, res) => {

    try {

        // Fetch only products belonging to the logged-in user
        const getProducts = await products.find({ userId: req.userId });

        res.status(200).json(getProducts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= GET SINGLE PRODUCT =================
router.get('/:id', authMiddleware, async (req, res) => {

    try {

        const getProduct = await products.findById(req.params.id);

        res.status(200).json(getProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= UPDATE PRODUCT =================
router.put('/updateproduct/:id', authMiddleware, async (req, res) => {

    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {

        const updateProducts = await products.findByIdAndUpdate(
            req.params.id,
            {
                ProductName,
                ProductPrice,
                ProductBarcode
            },
            { new: true }
        );

        res.status(200).json(updateProducts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= DELETE PRODUCT =================
router.delete('/deleteproduct/:id', authMiddleware, async (req, res) => {

    try {

        const deleteProduct = await products.findByIdAndDelete(req.params.id);

        res.status(200).json(deleteProduct);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= PATCH PRODUCT =================
router.patch('/patchproduct/:id', authMiddleware, async (req, res) => {

    try {

        const updateProduct = await products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
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