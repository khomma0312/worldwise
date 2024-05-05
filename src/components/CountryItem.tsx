import { FC } from "react";
import styles from "./CountryItem.module.css";
import { City } from "@/contexts/CitiesContext";

const CountryItem: FC<{city: City}> = ({ city }) => {
  return (
    <li className={styles.countryItem}>
      <span>{city.emoji}</span>
      <span>{city.country}</span>
    </li>
  );
}

export default CountryItem;
