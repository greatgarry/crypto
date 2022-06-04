import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons/lib/icons";
import icon from "../images/crypto.png";
function Navbar() {
  const [menuActive, setMenuActive] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize =()=> setScreenSize(window.innerWidth);
    window.addEventListener('resize',handleResize)
    handleResize();
    return ()=> window.removeEventListener('resize',handleResize)
  }, []);
  
  useEffect(() => {
    if (screenSize<768) {
      setMenuActive(false)
    }
    else{
      setMenuActive(true)
    }
  }, [screenSize]);
  
  return (
    <div className="navContainer">
      <div className="logoContainer">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoMania</Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={()=> setMenuActive(!menuActive)}>
          <MenuOutlined/>
        </Button>
      </div>
      {menuActive && (<Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>)}
    </div>
  );
}

export default Navbar;
