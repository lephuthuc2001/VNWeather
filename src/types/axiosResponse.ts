export type WeatherData = {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: { time: string[]; temperature_2m: number[] };
};
