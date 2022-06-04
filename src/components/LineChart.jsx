import React from "react";
import { Line} from "react-chartjs-2";
import { Chart as ChartJS,
         CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend } from "chart.js";
         import { Typography, Col, Row } from "antd";
         ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend);
const { Title } = Typography;
function LineChart({ coinHistory, currentPrice, coinName,timePeriod }) {
  const coinPrice = [];
  const coinTimeStamp = [];
  const historyLength = coinHistory?.data?.history?.length;
for (let i = historyLength-1; i >= 0; i -= 1) {
      if (i%8===0) {
        coinPrice.push(coinHistory?.data?.history[i]?.price);
    coinTimeStamp.push((timePeriod==='24h'||timePeriod==='3h'?new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleTimeString():new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleDateString()));
      }
  }
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In US Dollars",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
        scales: {
            yAxes:
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            
          },
  };
  return (
    <>
      <Row className="chart-header">
        <Title className="chart-title" level={2}>
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {currentPrice}$
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options}></Line>
    </>
  );
}

export default LineChart;
