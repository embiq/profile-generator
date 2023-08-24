import React from "react";
import { SectionTitle } from "..";

import { View, Text } from "@react-pdf/renderer";
import { LanguagesProps } from "./LanguagesProps";
import { PDFStyles } from "./LanguagesPDFStyles";

export const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <View wrap={false} id="languagesAnchor">
      <SectionTitle title="Languages" />
      <View style={PDFStyles.container}>
        {languages.map((lang, index) => (
          <View style={PDFStyles.lang} key={lang.name + index}>
            <Text>
              {lang.name}: {lang.level}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
