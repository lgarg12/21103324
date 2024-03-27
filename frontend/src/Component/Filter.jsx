import React, { useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [companyName, setCompanyName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [topElement, setTopElement] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categories = ["Laptop", "Phone", "Computer", "TV", "Tablet", "Charger"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        companyName,
        categoryName,
        topElement,
        minPrice,
        maxPrice
      };

      
      const response = await axios.post('http://localhost:8081/api/products', postData);
      setProducts(response.data.data);
      console.log(products);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch products. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-9/12 mx-auto flex flex-col gap-5'>
      <h2 className='text-center'>Filter Products</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name:</label>
        <select id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required>
          <option value="">Select Company Name</option>
          {companyNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <label htmlFor="categoryName">Category Name:</label>
        <select id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <label htmlFor="topElement">Top Element:</label>
        <input type="number" id="topElement" value={topElement} onChange={(e) => setTopElement(e.target.value)} required />
        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required />
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <ul className='flex flex-col gap-5'>
        {products.map((product,index) => (
          <div>
            <li key={index}>{product.availability}</li>
            <li key={index}>{product.productName}</li>
            <li key={index}>{product.discount}</li>
            <li key={index}>{product.price}</li>
            <li key={index}>{product.rating}</li>            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
