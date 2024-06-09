import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async (id) => {
        console.warn(params.id);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Get",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () =>{
        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        }
        let data = await fetch(`http://localhost:5000/product/${params.id}/update-product`, {
            method: 'put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        data = await data.json();
        navigate('/');
    }

    return(
        <div className='product'>
            <h1>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" 
            value={name} onChange={(e) => setName(e.target.value)}
            />
            { error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product price" 
            value={price} onChange={(e) => setPrice(e.target.value)}
            />
            { error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product category" 
            value={category} onChange={(e) => setCategory(e.target.value)}
            />
            { error && !category && <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text" placeholder="Enter Product company" 
            value={company} onChange={(e) => setCompany(e.target.value)}
            />
            { error && !company && <span className="invalid-input">Enter valid company</span>}

            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;