import { StyleSheet } from "@react-pdf/renderer";
import { variables } from "../../assets/styles/variables";

export const PDFStyles = StyleSheet.create({
  rateAndAvailability: {
    display: "flex",
    flexDirection: "row",
    marginTop: "12pt",
  },
  viewBox: {
    width: "140pt",
    fontSize: "10pt",
    marginRight: "13pt",
  },
  box: {
    marginTop: "2pt",
    padding: "10pt",
    fontSize: "14pt",
    fontFamily: "LatoBold",
    border: `1pt solid ${variables.blue}`,
  },
});
