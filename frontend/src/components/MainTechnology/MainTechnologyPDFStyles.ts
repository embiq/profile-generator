import { variables } from "../../assets/styles/variables";
import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  technology: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "18pt",
    alignItems: "center",
    width: "100%",
  },
  technologyWithoutLevel: {
    marginBottom: "18pt",
    width: "25%",
  },
  nameBox: {
    paddingRight: "12pt",
    width: "50%",
  },
  name: {
    textAlign: "right",
  },
  boxes: {
    display: "flex",
    flexDirection: "row",
  },
  lvl: {
    borderColor: variables.blue,
    borderWidth: "2pt",
    width: "12pt",
    height: "12pt",
    marginRight: "8pt",
    borderRadius: "50%",
  },
  lvlFilled: {
    backgroundColor: variables.blue,
  },
  levelBoxes: {
    width: "12pt",
    marginRight: "0",
  },
  levelName: {
    marginTop: "25pt",
    fontSize: "10pt",
    marginBottom: "5pt",
  },
  legendItem: {
    marginRight: "12pt",
    display: "flex",
    alignItems: "center",
  },
});
