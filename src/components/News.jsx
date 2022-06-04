import React,{useState} from "react";
import { Row, Select, Typography, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/newsAPI";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Spinner from './Spinner';
const { Text, Title } = Typography;
const { Option } = Select;
function News({ home }) {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    newsCategory,
    count: home ? 8 : 27,
  });
  const { data} = useGetCryptosQuery(100);
  if (isFetching) {
    return <Spinner/>
  }
  return (
    <>
      {!home ? (
        <div style={{marginBottom: '15px'}}>
          <Title level={2} style={{color: 'navy',textAlign: 'center'}}>
            {newsCategory} News
          </Title>
          <Col>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a crypto"
              optionFilterProp="children"
              onChange={(value) => setnewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin)=>{
               return <Option value={coin.name}> {coin.name}</Option>
              })}
            </Select>
          </Col>
        </div>
      ) : (
        ""
      )}
      <Row gutter={(30, 30)}>
        {cryptoNews.value.map((news, i) => {
          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name > 35
                      ? `${news.name.substring(0, 35)}...`
                      : news.name}
                    </Title>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || `https://cdn.pixabay.com/photo/2018/05/17/21/26/cryptocurrency-3409725_960_720.jpg`}
                      alt="cryptonews"
                      style={{maxWidth: '100px',maxHeight: '100px'}}
                    />
                  </div>
                  <p>
                    {news.description > 80
                      ? `${news.description.substring(0, 80)}...`
                      : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={news.provider[0]?.image?.thumbnail?.contentUrl}
                        alt=""
                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default News;
