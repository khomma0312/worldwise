import City from "@/components/City";
import { ReactNode, Reducer, createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

export type City = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City;
  getCity: (id: string) => void;
  createCity: (newCity: CityData) => void;
  deleteCity: (id: string) => void;
  error: string;
};

type CityData = {
  cityName: string;
  country: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  emoji: string;
};

type State = {
  cities: City[],
  isLoading: boolean,
  currentCity: City,
  error: string,
};

type Action = {
  type: "loading" | "cities/loaded" | "city/loaded" | "city/created" | "city/deleted" | "rejected",
  payload?: {
    cities?: City[],
    error?: string,
    currentCity?: City,
    newCity?: City,
    id?: string,
  },
};

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: {} as City,
  error: "",
};

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload?.cities ? action.payload.cities : [],
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload?.currentCity ? action.payload.currentCity : {} as City,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload?.newCity as City],
        currentCity: action.payload?.newCity as City,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload?.id),
        currentCity: {} as City,
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error ? action.payload.error : "",
      };
    default:
      throw new Error("Invalid action type");
  }
};

const CitiesContext = createContext<CitiesContextType | null>(null);

export const CitiesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({type: "loading"});

      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({type: "cities/loaded", payload: {cities: data}})
      } catch (error) {
        dispatch({type: "rejected", payload: {error: "Error fetching cities"}});
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    if (id === currentCity.id) return;

    dispatch({type: "loading"});

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({type: "city/loaded", payload: {currentCity: data}})
    } catch (error) {
      dispatch({type: "rejected", payload: {error: "Error fetching city"}});
    }
  };

  const createCity = async (newCity: CityData) => {
    dispatch({type: "loading"});

    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({type: "city/created", payload: {newCity: data}})
    } catch (error) {
      dispatch({type: "rejected", payload: {error: "Error creating city"}});
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({type: "loading"});

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "city/deleted", payload: {id}})
    } catch (error) {
      dispatch({type: "rejected", payload: {error: "Error deleting city"}});
    }
  };

  return (
    <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity, deleteCity, error}}>
      {children}
    </CitiesContext.Provider>
  )
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};