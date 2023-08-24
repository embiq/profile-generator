import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  Document,
  HeightRule,
  LevelFormat,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { variables } from "assets/styles/variables";
import { calculateDurationTime } from "utils/calculateDurationTime";

import { EditableExperienceField, EditableProfileFields, Education, Language, MainTechnologyItem, Technology } from "types";
import dayjs from "dayjs";

const getTextStyles = (fontSize: string, bold = false) => ({ size: fontSize, font: "Lato", bold: bold });

const getAdvantagesAndCourses = (data: string): Paragraph[] => {
  const numberingArray: Paragraph[] = [];

  data.split("\n").forEach((el) => {
    numberingArray.push(
      new Paragraph({
        text: el,
        style: "NormalText",
        numbering: {
          reference: "standardNumbering",
          level: 0,
        },
      })
    );
  });

  return numberingArray;
};

const getMainTechnologyLevel = (lvl: number): TextRun[] => {
  const mainTechnologyItem: TextRun[] = [];

  for (let i = 1; i <= 5; i++) {
    mainTechnologyItem.push(new TextRun({ text: i <= lvl ? "\u25C9" : "\u25CE", color: variables.blue, ...getTextStyles("19pt") }));
  }

  return mainTechnologyItem;
};

const getMainTechnologies = (data: MainTechnologyItem[]): Table => {
  const mainTechnologiesRows: TableRow[] = [];
  const whiteBorderStyle = { style: BorderStyle.SINGLE, color: variables.white };

  data.forEach((el) => {
    mainTechnologiesRows.push(
      new TableRow({
        height: {
          value: 900,
          rule: HeightRule.EXACT,
        },
        children: [
          new TableCell({
            width: { size: 4000, type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ text: el.name, style: "NormalText", indent: { left: convertInchesToTwip(0.25) } })],
          }),
          new TableCell({
            width: { size: 3000, type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ children: el.level ? getMainTechnologyLevel(el.level) : [] })],
          }),
        ],
      })
    );
  });

  const mainTechnologiesTable = new Table({
    columnWidths: [4000, 3000],
    borders: {
      top: whiteBorderStyle,
      bottom: whiteBorderStyle,
      left: whiteBorderStyle,
      right: whiteBorderStyle,
      insideHorizontal: whiteBorderStyle,
      insideVertical: whiteBorderStyle,
    },
    rows: mainTechnologiesRows,
  });

  return mainTechnologiesTable;
};

const getAdditionalSkills = (additionalSkills: string): Paragraph[] => {
  const additionalSkillsArray: Paragraph[] = [];

  additionalSkillsArray.push(
    new Paragraph({
      text: "Additional skills:",
      style: "BoldText",
      spacing: { before: 200, after: 130 },
    }),
    new Paragraph({
      text: additionalSkills,
      style: "NormalText",
      spacing: { after: 130 },
    })
  );

  return additionalSkillsArray;
};

const getEductaionItems = (data: Education[]): Paragraph[] => {
  const educationItems: Paragraph[] = [];

  data.forEach((el) => {
    educationItems.push(
      new Paragraph({
        spacing: { after: 130 },
        numbering: {
          reference: "numberingWithoutMarker",
          level: 0,
        },
        children: [
          new TextRun({ text: `${dayjs(el.endDate).format("YYYY")}            `, ...getTextStyles("15pt") }),
          new TextRun({ text: el.name, style: "BoldText", ...getTextStyles("15pt", true) }),
        ],
      })
    );
  });

  return educationItems;
};

const getLanguages = (data: Language[]): Paragraph[] => {
  const languages: Paragraph[] = [];

  data.forEach((el) => {
    languages.push(
      new Paragraph({
        text: `${el.name}: ${el.level}`,
        style: "NormalText",
        spacing: { after: 130 },
        numbering: {
          reference: "numberingWithoutMarker",
          level: 0,
        },
      })
    );
  });

  return languages;
};

const getTasks = (tasks: string): Paragraph[] => {
  const tasksArray: Paragraph[] = [];

  tasks.split("\n").forEach((task) => {
    tasksArray.push(
      new Paragraph({
        text: task,
        style: "NormalText",
        spacing: { after: 130 },
        numbering: {
          reference: "standardNumbering",
          level: 0,
        },
      })
    );
  });

  return tasksArray;
};

const getToolsAndTechnologies = (tools: Technology[]): TextRun[] => {
  const tasksArray: TextRun[] = [];

  tools.forEach((tool, index) => {
    tasksArray.push(
      new TextRun({
        text: ` ${tool.name}${index < tools.length - 1 ? "," : "."}`,
        style: "NormalText",
      })
    );
  });

  return tasksArray;
};

