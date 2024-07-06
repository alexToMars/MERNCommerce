// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/products/allproducts')
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/products/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All product list</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr className='custom-hr' />
      <div className='listproduct-allproducts'>
        {allproducts.map((product, index) => {
          return (
            <React.Fragment key={index}>
              <div className='listproduct-format-main listproduct-format'>
                <img className='listproduct-product-icon' src={product.image} alt='' />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  className='listproduct-remove-icon'
                  src={cross_icon}
                  alt=''
                />
              </div>
              <hr className='custom-hr' />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
