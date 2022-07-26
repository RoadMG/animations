import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
  coinID: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export const Chart = ({ coinID }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close),
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [], // number 배열로 강제
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 350,
              toolbar: {
                show: false,
              },
              background: "trasnparent",
              animations: {
                enabled: true,
                easing: "linear",
                speed: 800,
                animateGradually: {
                  enabled: false,
                },
              },
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
};

////// ApexChart Line
/* <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "trasnparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: { month: "mmm 'yy" },
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => +price.time_close*1000),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        /> */
