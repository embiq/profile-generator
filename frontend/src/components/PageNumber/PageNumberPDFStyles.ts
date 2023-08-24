import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  pageNumbers: {
    width: "100%",
    display: "flex",
    position: "absolute",
    height: "20pt",
    top: -30,
    left: 0,
    margin: "0",
    paddingBottom: "5pt",
    borderBottom: "1pt solid $black",
    fontSize: "8pt",
    textAlign: "right",
  },
});
