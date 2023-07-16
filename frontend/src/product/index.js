import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import './index.css'
import { API_URL } from "../config/constants";
import {Space, Spin} from 'antd';

export default function ProductPage(){
  const {id} = useParams(); // App.js에 ":id" 부분에 들어가는 값이 전달됨
  const [product, setProduct] = useState(null);
  console.log("product id: ", id);
  useEffect(() => {
    axios
    .get(`${API_URL}/products/${id}`)
    .then((result) => {
        console.log(result);
        setProduct(result.data.product);
      })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  if(product === null){
    return (
      <div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Spin tip="상품 정보를 받고 있습니다..." size="large">
            <div className="content" />
          </Spin>
        </Space>
      </div>
    )
  }

  return(
    <div>
      <div id='image-box'>
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id='createAt'>{product.createAt}</div>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}