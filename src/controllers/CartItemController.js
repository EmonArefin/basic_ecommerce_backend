const CartItem = require("../models/CartItem");

exports.AddToCartProduct = async(req, res)=>{
    try {
        const reqBody = req.body;
        const data = await CartItem.create(reqBody);
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

exports.ReadCartProduct = async(req, res)=>{
    try {
        const data = await CartItem.find();
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

exports.UpdateCartProduct = async(req, res)=>{
    try {
        let id = req.params.id;
        let reqBody = req.body;
        let query = {_id:id};
        let data = await CartItem.updateOne(query, reqBody);
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

exports.RemoveCartProduct = async(req, res)=>{
    try {
        let id = req.params.id;
        let query = {_id:id};
        let data = await CartItem.deleteOne(query);
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
