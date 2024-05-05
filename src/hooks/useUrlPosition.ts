import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat') ? Number(searchParams.get('lat')) : 0;
  const lng = searchParams.get('lng') ? Number(searchParams.get('lng')) : 0;

  return [lat, lng];
};