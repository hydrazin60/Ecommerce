export const userLogout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.status(201).json({
            message: "Logged Out Successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
            error: err,
        });
    }
};
