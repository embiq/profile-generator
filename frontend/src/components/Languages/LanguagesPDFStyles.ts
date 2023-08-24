import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5pt",
    marginBottom: "20pt",
  },
  lang: {
    flexGrow: 1,
    fontSize: "12pt",
  },
});
