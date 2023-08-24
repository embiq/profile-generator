import { StyleSheet } from "@react-pdf/renderer";

export const PDFStyles = StyleSheet.create({
  mainTechnologies: {
    width: "100%",
    fontSize: "12pt",
  },
  skills: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
  },
  skillsWithoutLevel: {
    flexDirection: "column",
  },
  skillsMain: {
    width: "50%",
    padding: "14pt 14pt 14pt 0",
  },
  skillsMainWithoutLevel: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "14pt",
  },
  skillsAdditional: {
    width: "50%",
    padding: "14pt 0 14pt 14pt",
    height: "auto",
  },
  content: {
    marginBottom: "10pt",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  additionalSkillTitle: {
    marginBottom: "5pt",
    fontFamily: "LatoBold",
  },
});
