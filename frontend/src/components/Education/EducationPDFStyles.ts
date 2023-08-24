import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  container: {
    marginBottom: "20pt",
    fontSize: "12pt",
  },
  educationItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "8pt",
  },
  date: {
    width: "15%",
  },
  content: {
    display: "flex",
    width: "85%",
  },
  name: {
    fontFamily: "LatoBold",
    paddingBottom: "4pt",
  },
});
