import React from 'react';
import millify from 'millify';
import {useGetCryptosQuery} from '../services/cryptoAPI'
import { Typography,Row,Col,Statistic } from "antd";
import { Link } from "react-router-dom";
import { News,Cryptocurrencies } from '.'
import Spinner from './Spinner';
const {Title} = Typography
function Homepage() {
    const {data,isFetching} = useGetCryptosQuery(10);
    const stats = data?.data?.stats;
    if(isFetching)
    {
        return <Spinner/>
    }
  return <>
  <Title level={2} className='heading' >Global Crypto Stats</Title>
  <Row>
      <Col span={12}><Statistic title="Total Crypto Currencies" value={stats.total}/></Col>
      <Col span={12}><Statistic title="Total Exchanges" value={millify(stats.totalExchanges)}/></Col>
      <Col span={12}><Statistic title="Total Market Cap" value={millify(stats.totalMarketCap)}/>USD</Col>
      <Col span={12}><Statistic title="Total 24H Volume" value={millify(stats.total24hVolume)}/>USD</Col>
      <Col span={12}><Statistic title="Total Markets" value={millify(stats.totalMarkets)}/></Col>
  </Row>
  <div className="home-heading-container">
      <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
      <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
  </div>
  <Cryptocurrencies home />
  <div className="home-heading-container">
      <Title level={2} className='home-title'>Latest Crypto News</Title>
      <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
  </div>
  <News home />
  </>
}

export default Homepage;
