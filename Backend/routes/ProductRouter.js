const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { Car } = require('../db/Schema');

const CarSchemaValidation = z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
    images: z.array(z.string()).max(10),
    tags: z.array(z.string())
});

// Swagger doc for Create Product
/**
 * @swagger
 * /api/v1/products/createProduct:
 *   post:
 *     summary: Create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Internal Server Error
 */
router.post('/createProduct', async (req, res) => {
    const validation = CarSchemaValidation.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json(validation.error.issues);
    }

    try {
        const car = await Car.create(req.body);
        return res.status(200).json({ message: 'Product created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
});

// Swagger doc for List Products
/**
 * @swagger
 * /api/v1/products/listProducts:
 *   get:
 *     summary: List all products
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal Server Error
 */
router.get('/listProducts', async (req, res) => {
    try {
        const Allcars = await Car.find({});
        return res.status(200).json({ Allcars });
    } catch (error) {
        return res.status(500).json({ message: 'Error while searching through Database' });
    }
});

// Swagger doc for List Product by ID
/**
 * @swagger
 * /api/v1/products/listProduct/{id}:
 *   get:
 *     summary: List a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal Server Error
 */
router.get('/listProduct/:id', async (req, res) => {
    const CarId = req.params.id;

    try {
        const car = await Car.findById(CarId);
        if (!car) {
            return res.status(400).json({ msg: 'No Such Car Found' });
        }
        return res.status(200).json({ car });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Swagger doc for Update Product
/**
 * @swagger
 * /api/v1/products/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Update successful
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal Server Error
 */
router.put('/updateProduct/:id', async (req, res) => {
    const validation = CarSchemaValidation.safeParse(req.body);
    const CarId = req.params.id;

    if (!validation.success) {
        return res.status(400).json(validation.error.issues);
    }
    try {
        const car = await Car.findByIdAndUpdate(CarId, req.body, { new: true });
        if (!car) {
            return res.status(400).json({ msg: 'No Such Car Found' });
        }
        return res.status(200).json({ message: 'Car Edited Successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Swagger doc for Delete Product
/**
 * @swagger
 * /api/v1/products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const CarId = req.params.id;
        const response = await Car.findByIdAndDelete(CarId);
        if (!response) {
            return res.status(400).json({ message: 'No Such Car Found' });
        }
        return res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error: ' + error });
    }
});

module.exports = router;
