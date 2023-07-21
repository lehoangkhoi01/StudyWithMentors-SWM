import React from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import moment from "moment";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
//----------------
import style from "./SeminarForm.module.scss";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedDateTimePicker from "../../../shared/components/DatetimePicker/CustomizedDateTimePicker";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Button, Checkbox, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AutocompleteInput from "../../../shared/components/AutocompleteInput/AutocompleteInput";
import GlobalBreadcrumbs from "../../../shared/components/Breadcrumbs/GlobalBreadcrumbs";
//-------------------
import {
  seminarNameValidation,
  seminarPlaceValidation,
} from "../../../shared/constants/validationRules";
import {
  validationSeminarDate,
  validationSeminarImage,
  validationSeminarSpeakers,
} from "./seminarValidation";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
  DATE_FORMAT,
  ERROR_MESSAGES,
  LENGTH,
  PLACE_HOLDER,
  TEXTFIELD_LABEL,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";
import {
  BREADCRUMBS_TITLE,
  CREATE_SEMINAR_BREADCRUMBS,
} from "../../../shared/constants/breadcrumbs";
//------------------
import { ROUTES, ROUTES_STATIC } from "../../../shared/constants/navigation";
import { seminarService } from "../../../Services/seminarService";
import { resourceService } from "../../../Services/resourceService";
import { convertBytesToMB } from "../../../Helpers/mathHelper";
import ListFileDisplay from "../../../shared/components/ListFileDisplay/ListFileDisplay";
import FileInputIcon from "../../../shared/components/FileInputIcon/FileInputIcon";
import {
  useCustomAppbar,
  useCustomLoading,
  useFetchSpeakerList,
  useNotification,
} from "../../../Helpers/generalHelper";
import { SEMINAR_DETAIL_VIEW_MODE } from "../../../shared/constants/systemType";
import { useSelector } from "react-redux";
import { selectMentorList } from "../../../Store/slices/mentorSlice";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import UpsertMentorModal from "../../Modal/UpsertMentorModal";
import { convertObjectToArray } from "../../../Helpers/arrayHelper";

