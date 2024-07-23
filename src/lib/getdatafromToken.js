import jwt from "jsonwebtoken"; // Removed braces from jwt import

export const getdatafromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Removed braces from jwt.verify
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }
};

