import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input,Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Spinner from './Spinner';
function Cryptocurrencies({ home }) {
  const {Title} = Typography;
  const count = home ? 10 : 60;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const searchedTerm = cryptoList?.data?.coins.filter((currency) => {
      return currency.name.toLowerCase().includes(search);
    });
    setCryptos(searchedTerm);
  }, [cryptoList, search]);
  if (isFetching) {
    return <Spinner/>
  }
  return (
    <>
      {!home ? (
        <div className="search-crypto">
          <Title level={2} style={{color: 'navy'}}>
            Cryptocurrencies
          </Title>
          <Input
            placeholder="Search Crypto By Name"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      ) : (
        ""
      )}
      <Row gutter={[25, 25]} className="crypto-card-container">
        {cryptos?.map((currency) => {
          return (
            <Col
              xs={22}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>Price: {millify(currency.price, { precision: 3 })} $</p>
                  <p>Market Cap: {millify(currency.marketCap)} $</p>
                  <p>
                    24h Change: {millify(currency.change, { precision: 3 })}%
                  </p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