const SeminarForm = () => {
  const history = useHistory();
  const { setLoading } = useCustomLoading();
  const { setAppbar } = useCustomAppbar();
  const { setNotification } = useNotification();
  const { getSpeakerList } = useFetchSpeakerList();
  const { id } = useParams();
  const mentors = useSelector(selectMentorList);
  const isFormUpdate = id ? true : false;
  const [isFormDisabled, setFormDisabled] = React.useState(false);
  const [seminarBackground, setSeminarBackground] = React.useState(null);
  const [documents, setDocuments] = React.useState([]);
  const [oldDocuments, setOldDocuments] = React.useState([]);
  const [oldDocumentUrls, setOldDocumentUrls] = React.useState([]);
  const [mentorList, setMentorList] = React.useState([]);
  const [seminarDate, setSeminarDate] = React.useState(
    new Date().setDate(new Date().getDate() + 1) // set tomorrow as default date
  );
  const [seminarDetail, setSeminarDetail] = React.useState(null);
  const [selectedSpeakers, setSelectedSpeakers] = React.useState([]);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seminarBackground: null,
      seminarDocuments: [],
      seminarSpeakers: [],
    },
  });

  const [openAddMentorModal, setOpenAddMentorModal] = React.useState(false);

  const UPDATE_SEMINAR_BREADCRUMBS = [
    {
      title: BREADCRUMBS_TITLE.SEMINAR_LIST,
      route: ROUTES.SEMINAR_LIST,
    },
    {
      title: seminarDetail?.name,
      route: ROUTES_STATIC.SEMINAR_DETAIL + "/" + id,
    },
    {
      title: BREADCRUMBS_TITLE.UPDATE_SEMINAR,
      route: null,
    },
  ];

  const breadcrumbsNavigate = isFormUpdate
    ? UPDATE_SEMINAR_BREADCRUMBS
    : CREATE_SEMINAR_BREADCRUMBS;

  //----------------------------------------------------

  const onFileChange = (newValue) => {
    if (newValue && VALID_IMAGE_FILE_TYPE.indexOf(newValue.type) >= 0) {
      setSeminarBackground(URL.createObjectURL(newValue));
    } else {
      setSeminarBackground(null);
    }
  };

  const handleDocumentsChange = (e) => {
    const files = e.target.files;
    console.log(files);
    let tempDocuments = [...documents];
    tempDocuments = [...tempDocuments, ...Array.from(files)];
    setDocuments(tempDocuments);
  };

  const handleRemoveDocuments = (index) => {
    const tempList = [...documents];
    tempList.splice(index, 1);
    setDocuments(tempList);
  };
  const handleRemoveOldDocuments = (index) => {
    const tempList = [...oldDocuments];
    const tempUrls = [...oldDocumentUrls];
    tempList.splice(index, 1);
    tempUrls.splice(index, 1);
    setOldDocuments(tempList);
    setOldDocumentUrls(tempUrls);
  };

  const onRemoveImage = () => {
    setSeminarBackground(null);
    setValue("seminarBackground", null);
  };

  const getOptionLabel = (option) => {
    return option?.fullName;
  };

  const renderOptionSpeakerAutocomplete = (props, option, { selected }) => {
    return (
      <li {...props} className={`${style.autocomplete__rowDropdown}`}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        <div className={`${style.autocomplete__rowDropdown__userInfo}`}>
          <Typography textAlign="left">{option.fullName}</Typography>
          <Typography variant="caption">{option.email}</Typography>
        </div>
      </li>
    );
  };

  const extractValue = (option) => (option ? option.id : "");

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
    if (isFormUpdate) {
      handleUpdateSeminar(data);
    } else {
      handleCreateSeminar(data);
    }
  };

  const handleCreateSeminar = async (data) => {
    setLoading(true);
    try {
      //Process data before submit
      data.seminarSpeakers = data.seminarSpeakers.map((speaker) => speaker.id);
      data.seminarTime = format(
        data.seminarTime,
        DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
      );
      const imageUrl = await handleUploadImage(data.seminarBackground);
      const attachmentList = await handleUploadAttachments(documents);
      //----------------------------------------
      let requestBody = {
        name: data.seminarName,
        description: data.seminarDescription,
        location: data.seminarPlace,
        imageUrl: imageUrl,
        startTime: data.seminarTime,
        mentorIds: data.seminarSpeakers,
        attachmentUrls: attachmentList.length > 0 ? attachmentList : null,
      };
      const result = await seminarService.create(requestBody);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.CREATE_SEMINAR_SUCCESS,
      });
      history.push(ROUTES_STATIC.SEMINAR_DETAIL + "/" + result.id);
    } catch (error) {
      console.log(error);
      if (error.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSeminar = async (data) => {
    setLoading(true);
    try {
      // Process data before submit
      data.seminarTime = format(
        data.seminarTime,
        DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
      );
      data.seminarSpeakers = data.seminarSpeakers.map((speaker) => speaker.id);

      let imageUrl = null;
      let attachmentUrls = null;
      if (data.seminarBackground) {
        imageUrl = await handleUploadImage(data.seminarBackground);
      } else if (seminarBackground == null && data.seminarBackground == null) {
        imageUrl = "";
      }

      const newAttachmentList = await handleUploadAttachments(documents);
      const totalAttachmentList = [...oldDocumentUrls, ...newAttachmentList];
      if (
        newAttachmentList.length != 0 ||
        oldDocumentUrls.length !== seminarDetail.attachmentUrls
      ) {
        attachmentUrls = [...totalAttachmentList];
      }

      //--------------------------

      let requestBody = {
        name: data.seminarName,
        description: data.seminarDescription,
        location: data.seminarPlace,
        mentorIds: data.seminarSpeakers,
        imageUrl: imageUrl,
        attachmentUrls: attachmentUrls,
        startTime: data.seminarTime,
      };
      await seminarService.update(id, requestBody);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Cập nhật sự kiện thành công",
      });
      history.push(ROUTES_STATIC.SEMINAR_DETAIL + "/" + id);
    } catch (error) {
      console.log(error);
      if (error.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateFiles = () => {
    if (documents.length + oldDocuments.length > LENGTH.FILE_MAX_NUM) {
      return ERROR_MESSAGES.INVALID_SEMINAR_DOCUMENTS;
    }

    for (let i = 0; i < documents.length; i++) {
      if (convertBytesToMB(documents[i].size) > LENGTH.FILE_MAX_SIZE) {
        return ERROR_MESSAGES.INVALID_SEMINAR_DOCUMENTS;
      }
    }
  };

  const onNavigateToList = () => {
    history.push(ROUTES.SEMINAR_LIST);
  };

  const onNavigateToDetail = () => {
    history.push(ROUTES_STATIC.SEMINAR_DETAIL + "/" + id);
  };

  const handleOpenAddMentorModal = () => {
    setOpenAddMentorModal(true);
  };

  const handleCloseMentorModal = () => {
    setOpenAddMentorModal(false);
  };

  React.useEffect(() => {
    const getSeminarDetail = async () => {
      try {
        const seminar = await seminarService.getSeminarDetail(id);
        setSeminarDetail(seminar);
        setSelectedSpeakers(seminar.mentors);
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      }
    };

    if (isFormUpdate) {
      setAppbar(APPBAR_TITLES.SEMINAR_UPDATE);
      getSeminarDetail();
    } else {
      setAppbar(APPBAR_TITLES.SEMINAR_CREATE);
    }
  }, []);

  React.useEffect(() => {
    const fetchMentorList = async () => {
      const mentorResults = await getSpeakerList();
      setMentorList(mentorResults);
    };
    fetchMentorList();
  }, [mentors]);

  React.useEffect(() => {
    if (seminarDetail) {
      setValue("seminarName", seminarDetail.name);
      setValue("seminarPlace", seminarDetail.location);
      setValue("seminarDescription", seminarDetail.description);
      setValue("seminarTime", moment(seminarDetail.startTime).toDate());
      setValue("seminarSpeakers", seminarDetail.mentors);
      setSeminarBackground(seminarDetail.imageLink);
      setOldDocuments(
        seminarDetail.attachments
          ? convertObjectToArray(seminarDetail.attachments)
          : []
      );
      setOldDocumentUrls(seminarDetail.attachmentUrls ?? []);
      if (moment(seminarDetail.startTime).toDate() < new Date()) {
        setFormDisabled(true);
        history.push(ROUTES.NOT_FOUND);
      }
    }
  }, [seminarDetail]);

  return (
    <div className={`${style.seminarForm__container}`}>
      <GlobalBreadcrumbs navigate={breadcrumbsNavigate} />
      <Grid2
        spacing={2}
        container
        className={`${style.seminarForm__gridWrapper}`}
      >
        <form
          className={`${style.seminarForm__form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid2
            xs={12}
            md={6}
            className={`${style.seminarForm__gridContainer}`}
          >
            {seminarBackground ? (
              <div className={`${style.seminarForm__image}`}>
                <img src={seminarBackground} alt="seminar-poster" />
                {!isFormDisabled && (
                  <IconButton
                    aria-label="remove"
                    size="large"
                    className={`${style.seminarForm__iconButton}`}
                    onClick={onRemoveImage}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
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
          <Grid2
            xs={12}
            md={6}
            className={`${style.seminarForm__gridContainer}`}
          >
            <CustomizedTextField
              inputId="seminarName"
              name={TEXTFIELD_LABEL.SEMINAR_NAME}
              required={true}
              options={{ ...register("seminarName", seminarNameValidation) }}
              disabled={isFormDisabled}
              error={errors.seminarName ? true : false}
              helperText={errors?.seminarName?.message}
            />
            <Controller
              control={control}
              name="seminarTime"
              rules={{
                validate: isFormUpdate ? null : validationSeminarDate,
              }}
              defaultValue={seminarDate}
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <CustomizedDateTimePicker
                  label={TEXTFIELD_LABEL.TIME}
                  ampm={false}
                  formName="seminarTime"
                  required={true}
                  disabled={isFormDisabled}
                  onChange={(event) => {
                    onChange(event);
                    setSeminarDate(event);
                  }}
                  disablePast={true}
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
              disabled={isFormDisabled}
              error={errors.seminarPlace ? true : false}
              helperText={errors?.seminarPlace?.message}
            />

            <Controller
              control={control}
              name="seminarSpeakers"
              defaultValue={[]}
              rules={{
                validate: validationSeminarSpeakers,
              }}
              render={({ field }) => (
                <AutocompleteInput
                  multiple={true}
                  disabled={isFormDisabled}
                  label={TEXTFIELD_LABEL.SPEAKER}
                  required={true}
                  id="autocomplete-speakers"
                  options={mentorList}
                  getOptionLabel={getOptionLabel}
                  renderOption={renderOptionSpeakerAutocomplete}
                  error={errors.seminarSpeakers}
                  extractValue={extractValue}
                  selectedValues={selectedSpeakers}
                  setSelectedValues={setSelectedSpeakers}
                  field={field}
                />
              )}
            />
            <Button
              onClick={handleOpenAddMentorModal}
              sx={{ width: "max-content", alignSelf: "flex-end" }}
            >
              Thêm diễn giả mới
            </Button>

            <CustomizedTextField
              multiline
              maxRows={3}
              inputId="seminarDescription"
              name={TEXTFIELD_LABEL.SEMINAR_DESCRIPTION}
              disabled={isFormDisabled}
              required={false}
              optional={true}
              watch={watch("seminarDescription")}
              options={{
                ...register("seminarDescription"),
              }}
            />
            <ListFileDisplay
              mode={
                isFormDisabled
                  ? SEMINAR_DETAIL_VIEW_MODE.VIEW
                  : isFormUpdate
                  ? SEMINAR_DETAIL_VIEW_MODE.UPDATE
                  : SEMINAR_DETAIL_VIEW_MODE.CREATE
              }
              isUpdate={isFormUpdate}
              items={documents}
              oldItems={oldDocuments}
              onRemove={handleRemoveDocuments}
              handleRemoveOldDocuments={handleRemoveOldDocuments}
            />

            {isFormDisabled ? null : (
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
            )}

            <Grid2
              container
              className={`${style.seminarForm__buttonContainer}`}
              spacing={2}
            >
              <Grid2 xs={6} item>
                <CustomizedButton
                  variant="outlined"
                  color="primary600"
                  onClick={isFormUpdate ? onNavigateToDetail : onNavigateToList}
                >
                  {isFormUpdate
                    ? BUTTON_LABEL.CANCEL_EDIT
                    : BUTTON_LABEL.CANCEL_CREATE}
                </CustomizedButton>
              </Grid2>
              <Grid2 xs={6} item>
                <CustomizedButton
                  type="submit"
                  variant="contained"
                  color="primary600"
                >
                  {isFormUpdate
                    ? BUTTON_LABEL.UPDATE_SEMINAR
                    : BUTTON_LABEL.CREATE_SEMINAR}
                </CustomizedButton>
              </Grid2>
            </Grid2>
          </Grid2>
        </form>
      </Grid2>
      <UpsertMentorModal
        openModal={openAddMentorModal}
        onCloseModal={handleCloseMentorModal}
      />
    </div>
  );
};

export default SeminarForm;
