"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CoinImage from "../../../../public/coin.png";
import CurrentCredit from "./CurrentCredit";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { formatTime } from "@/utils/timeFormater";
import {
  ErrorAlertBlur,
  SuccessAlert,
} from "@/app/_components/alerts/AlertMessage";
import ProgressBar from "./ProgressBar";

export default function MineSection() {
  const { data: session } = useSession();

  const [credit, setCredit] = useState(0);
  const [isStartMine, setIsStartMine] = useState<boolean>(false);
  const [record, setRecord] = useState<number>(0);
  const [minedCoin, setMinedCoin] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const axios = useAxiosAuth();

  useEffect(() => {
    if (session) {
      console.log(session);
      getCurrentRecord();
    }
  }, [session]);

  //
  useEffect(() => {
    const prof = 240;
    const divisor = 60;
    const newMinedCoin = record > prof ? 5 : Math.floor(record / divisor);
    setMinedCoin(newMinedCoin);
  }, [record]);

  // Record time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRecord((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Error and Success Messages Monitoring
  useEffect(() => {
    if (errorMessage || successMessage) {
      setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);
    }
  }, [errorMessage, successMessage]);

  const getCurrentRecord = () => {
    axios
      .get("/coin/current-record")
      .then((res) => {
        if (res.data) {
          const now = Math.floor(new Date().getTime() / 1000);
          setRecord(
            now - res.data.startAt < 240 ? now - res.data.startAt : 241
          );
          setIsStartMine(true);
        } else {
          setIsStartMine(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsStartMine(false);
      });
  };

  const startMine = () => {
    axios
      .get("/coin/record")
      .then((res) => {
        setRecord(0);
        getCurrentRecord();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err?.response?.data?.message || "You are mining!");
      });
  };

  const mineRecord = () => {
    axios
      .get("/coin/mine")
      .then((res) => {
        setRecord(0);
        setCredit(res?.data?.user?.currentCredit);
        setSuccessMessage(
          `You received ${res?.data?.record?.amountMined} coins`
        );
        getCurrentRecord();
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || "You can not mine!");
      });
  };

  return (
    <>
      <div className=" py-2">
        {errorMessage && <ErrorAlertBlur text={errorMessage} />}
        {successMessage && <SuccessAlert text={successMessage} />}
      </div>
      <CurrentCredit credit={credit} setCredit={setCredit} />

      <div
        className={`${
          isStartMine && minedCoin < 5
            ? "animate-shake grayscale-0"
            : " grayscale"
        } relative w-full flex justify-center p-12`}
      >
        {isStartMine ? (
          <Image src={CoinImage} alt="ccc" />
        ) : (
          <Image onClick={startMine} src={CoinImage} alt="ccc" />
        )}
      </div>

      {isStartMine && (
        <>
          <div>
            <p className={record > 240 ? "text-red-500" : "text-white"}>
              {formatTime(record)}
            </p>
            <p className=" flex gap-2">
              <span className=" fadeInOuteTag">{">"}</span>$ {minedCoin}
              <span className=" fadeInOuteTag">{"<"}</span>
            </p>
          </div>
          <ProgressBar progress={minedCoin} />
        </>
      )}

      <div className=" flex justify-center gap-4 pb-4">
        <button
          onClick={startMine}
          disabled={isStartMine}
          className={`${
            isStartMine
              ? "text-white/40 bg-gradient-to-t to-neutral-700 from-neutral-600"
              : "text-white bg-gradient-to-t to-yellow-400 from-orange-400"
          } py-2 px-4 font-bold rounded-lg`}
        >
          STaRt RecORd
        </button>

        {isStartMine && (
          <button
            onClick={mineRecord}
            className=" bg-gradient-to-t to-yellow-400 from-orange-400 py-2 px-4 font-bold rounded-lg"
          >
            MiNe
          </button>
        )}
      </div>
    </>
  );
}
