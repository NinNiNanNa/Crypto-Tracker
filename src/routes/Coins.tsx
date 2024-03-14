import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
const Coin = styled.li`
  width: 22.4%;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
    padding: 20px 0;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 15px;
    transition: background 0.3s ease-in-out;
    h2 {
      margin-top: 10px;
      font-weight: 500;
    }
  }
  &:hover {
    a {
      background: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 100),
  });
  return (
    <Container>
      <Header>
        <Title>CRYPTO TRACKER</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                <h2>{coin.symbol}</h2>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