const getExperienceItems = (data: EditableExperienceField[]): Paragraph[] => {
  const experienceItems: Paragraph[] = [];

  data.forEach((el) => {
    experienceItems.push(
      new Paragraph({
        style: "NormalText",
        spacing: { after: 300 },
        children: [new TextRun({ text: el.name, bold: true, color: variables.blue })],
      })
    );
    experienceItems.push(
      new Paragraph({
        text: el.description,
        style: "NormalText",
        spacing: { after: 300 },
      })
    );
    experienceItems.push(
      new Paragraph({
        style: "NormalText",
        spacing: { after: 300 },
        children: [new TextRun({ text: "Period of time: ", bold: true }), new TextRun({ text: calculateDurationTime(el.duration) })],
      })
    );
    experienceItems.push(
      new Paragraph({
        style: "NormalText",
        spacing: { after: 300 },
        children: [new TextRun({ text: "Tasks:", bold: true })],
      })
    );
    experienceItems.push(...getTasks(el.tasks));
    experienceItems.push(
      new Paragraph({
        style: "NormalText",
        spacing: { before: 300, after: 1000 },
        children: [new TextRun({ text: "Tools and technologies:", bold: true }), ...getToolsAndTechnologies(el.toolsAndTechnologies)],
      })
    );
  });

  return experienceItems;
};

const createSectionHeader = (name: string): Paragraph => {
  return new Paragraph({
    text: name,
    spacing: { before: 300, after: 300 },
    style: "Heading2",
    border: { bottom: { color: variables.blue, size: 12, space: 1, style: BorderStyle.SINGLE } },
  });
};

const getDocumentData = (editableProfileFields: EditableProfileFields) => {
  const documentData: any[] = [];

  if (editableProfileFields.advantages) {
    documentData.push(...getAdvantagesAndCourses(editableProfileFields.advantages));
  }

  if (editableProfileFields.mainTechnologies.length > 0) {
    const mainTechnologiesHeader = createSectionHeader("Main technologies");
    const mainTechnologiesTable = getMainTechnologies(editableProfileFields.mainTechnologies);

    documentData.push(mainTechnologiesHeader, mainTechnologiesTable);
  }

  if (editableProfileFields.skills) {
    documentData.push(...getAdditionalSkills(editableProfileFields.skills));
  }

  if (editableProfileFields.courses) {
    const coursesHeader = createSectionHeader("Courses");
    const coursesData = getAdvantagesAndCourses(editableProfileFields.courses);

    documentData.push(coursesHeader, ...coursesData);
  }

  if (editableProfileFields.education.length > 0) {
    const educationHeader = createSectionHeader("Education");
    const educationData = getEductaionItems(editableProfileFields.education);

    documentData.push(educationHeader, ...educationData);
  }

  if (editableProfileFields.languages.length > 0) {
    const languagesHeader = createSectionHeader("Languages");
    const languagesData = getLanguages(editableProfileFields.languages);

    documentData.push(languagesHeader, ...languagesData);
  }

  if (editableProfileFields.experience.length > 0) {
    const experienceHeader = createSectionHeader("Experience");
    const experienceData = getExperienceItems(editableProfileFields.experience);

    documentData.push(experienceHeader, ...experienceData);
  }

  return documentData;
};

const getDocxDocument = (editableProfileFields: EditableProfileFields): Document => {
  return new Document({
    styles: {
      paragraphStyles: [
        { id: "Heading1", run: getTextStyles("27pt", true) },
        { id: "Heading2", run: getTextStyles("22pt", true) },
        { id: "Heading3", run: getTextStyles("22pt") },
        { id: "NormalText", run: getTextStyles("15pt") },
        { id: "BoldText", run: getTextStyles("15pt", true) },
      ],
    },
    numbering: {
      config: [
        {
          reference: "standardNumbering",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u25CF",
              alignment: AlignmentType.LEFT,
              style: {
                run: { color: variables.blue },
                paragraph: {
                  indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.25) },
                },
              },
            },
          ],
        },
        {
          reference: "numberingWithoutMarker",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "",
              alignment: AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: editableProfileFields.jobTitles,
            style: "Heading1",
          }),
          new Paragraph({
            text: editableProfileFields.name,
            style: "Heading3",
            spacing: { before: 150, after: 300 },
          }),
          ...getDocumentData(editableProfileFields),
        ],
      },
    ],
  });
};

export const saveToDocxFile = (editableProfileFields: EditableProfileFields): void => {
  const doc = getDocxDocument(editableProfileFields);

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${editableProfileFields.name}.docx`);
  });
};
