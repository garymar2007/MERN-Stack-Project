import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete'
        });
        result = await result.json();
        if(result) {
            alert("Product deleted!");
            getProducts();
        }
    }
    

    const searchHandler = async (event) => {
        const key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return(
        <div className="product-list">
            <h1> Product List</h1>
            <input type="" className="search-product-box" placeholder="Search Product" 
            onChange={searchHandler}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            
            {
                products.length > 0 ?
                
                    products.filter((item) => item.userId == JSON.parse(localStorage.getItem('user'))._id)
                    .map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className="deleteButton" onClick={()=>deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}>Update</Link>
                            </li>
                        </ul>                
                    )
                :
                <h1> No Result found</h1>
            }
        </div>
    )
}

export default ProductList;