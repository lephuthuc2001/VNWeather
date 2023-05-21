import React from "react";
import styles from "./CurrentWeather.module.scss";
import { WeatherData } from "../types/axiosResponse";
import { weatherCodes } from "../app/index";
import { Statistic, Spin } from "antd";
import { WarningFilled, SafetyCertificateFilled } from "@ant-design/icons";
import { useWeatherStore } from "../store";
import { getIcons } from "../utils";

type Props = {
  data: WeatherData | null;
};
function CurrentWeather({ data }: Props) {
  const isLoading = useWeatherStore((state) => state.isLoading);

  if (!data || isLoading) {
    return <Spin size="large" />;
  }

  const currentDate = new Date();
  const currentHour = new Date().getHours();

  const weatherDescription = weatherCodes[data.daily.weathercode[0]];
  return (
    <>
      <div className={styles.title}>
        Current Weather {currentDate.toLocaleTimeString("vn-VN")}
      </div>
      <div className={styles.left}>
        <img
          alt={weatherDescription}
          className={styles.icon}
          src={getIcons(weatherDescription)}
        />
        <div className={styles.degree}>
          {data.hourly.temperature_2m[currentHour]}
          <sup>o</sup>C
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.description}>
          {weatherCodes[data.daily.weathercode[0]]}
        </div>
        <div className={styles.numbers}>
          <Statistic
            title="Highest Temp"
            value={data.daily.temperature_2m_max[0]}
            valueStyle={{ color: "#cf1322" }}
            prefix={<WarningFilled />}
            suffix={
              <div>
                <sup>o</sup>C
              </div>
            }
          />
          <Statistic
            title="Lowest Temp"
            value={data.daily.temperature_2m_min[0]}
            valueStyle={{ color: "#1c7ed6" }}
            prefix={<SafetyCertificateFilled />}
            suffix={
              <div>
                <sup>o</sup>C
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
