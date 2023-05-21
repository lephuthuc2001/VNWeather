import React, { useEffect } from "react";
import { useWeatherStore } from "./store";
import { Select, Spin, App as AppConfig } from "antd";
import { cities } from "./app/index";
import { ConfigProvider, theme } from "antd";
import styles from "./App.module.scss";
import CurrentWeather from "./components/CurrentWeather";
import { WeatherData } from "./types/axiosResponse";
import ForecastWeather from "./components/ForecastWeather";

const customTheme = {
  token: {
    colorPrimary: "#51cf66",
  },
};

function App() {
  const {
    isLoading,
    currentCity,
    currentInfo,
    getWeatherInfo,
    updateCurrentCity,
  } = useWeatherStore();

  const { useToken } = theme;
  const { token } = useToken();

  const options = cities.map((c) => {
    return {
      label: c.city,
      value: JSON.stringify(c),
    };
  });

  const cityChangeHandler = (value: string) => {
    updateCurrentCity(JSON.parse(value));
  };

  useEffect(() => {
    getWeatherInfo(currentCity);
  }, [currentCity, getWeatherInfo]);

  return (
    <ConfigProvider theme={customTheme}>
      <AppConfig className={styles.App}>
        <div className={styles.App__title}>VN Weather</div>
        <Select
          className={styles.App__select}
          onChange={cityChangeHandler}
          style={{ width: "200px" }}
          options={options}
          defaultValue={"Đà Nẵng"}
          showSearch
        />
        <div className={styles.App__currentWeather}>
          <CurrentWeather data={currentInfo} />
        </div>
        <div className={styles.App__forecast}>
          <ForecastWeather data={currentInfo} />
        </div>
      </AppConfig>
    </ConfigProvider>
  );
}

export default App;
