import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { PDFAnchors } from "utils/PDFAnchors";
import { PDFStyles } from "./RateAndAvailabilityPDFStyles";

import { RateAndAvailabilityProps } from "./RateAndAvailabilityProps";

export const RateAndAvailability: React.FC<RateAndAvailabilityProps> = ({ rate, availability }) => {
  return (
    <View style={PDFStyles.rateAndAvailability} id={PDFAnchors.POSITION_AND_NAME}>
      {!!rate && (
        <View style={PDFStyles.viewBox}>
          <Text>Hourly rate</Text>
          <Text style={PDFStyles.box}>{rate}</Text>
        </View>
      )}
      {!!availability && (
        <View style={PDFStyles.viewBox}>
          <Text>Availability</Text>
          <Text style={PDFStyles.box}>{availability}</Text>
        </View>
      )}
    </View>
  );
};
