import { StyleSheet } from "@react-pdf/renderer";
import { variables } from "../../assets/styles/variables";

export const PDFStyles = StyleSheet.create({
  title: {
    fontFamily: "LatoBold",
    paddingBottom: "8pt",
    borderBottom: `1.5pt solid ${variables.blue}`,
    fontSize: "16pt",
  },
});
