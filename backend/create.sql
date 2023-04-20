CREATE SCHEMA `dicommon`;
CREATE TABLE data (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    acquisition_date VARCHAR(255),
    study_date VARCHAR(255),
    study_time VARCHAR(255),
    modality VARCHAR(255),
    patient_Name VARCHAR(255),
    Patient_ID VARCHAR(255),
    Patient_Birth_Date VARCHAR(255),
    Patient_Sex VARCHAR(255),
    Study_Instance_UID VARCHAR(255),
    Study_ID VARCHAR(255),
    Series_Number INT(11),
    Instance_Number INT(11),
    Rows INT(11),
    Columns INT(11),
    pixel_spacing VARCHAR(255)
);