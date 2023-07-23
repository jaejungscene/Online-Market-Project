import "./index.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { API_URL } from "../config/constants";
import {Carousel, Spin} from 'antd';

export default function MainPage(){
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = React.useState([]);

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

    axios
      .get(`${API_URL}/banners`)
      .then(function(result){
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error)=>{
        console.error("에러 발생: ", error); 
      })
  }, []);

  if(products.length === 0){
    return (
      <div style={{textAlign: "center", paddingTop: 32}}>
        <Spin 
        tip="Loading..."
        size="large"/>
      </div>
    )
  }

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000} draggable>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`}/>
              </div>
            </Link>
          );
        })}
      </Carousel>

      <h1 id="product-headline">판매되는 상품들</h1>

      <div id="product-list">
        {products.map((product)=>{
          console.log(product.soldout);
          return (
            <div className="product-card" key={product.id}>
              {
                (product.soldout === 1) &&
                <div className="product-blur"/>
              }
              <Link 
              className="product-link" 
              to={`/product/${product.id}`}>
                <div>
                  <img
                  className="product-img" 
                  src={`${API_URL}/${product.imageUrl}`}/>
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