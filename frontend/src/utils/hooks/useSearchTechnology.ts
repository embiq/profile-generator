import { useState } from "react";
import { useSearchTechnologiesQuery } from "../../services/api";

const useSearchTechnologies = () => {
  const [word, setWord] = useState("");
  const { data, isLoading } = useSearchTechnologiesQuery(word);

  const searchTechnologies = (word: string) => {
    setWord(word);
  };
  return { searchTechnologies, data, isLoading };
};

export default useSearchTechnologies;
