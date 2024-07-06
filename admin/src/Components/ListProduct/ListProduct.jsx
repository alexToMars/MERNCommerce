// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(()=>{
    fetchInfo();
  }, [])

  /*const remove_product = async() =>{

  }*/
  return (
    <div className='list-product'>
        <h1>All product list</h1>
        <div className="listproduct-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Old price</p>
          <p>New price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className='listproduct-allproducts'>
          {allproducts.map((product,index)=>{
            return <div key={index} className='listproduct-format-main listproduct-format'>
                <img className='listproduct-product-icon' src={product.image} alt="" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img className='listproduct-remove-icon' src={cross_icon} alt="" />
              </div>
          })}
        </div>
    </div>
  )
}

export default ListProduct