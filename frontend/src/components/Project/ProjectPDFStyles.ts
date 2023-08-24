import { StyleSheet } from "@react-pdf/renderer";
import { variables } from "../../assets/styles/variables";

export const PDFStyles = StyleSheet.create({
  name: {
    marginTop: "15pt",
    marginBottom: "5pt",
    fontFamily: "LatoBold",
    fontSize: "14pt",
    color: variables.blue,
  },
  content: {
    marginTop: "15pt",
    display: "flex",
    flexDirection: "column",
  },
  keyAndValue: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10pt",
    width: "100%",
  },
  key: {
    minWidth: 150,
    width: 150,
    fontFamily: "LatoBold",
    flexShrink: 0,
  },
  toolsAndTechnologies: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 2,
  },
  tasks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    minWidth: 330,
    maxWidth: 330,
  },
  bullet: {
    paddingRight: "5pt",
    paddingLeft: "5pt",
  },
  description: {
    textAlign: "justify",
  },
});
