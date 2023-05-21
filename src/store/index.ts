import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { City } from "../types/city";
import type { WeatherData } from "../types/axiosResponse";
import { weatherFetcher } from "../app/index";

import qs from "qs";

const initialCity: City = {
  city: "Đà Nẵng",
  latitude: 16.0544,
  longitude: 108.2022,
};

type State = {
  currentCity: City;
  currentInfo: WeatherData | null;
  isLoading: boolean;
};

type Actions = {
  updateCurrentCity: (city: City) => void;
  getWeatherInfo: (city: City) => void;
};

export const useWeatherStore = create(
  immer<State & Actions>((set, get) => ({
    currentCity: initialCity,
    currentInfo: null,
    isLoading: false,
    updateCurrentCity: (newCity: City) =>
      set((state) => {
        state.currentCity = newCity;
      }),
    getWeatherInfo: async (city: City) => {
      set((state) => {
        state.isLoading = true;
      });
      try {
        const queryParams = {
          latitude: city.latitude,
          longitude: city.longitude,
          daily: "weathercode,temperature_2m_max,temperature_2m_min",
          hourly: "temperature_2m",
          past_days: 0,
          timezone: "Asia/Bangkok",
        };

        const res = await weatherFetcher.get<WeatherData>("forecast", {
          params: queryParams,
        });

        const info = await res.data;

        set((state) => {
          state.currentInfo = info;
        });
      } catch (error) {
        console.log(error);
      }
      set((state) => {
        state.isLoading = false;
      });
    },
  }))
);
