import { Page, Document, Font, View, PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { EditForm, PDF } from "./components";
import { apiUrls, useGetProfilesQuery } from "./services/api";
import useLoadProfileSubmit from "./utils/hooks/useLoadProfileSubmit";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import styles from "./App.module.scss";
import { PDFStyles } from "./AppPDFStyles";
import "react-toastify/dist/ReactToastify.css";
import { sortExperienceItems } from "./utils/sortExperienceItems";
import embiqLogo from "../src/assets/images/embiq-logo.svg";
import { ButtonWithModal, Loader } from "./components/EditForm/components";
import PDFViewer from "./utils/PDFViewer";
import { saveToDocxFile } from "utils/saveToDocxFile";

const lato = require("../src/assets/fonts/Lato-Regular.ttf");
const latoBold = require("../src/assets/fonts/Lato-Bold.ttf");
Font.register({ family: "Lato", src: lato, fontStyle: "normal", fontWeight: 400 });
Font.register({ family: "LatoBold", src: latoBold, fontStyle: "normal", fontWeight: 700 });
Font.registerHyphenationCallback((word) => [word]);

const App: React.FC = () => {
  const {
    onSubmit,
    profileDataIsFetching,
    profileData,
    editableProfileFields,
    setEditableProfileFields,
    editFormRef,
    handleNewFormClick,
    handleSubmit,
    register,
    getValues,
  } = useLoadProfileSubmit();
  const { data: selectorData, isSuccess, isLoading, isError } = useGetProfilesQuery();

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={PDFStyles.page}>
        {editableProfileFields && <PDF editableProfileFields={sortExperienceItems(editableProfileFields)} />}
        <View style={PDFStyles.block} />
      </Page>
    </Document>
  );

  return (
    <div className={styles.appContainer}>
      <PDFViewer style={PDFStyles.viewer}>
        <MyDocument />
      </PDFViewer>
      <div className={styles.formBox}>
        <ToastContainer theme="dark" autoClose={3000} />
        <div className={styles.poweredBy}>
          Powered by <img src={embiqLogo} alt="EMBIQ" width="80px" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.findProfileBox}>
            Find profile:
            {selectorData && (
              <select {...register("id", { required: true })} defaultValue={selectorData[0].id}>
                {selectorData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id}:{item.name}
                  </option>
                ))}
              </select>
            )}
            {!selectorData && isSuccess && <span className={styles.warning}>No data in the database</span>}
            {!selectorData && isError && <span className={styles.warning}>Something went wrong</span>}
            {(isLoading || profileDataIsFetching) && <Loader />}
          </div>
          <div className={styles.formButtons}>
            <button className="btn" type="submit" disabled={profileDataIsFetching}>
              Load
            </button>
            <ButtonWithModal buttonText="New profile" modalQuestion="Are you sure you want to create a new profile?" onClick={handleNewFormClick} />
            {profileData && (
              <a href={apiUrls.specialist(profileData.id)} target="_blank" rel="noreferrer">
                <button className="btn" type="button">
                  See details
                </button>
              </a>
            )}
          </div>
          {editableProfileFields && (
            <div className={styles.formButtons}>
              <PDFDownloadLink document={<MyDocument />} fileName={`${editableProfileFields.name}`}>
                <button className="btn" type="button">
                  Download .pdf file
                </button>
              </PDFDownloadLink>
              <button className="btn" type="button" onClick={() => saveToDocxFile(editableProfileFields)}>
                Download .docx file
              </button>
            </div>
          )}
        </form>
        {editableProfileFields && (
          <EditForm editableProfileFields={editableProfileFields} onFormChange={setEditableProfileFields} id={getValues().id} ref={editFormRef} />
        )}
      </div>
    </div>
  );
};

export default App;
