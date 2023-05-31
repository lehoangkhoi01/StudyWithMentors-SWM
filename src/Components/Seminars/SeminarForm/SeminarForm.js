import React from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { useHistory } from "react-router";
//----------------
import style from "./SeminarForm.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedDateTimePicker from "../../../shared/components/DatetimePicker/CustomizedDateTimePicker";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteInput from "../../../shared/components/AutocompleteInput/AutocompleteInput";
//-------------------
import {
  seminarNameValidation,
  seminarPlaceValidation,
} from "../../../shared/constants/validationRules";
import {
  validationSeminarDate,
  validationSeminarImage,
} from "./seminarValidation";
import {
  BUTTON_LABEL,
  DATE_FORMAT,
  ERROR_MESSAGES,
  PLACE_HOLDER,
  TEXTFIELD_LABEL,
  TITLE,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";
//------------------
import { accountService } from "../../../Services/accountService";
import { ROUTES } from "../../../shared/constants/navigation";
import { seminarService } from "../../../Services/seminarService";
import { resourceService } from "../../../Services/resourceService";
import { convertBytesToMB } from "../../../Helpers/mathHelper";
import ListFileDisplay from "../../../shared/components/ListFileDisplay/ListFileDisplay";
import FileInputIcon from "../../../shared/components/FileInputIcon/FileInputIcon";
import { useCustomLoading } from "../../../Helpers/generalHelper";

const SeminarForm = () => {
  const history = useHistory();
  const { setLoading } = useCustomLoading();
  const [seminarBackground, setSeminarBackground] = React.useState(null);
  const [documents, setDocuments] = React.useState([]);
  const [mentorList, setMentorList] = React.useState([]);
  const [seminarDate, setSeminarDate] = React.useState(new Date());
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seminarBackground: null,
      seminarDocuments: [],
    },
  });

  const onFileChange = (newValue) => {
    if (newValue && VALID_IMAGE_FILE_TYPE.indexOf(newValue.type) >= 0) {
      setSeminarBackground(URL.createObjectURL(newValue));
    } else {
      setSeminarBackground(null);
    }
  };

  const handleDocumentsChange = (e) => {
    const files = e.target.files;
    if (files.length === 1) {
      setDocuments((prev) => [...prev, files[0]]);
    } else {
      const newFileList = Array.from(files);
      setDocuments((prev) => [...prev, ...newFileList]);
    }
  };

  const validateFiles = () => {
    if (documents.length > 3) {
      return ERROR_MESSAGES.INVALID_SEMINAR_DOCUMENTS;
    }

    for (let i = 0; i < documents.length; i++) {
      if (convertBytesToMB(documents[i].size) > 3) {
        return ERROR_MESSAGES.INVALID_SEMINAR_DOCUMENTS;
      }
    }
  };

  const handleRemoveDocuments = (index) => {
    const tempList = [...documents];
    tempList.splice(index, 1);
    setDocuments(tempList);
  };

  const onRemoveImage = () => {
    setSeminarBackground(null);
    setValue("seminarBackground", null);
  };

  const getOptionLabel = (option) => option.profile.fullName;

  const renderOptionSpeakerAutocomplete = (props, option) => (
    <li {...props} className={`${style.autocomplete__rowDropdown}`}>
      <div>{option.profile.fullName}</div>
      <div>{option.email}</div>
    </li>
  );

  const handleUploadImage = async (file) => {
    if (file) {
      let formData = new FormData();
      formData.append("image", file);
      return await resourceService.uploadImage(formData);
    }
  };

  const handleUploadAttachments = async (fileList) => {
    let seminarAttachmentList = [];
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let formData = new FormData();
        formData.append("attachment", fileList[i]);
        const attachmentUrl = await resourceService.uploadAttachment(formData);
        seminarAttachmentList.push(attachmentUrl);
      }
    }
    return seminarAttachmentList;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.seminarSpeakers = data.seminarSpeakers.map((speaker) => speaker.id);
      data.seminarTime = format(
        data.seminarTime,
        DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
      );
      const imageUrl = await handleUploadImage(data.seminarBackground);
      const attachmentList = await handleUploadAttachments(documents);
      let requestBody = {
        name: data.seminarName,
        description: data.seminarDescription,
        location: data.seminarPlace,
        imageUrl: imageUrl,
        startTime: data.seminarTime,
        mentorIds: data.seminarSpeakers,
        attachmentUrls: attachmentList.length > 0 ? attachmentList : null,
      };
      await seminarService.create(requestBody);
      history.push(ROUTES.SEMINAR_LIST);
    } catch (error) {
      console.log(error);
      if (error.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchMentorList = async () => {
      const result = await accountService.getAllMentors();
      setMentorList(result);
    };
    fetchMentorList();
  }, []);

  return (
    <Grid2 container className={`${style.seminarForm__container}`}>
      <form
        className={`${style.seminarForm__form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
          {seminarBackground ? (
            <div className={`${style.seminarForm__image}`}>
              <img src={seminarBackground} alt="seminar-poster" />
              <IconButton
                aria-label="remove"
                size="large"
                className={`${style.seminarForm__iconButton}`}
                onClick={onRemoveImage}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <Controller
              name="seminarBackground"
              defaultValue={seminarBackground}
              control={control}
              rules={{
                validate: validationSeminarImage,
              }}
              render={({ field, fieldState }) => {
                return (
                  <ImageUploader
                    inputId="seminarBackground"
                    placeholder={PLACE_HOLDER.CHOOSE_IMAGE}
                    required={true}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFileChange(e);
                    }}
                    name={field.name}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                  />
                );
              }}
            />
          )}
        </Grid2>
        <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
          <CustomTopTitle title={TITLE.SEMINAR_INFO} />
          <CustomizedTextField
            inputId="seminarName"
            name={TEXTFIELD_LABEL.SEMINAR_NAME}
            required={true}
            options={{
              ...register("seminarName", seminarNameValidation),
            }}
            error={errors.seminarName ? true : false}
            helperText={errors?.seminarName?.message}
          />
          <Controller
            control={control}
            name="seminarTime"
            rules={{
              validate: validationSeminarDate,
            }}
            defaultValue={seminarDate}
            render={({ field: { onChange, ...restField }, fieldState }) => (
              <CustomizedDateTimePicker
                label={TEXTFIELD_LABEL.TIME}
                ampm={false}
                formName="seminarTime"
                required={true}
                onChange={(event) => {
                  onChange(event);
                  setSeminarDate(event);
                }}
                fieldState={fieldState}
                {...restField}
              />
            )}
          />
          <CustomizedTextField
            inputId="seminarPlace"
            name={TEXTFIELD_LABEL.SEMINAR_PLACE}
            required={true}
            options={{
              ...register("seminarPlace", seminarPlaceValidation),
            }}
          />

          <Controller
            control={control}
            name="seminarSpeakers"
            defaultValue={[]}
            render={({ field: { value, onChange, ...restField } }) => (
              <AutocompleteInput
                multiple={true}
                label={TEXTFIELD_LABEL.SPEAKER}
                required={true}
                id="autocomplete-speakers"
                options={mentorList}
                getOptionLabel={getOptionLabel}
                renderOption={renderOptionSpeakerAutocomplete}
                onChange={(e, data) => {
                  onChange(data);
                }}
                value={value.id}
                {...restField}
              />
            )}
          />
          <CustomizedTextField
            multiline
            maxRows={3}
            inputId="seminarDescription"
            name={TEXTFIELD_LABEL.SEMINAR_DESCRIPTION}
            required={false}
            optional={true}
            options={{
              ...register("seminarDescription"),
            }}
          />
          <ListFileDisplay items={documents} onRemove={handleRemoveDocuments} />

          <Controller
            name="seminarDocuments"
            control={control}
            defaultValue={documents}
            rules={{ validate: validateFiles }}
            render={({ field }) => {
              return (
                <FileInputIcon
                  onChange={(e) => {
                    field.onChange(e);
                    handleDocumentsChange(e);
                  }}
                  field={field}
                  error={errors.seminarDocuments}
                />
              );
            }}
          />
          {/* <FileInputIcon /> */}

          <div className={`${style.seminarForm__button}`}>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {BUTTON_LABEL.CREATE_SEMINAR}
            </CustomizedButton>
          </div>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default SeminarForm;
