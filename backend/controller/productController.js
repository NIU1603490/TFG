const Product = require('../models/product.js');
//const Transaction = require('../models/transaction.js');


const getProducts = async (req, res) => {
    try{
        const products = await Product.find({ status: 'available' });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, images, seller, location, condition, status } = req.body;
        
        const newProduct = new Product({ title, description, price, category, images, seller, location, condition, status });
        
        //save the product to the database
        await newProduct.save();
       
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating product', error });
    }

}

//get product by id
const getProductById = async (req, res) => { 
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
}


//update product by id
const updateProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }

        if(product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
            
        );
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
    
}



const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findById(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        //verify the user is the owner of the product
        if (deletedProduct.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }

        await Product.findByIdAndUpdate(productId, { status: 'deleted' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
}


module.exports = {getProducts, createProduct, deleteProduct};