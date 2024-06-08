import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const navigate = useNavigate();
    
    
    const addProduct = async () =>{
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let data = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({name, price, category, userId, company}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        data = await data.json();
        console.warn(data);
        navigate('/');
    }


    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" 
            value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product price" 
            value={price} onChange={(e) => setPrice(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product category" 
            value={category} onChange={(e) => setCategory(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Product company" 
            value={company} onChange={(e) => setCompany(e.target.value)}
            />
            <button onClick={addProduct} className="appButton" type="button">Add Product</button>
        </div>
    )
}

export default AddProduct;