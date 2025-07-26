import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import axios from 'axios';

export default function UserDash() {
  const [product, setProduct] = useState({
    Name: '',
    Price: '',
    Quantity: '',
  });

  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/getproduct');
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching products');
      }
    };

  useEffect(() => {
    
    fetchProducts();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/product/addProduct', product);
      setMessage('✅ Product added successfully');
      setProduct({ Name: '', Price: '', Quantity: '' });
      setProducts((prev) => [...prev, res.data]); // instant feedback
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Failed to add product');
    }
  };
 const handledelete=async(id)=>{
    if(!window.confirm("Are you sure you wanna delete this product"))return;
    try{
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`)
      setProducts(product.filter(product=>product._id!==id))
    }
    catch(err){
      alert(err.respone?.data?.message||'Error deleting product')
    }
    
  }

  return (
    <div>
      <Navbar />
      <h2>Product Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="Name"
          value={product.Name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        />
        <input
          name="Price"
          value={product.Price}
          onChange={handleChange}
          type="number"
          placeholder="Product Price"
        />
        <input
          name="Quantity"
          value={product.Quantity}
          onChange={handleChange}
          type="number"
          placeholder="Product Quantity"
        />
        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>

      <div>
        <h2>All Products</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.Name}</td>
                  <td>{product.Price}</td>
                  <td>{product.Quantity}</td>
                  <td>{new Date(product.createdAt).toLocaleString()}</td>
                  <td><button onClick={()=> handledelete(product._id)}>Delete</button> </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}