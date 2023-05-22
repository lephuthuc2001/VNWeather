import React from "react";
import { getDayOfWeek } from "../utils";
import { getIcons } from "../utils";
import styles from "./Forecast.module.scss";
import { Statistic } from "antd";
import { WarningFilled, SafetyCertificateFilled } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;
type Props = {
  date: string;
  maxTemp: number;
  minTemp: number;
  description: string;
};

function ForecastCard(props: Props) {
  const d = new Date(props.date);

  return (
    <div className={styles.forecast__card}>
      <div className={styles.forecast__date}>
        {d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        })}
        {" " + getDayOfWeek(props.date)}
      </div>
      <img className={styles.icon} src={getIcons(props.description)} alt="" />
      <div className={styles.numbers}>
        <Statistic
          value={props.maxTemp}
          valueStyle={{ color: "#cf1322" }}
          suffix={
            <div>
              <sup>o</sup>C
            </div>
          }
        />

        <Statistic
          value={props.minTemp}
          valueStyle={{ color: "#1c7ed6" }}
          suffix={
            <div>
              <sup>o</sup>C
            </div>
          }
        />
      </div>
    </div>
  );
}

export default ForecastCard;
