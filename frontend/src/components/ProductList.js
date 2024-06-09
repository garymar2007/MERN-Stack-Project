import React, { useState, useEffect } from 'react';

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
    

    console.warn(products);

    return(
        <div className="product-list">
            <h1> Product List</h1>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            
            {
                products.filter((item) => item.userId == JSON.parse(localStorage.getItem('user'))._id)
                .map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button className="deleteButton" onClick={()=>deleteProduct(item._id)}>Delete</button></li>
                    </ul>                
                )
            }
        </div>
    )
}

export default ProductList;