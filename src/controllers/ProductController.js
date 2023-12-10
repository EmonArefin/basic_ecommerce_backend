const Product = require("../models/Product")

exports.CreateProduct = async(req, res)=>{
    try {
        const reqBody = req.body;
        const data = await Product.create(reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.ReadAllProduct = async(req, res)=>{
    try {
        const data = await Product.find();
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.ReadProductById = async(req, res)=>{
    try {
        let id = req.params.id;
        let query = {_id:id}
        const data = await Product.find(query);
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.ReadProductByCategory = async(req, res)=>{
    try {
        let category = req.params.category;
        let query = {category:category}
        const data = await Product.find(query);
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.UpdateProduct = async(req, res)=>{
    try {
        let id = req.params.id;
        let reqBody = req.body;
        let query = {_id:id};
        let data = await Product.updateOne(query, reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.DeleteProduct = async(req, res)=>{
    try {
        let id = req.params.id;
        let query = {_id:id};
        let data = await Product.deleteOne(query);
        res.status(200).json({
            status: "Success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
}