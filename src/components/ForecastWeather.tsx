import React from "react";
import type { WeatherData } from "../types/axiosResponse";
import { Spin } from "antd";
import { getDayOfWeek } from "../utils";
import { weatherCodes } from "../app/index";
import ForecastCard from "./ForecastCard";
import styles from "./Forecast.module.scss";
import { useWeatherStore } from "../store";
type Props = {
  data: WeatherData | null;
};
function ForecastWeather({ data }: Props) {
  const isLoading = useWeatherStore((state) => state.isLoading);

  if (!data || isLoading) {
    return (
      <Spin
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size="large"
      />
    );
  }

  const maxTemps = data.daily.temperature_2m_max;
  const minTemps = data.daily.temperature_2m_min;
  const weatherCodeList = data.daily.weathercode;
  const dates = data.daily.time;
  return (
    <>
      <div className={styles.title}>7 days Forecast</div>
      {dates.map((d, i) => {
        return (
          <ForecastCard
            maxTemp={maxTemps[i]}
            minTemp={minTemps[i]}
            description={weatherCodes[weatherCodeList[i]]}
            date={d}
          />
        );
      })}
    </>
  );
}

export default ForecastWeather;
