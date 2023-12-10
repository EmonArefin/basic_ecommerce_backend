const Order = require("../models/Order");

exports.CreateOrder = async(req, res)=>{
    try {
        let reqBody = req.body;
        const data = await Order.create(reqBody);
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

exports.UpdateOrder = async (req, res) => {
    try {
        const userID = req.params.userID;
        const updateFields = req.body.updateFields;

        const updatedOrder = await Order.findOneAndUpdate(
        { user: userID },
        updateFields,
        { new: true }
        );

        if (!updatedOrder) {
        return res.status(404).json({
            status: "Fail",
            data: "Order not found or user does not have permission to update.",
        });
        }

        res.status(200).json({
        status: "Success",
        data: updatedOrder,
        });
    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
        status: "Fail",
        data: error.toString(),
        });
    }
};

exports.CancelOrder = async(req, res)=>{
    try {
        const ID = req.params.orderID;
        const data = await Order.deleteOne({_id:ID})
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

