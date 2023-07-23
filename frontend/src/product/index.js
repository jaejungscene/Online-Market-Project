import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import './index.css'
import { API_URL } from "../config/constants";
import {Button, Space, Spin, message} from 'antd';
import dayjs from "dayjs";

export default function ProductPage(){
  const {id} = useParams(); // App.js에 ":id" 부분에 들어가는 값이 전달됨
  const [product, setProduct] = useState(null);
  const getProduct = () => {
    axios
    .get(`${API_URL}/products/${id}`)
    .then((result) => {
        console.log(result);
        setProduct(result.data.product);
      })
    .catch((error) => {
      console.error(error);
    });
  }

  console.log("product id: ", id);
  useEffect(() => {
    getProduct();
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

  const onClickPurchase = ()=>{
    axios.post(`${API_URL}/purchase/${id}`)
    .then((result)=>{
      message.info("구매가 완료되었습니다.");
      getProduct();
    })
    .catch((error)=>{
      console.error(error);
    })

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
        <div id='createAt'>
          {dayjs(product.createAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button 
        id="purchase-button"  
        size="large" 
        type="primary" 
        danger
        onClick={onClickPurchase}
        disabled={product.soldout}>
          재빨리 구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}