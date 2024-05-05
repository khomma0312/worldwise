import { FC, MouseEventHandler } from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { City, useCities } from '@/contexts/CitiesContext';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const CityItem: FC<{city: City}> = ({city}) => {
  const { cityName, emoji, date, id, position } = city;
  const {currentCity, deleteCity} = useCities();

  const activeClass = currentCity.id === id ? styles["cityItem--active"] : "";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${activeClass}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  )
}
