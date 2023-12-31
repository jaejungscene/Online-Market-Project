// import 'antd/dist/antd.less';
import 'antd/dist/antd.css';
import "./App.css";
import MainPage from "./main/index.js";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload"; //index.js는 생략가능하다.
import ProductPage from "./product"; //index.js는 생략가능하다.
import {Button, Upload} from "antd"
import {DownloadOutlined} from "@ant-design/icons"
import NonPage from './main/nonPage';


function App() {
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to='/'>
            <img src='./images/icons/logo.png' alt="can find" />
          </Link>
          <Button 
          size="large"
          onClick={()=>{
            history.push('/upload'); // 클릭시 다른 경로로 이동
          }}
          icon={<DownloadOutlined/>}>
            상품 업로드
          </Button>
        </div>
      </div>

      <div id="body">
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/product/:id" component={ProductPage}/>
          <Route exact path="/upload" component={UploadPage}/> 
          <Route path="*" component={NonPage}/>
        </Switch>
      </div>

      <div id="footer"></div>
    </div>
  );
}

export default App;
