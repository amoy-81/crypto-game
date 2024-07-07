"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import Loader from "@/app/_components/loader/Loader";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

export default function GoldChart() {
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchGoldPrices = async () => {
      setLoading(true);
      try {
        const respone = await axios.get("/gold/changes");

        const labels = respone.data.map((item: any) => {
          return `${new Date(item?.createdAt).getMonth() + 1}/${new Date(
            item?.createdAt
          ).getDate()}`;
        });

        const prices = respone.data.map((item: any) => item.price);

        setChartData({
          labels: labels?.reverse(),
          datasets: [
            {
              label: "Gold Price",
              data: prices?.reverse() || [0, 2, 4, 5, 4, 2],
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              fill: false,
              tension: 0.1,
              responsive: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchGoldPrices();
  }, []);

  return (
    <div className=" mt-4 relative">
      {loading && <Loader />}
      <h1 className="">
        Changes <span className=" text-yellow-400">Chart</span>
      </h1>
      <div className=" mt-2" style={{ height: "300px" }}>
        <Line
          data={chartData}
          height={"50%"}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
