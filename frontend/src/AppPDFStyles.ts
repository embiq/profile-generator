import { StyleSheet } from "@react-pdf/renderer";
import { variables } from "./assets/styles/variables";

export const PDFStyles = StyleSheet.create({
  viewer: {
    width: "50%",
    height: "100vh",
    minWidth: "50%",
  },
  page: {
    flexDirection: "column",
    backgroundColor: variables.white,
    fontFamily: "Lato",
    padding: "50pt",
  },
  block: {
    width: "100%",
    height: "25pt",
    position: "absolute",
    top: 20,
    left: 50,
    backgroundColor: variables.white,
  },
});
