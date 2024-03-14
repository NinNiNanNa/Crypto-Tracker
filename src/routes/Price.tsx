import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";

const Title = styled.h2`
  padding-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
`;
const PriceContainer = styled.div`
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;
const PriceInfo = styled.div`
  text-align: center;
  padding: 20px;
  background: ${(props) => props.theme.btnBgColor1};
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  span {
    display: block;
  }
  span:first-child {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.accentColor};
  }
  span:last-child {
    font-size: 25px;
    font-weight: 400;
  }
`;

const Message = styled.h3`
  padding-top: 15px;
  text-align: center;
`;

interface PriceProps {
  coinId: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: "2024-03-08T15:34:07Z";
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPrice>({
    queryKey: ["price", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });
  return (
    <div>
      {isLoading ? (
        <Message>Loading Price...</Message>
      ) : (
        <>
          <Title>PERCENT CHANGE</Title>
          <PriceContainer>
            <PriceInfo>
              <span>30min ago</span>
              <span>{data?.quotes.USD.percent_change_30m}</span>
            </PriceInfo>
            <PriceInfo>
              <span>1hour ago</span>
              <span>{data?.quotes.USD.percent_change_1h}</span>
            </PriceInfo>
            <PriceInfo>
              <span>12hour ago</span>
              <span>{data?.quotes.USD.percent_change_24h}</span>
            </PriceInfo>
            <PriceInfo>
              <span>7days ago</span>
              <span>{data?.quotes.USD.percent_change_7d}</span>
            </PriceInfo>
            <PriceInfo>
              <span>30days ago</span>
              <span>{data?.quotes.USD.percent_change_30d}</span>
            </PriceInfo>
            <PriceInfo>
              <span>1year ago</span>
              <span>{data?.quotes.USD.percent_change_1y}</span>
            </PriceInfo>
          </PriceContainer>
        </>
      )}
    </div>
  );
}

export default Price;
