const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


app.use(express.json());

const postData = {
    companyName: "goMart",
    clientID: "18de8adc-e305-41d9-8e5b-9961ebc42ef0",
    clientSecret: "edbmSDlbPXVUDocu",
    ownerName: "Lakshay Garg",
    ownerEmail: "21103324@mail.jiit.ac.in",
    rollNo: "21103324"
};

app.post('/api/products', async (req, res) => {
    try {
        const { companyName, categoryName, topElement, minPrice, maxPrice } = req.body;

        const authResponse = await axios.post('http://20.244.56.144/test/auth', postData);
        const accessToken = authResponse.data.access_token;

        const productsResponse = await axios.get(`http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products`, {
            params: {
                top: topElement,
                minPrice: minPrice,
                maxPrice: maxPrice
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const productsData = productsResponse.data;

        return res.status(200).json({
            data: productsData,
            message: "Successfully fetched products",
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Failed to fetch products",
        });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
