import useAxios from "axios-hooks";

export const useApiGetStarships = () => useAxios("/starships");
