import React from "react";
import { TooltipProps } from "./TooltipProps";
import styles from "./Tooltip.module.scss";
import ReactTooltip from "react-tooltip";

export const Tooltip: React.FC<TooltipProps> = ({ id, content }) => {
  return (
    <>
      <p data-tip data-for={id} className={styles.tooltip}>
        ?
      </p>
      <ReactTooltip id={id} className={styles.tooltipContent}>
        {content}
      </ReactTooltip>
    </>
  );
};
