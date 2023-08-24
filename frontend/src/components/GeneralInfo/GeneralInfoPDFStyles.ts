import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  generalInfo: {
    width: "100%",
    marginTop: "12pt",
    marginBottom: "20pt",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: "10pt",
    height: "8pt",
  },
  arrow: {
    width: "16pt",
    height: "16pt",
  },
  content: {
    padding: "3pt 0 3pt 5pt",
    fontSize: "12pt",
  },
});
