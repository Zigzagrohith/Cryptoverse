import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery, useGetCryptoStatsQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";

const { Title } = Typography;

const Home = () => {
  const { data: cryptoData, isFetching: isFetchingCryptos, error: cryptoError } = useGetCryptosQuery(10);
  const { data: statsData, isFetching: isFetchingStats, error: statsError } = useGetCryptoStatsQuery();

  console.log("✅ Crypto Stats API Response:", statsData); // Debugging API response
  console.log("✅ Cryptos API Response:", cryptoData);

  // Handle loading state
  if (isFetchingCryptos || isFetchingStats) return <Loader />;

  // Handle API errors
  if (cryptoError || statsError) {
    return <h2 style={{ textAlign: "center", color: "red" }}>❌ Failed to fetch data. Please try again later.</h2>;
  }

  // Extract global stats (ensuring safe access to API response)
  const globalStats = statsData?.data || {};

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      
      <Row gutter={[16, 16]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.totalCoins || "N/A"} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges || 0)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap || 0)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume || 0)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets || 0)} /></Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
