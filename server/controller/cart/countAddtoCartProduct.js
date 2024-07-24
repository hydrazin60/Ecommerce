 
import AddToCartModel from "../../models/cartProduct.model.js"; // Adjust path if necessary

export const countAddtoCartProduct = async (req, res) => {
    try {
        const userId = req.user?.id; // Extract user ID from the user object
        
        console.log('User ID from request:', userId); // Check the value of userId

        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing",
                success: false,
            });
        }

        const count = await AddToCartModel.countDocuments({ userId: userId });

        res.status(200).json({
            data: { count: count },
            message: "ok",
            success: true,
        });
    } catch (error) {
        console.error('Error counting cart products:', error); // Log error for debugging
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
        });
    }
}