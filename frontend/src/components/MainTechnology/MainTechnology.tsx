import React from "react";
import { View, Text } from "@react-pdf/renderer";

import { levelNames } from "../../store/levelNames";
import { MainTechnologyItem } from "../../types";
import { PDFStyles } from "./MainTechnologyPDFStyles";
import useMainTechnologyLevelHandler from "../../utils/hooks/useMainTechnologyLevelHandler";

export const MainTechnology: React.FC<MainTechnologyItem> = ({ name, level, showSkillLevel, isLegend = false }) => {
  const { levelArr } = useMainTechnologyLevelHandler(level);

  return (
    <>
      {isLegend && showSkillLevel ? (
        <View style={PDFStyles.technology} wrap={false}>
          {levelNames.map((name) => (
            <View style={PDFStyles.legendItem} key={name}>
              <Text style={PDFStyles.levelName}>{name}</Text>
              <View style={[PDFStyles.lvl, PDFStyles.lvlFilled, PDFStyles.levelBoxes]} />
            </View>
          ))}
        </View>
      ) : (
        <View style={showSkillLevel ? PDFStyles.technology : PDFStyles.technologyWithoutLevel} wrap={false}>
          <View style={PDFStyles.nameBox}>
            <Text style={showSkillLevel ? PDFStyles.name : {}}>{name}</Text>
          </View>
          {showSkillLevel && (
            <View style={PDFStyles.boxes}>
              {levelArr.map((el, index) => (
                <View style={el ? [PDFStyles.lvl, PDFStyles.lvlFilled] : PDFStyles.lvl} key={`box-${index}`}></View>
              ))}
            </View>
          )}
        </View>
      )}
    </>
  );
};
