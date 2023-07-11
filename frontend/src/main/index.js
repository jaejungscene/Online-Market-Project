import "./index.css"
import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { API_URL } from "../config/constants";

export default function MainPage(){
  const [products, setProducts] = useState([]);
  console.log('check')
  useEffect(()=>{
    axios
    .get(`${API_URL}/products`)
    .then((result)=>{
      setProducts(result.data.products);
      console.log(result.data.products);
    })
    .catch((error)=>{
      console.error("error occurs : ", error)
    });
  }, []);

  return (
    <div>
      <div id="banner">
        <img  src="./images/banners/banner1.png"/>
      </div>

      <h1 id="product-headline">판매되는 상품들</h1>

      <div id="product-list">
        {products.map((product)=>{
          return (
            <div className="product-card">
              <Link className="product-link" to={`/product/${product.id}`}>
                <div>
                  <img className="product-img" src={`${API_URL}/${product.imageUrl}`} />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="./images/icons/avatar.png"
                    />
                    <span>{product.seller}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}