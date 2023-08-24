import { useEffect, useState } from "react";

const useMainTechnologyLevelHandler = (level: number | undefined) => {
  const [levelArr, setLevelArr] = useState<boolean[]>([]);
  const lvl = level || 5;

  useEffect(() => {
    let arr: boolean[] = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(i <= lvl);
    }
    setLevelArr(arr);
  }, [lvl]);

  return { levelArr };
};

export default useMainTechnologyLevelHandler;
