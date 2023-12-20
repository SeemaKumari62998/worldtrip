import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

function CountryList() {
  const { cities, isLoadiing } = useCities();

  if (isLoadiing) return <Spinner />;

  if (!cities.length)
    return (
      <Message message={"Add your city by clicking on the city on the map"} />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
