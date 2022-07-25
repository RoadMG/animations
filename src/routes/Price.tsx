import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: wheat;
  }
`;

interface PriceProps {
  coinID: string;
}

const Price = ({ coinID }: PriceProps) => {
  const { isLoading, data } = useQuery<PriceData>(["price", coinID], () =>
    fetchCoinTickers(coinID)
  );

  const volume = data?.quotes.USD.volume_24h?.toFixed(0);

  return (
    <>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <PriceContainer>
            <PriceItem>Last updated : </PriceItem>
            <PriceItem>{data?.last_updated}</PriceItem>
          </PriceContainer>
          <PriceContainer>
            <PriceItem>Market Cap : </PriceItem>
            <PriceItem>${data?.quotes.USD.market_cap}</PriceItem>
          </PriceContainer>
          <PriceContainer>
            <PriceItem>Percent Change during 30min :</PriceItem>
            <PriceItem>{data?.quotes.USD.percent_change_30m}%</PriceItem>
          </PriceContainer>
          <PriceContainer>
            <PriceItem>Percent Change during 1day :</PriceItem>
            <PriceItem>{data?.quotes.USD.percent_change_24h}%</PriceItem>
          </PriceContainer>
          <PriceContainer>
            <PriceItem>Volume during 24hr :</PriceItem>
            <PriceItem>${volume}</PriceItem>
          </PriceContainer>
        </>
      )}
    </>
  );
};

export default Price;
