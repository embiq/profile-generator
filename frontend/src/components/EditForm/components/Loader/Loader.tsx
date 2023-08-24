import React from "react";
import styles from "./Loader.module.scss";
import { embiqLoaderCharacters } from "store/embiqLoaderCharacters";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderBox}>
      <div className={styles.loader}>
        {embiqLoaderCharacters.map((character, index) => (
          <span key={character + index}>{character}</span>
        ))}
      </div>
    </div>
  );
};
