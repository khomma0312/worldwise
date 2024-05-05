import { FC } from 'react'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import { City, useCities } from '@/contexts/CitiesContext'

export const CountryList: FC = () => {
  const {cities, isLoading} = useCities();

  if (isLoading) {
    return <Spinner />
  }

  if (!cities.length) {
    return <Message message="Add your first city by clicking on a city on the map" />
  }

  const countryUniquedCities = cities.reduce((acc, city) => {
    return acc.some(accCity => accCity.country === city.country) ? acc : [...acc, city]
  }, [] as City[]);

  return (
    <ul className={styles.countryList}>
      {countryUniquedCities.map(city => (<CountryItem key={city.id} city={city} />))}
    </ul>
  )
}
