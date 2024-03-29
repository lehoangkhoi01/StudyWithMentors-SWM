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
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
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
  validateSeminarDescription,
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
import {
  SEMINAR_DETAIL_VIEW_MODE,
  SYSTEM_ROLE,
} from "../../../shared/constants/systemType";
import { useSelector } from "react-redux";
import { selectMentorList } from "../../../Store/slices/mentorSlice";
import { APPBAR_TITLES } from "../../../shared/constants/appbarTitles";
import UpsertMentorModal from "../../Modal/UpsertMentorModal";
import { convertObjectToArray } from "../../../Helpers/arrayHelper";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { departmentService } from "../../../Services/departmentService";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SeminarForm = () => {
  const history = useHistory();
  const { setLoading } = useCustomLoading();
  const { setAppbar } = useCustomAppbar();
  const { setNotification } = useNotification();
  const { getSpeakerList } = useFetchSpeakerList();
  const { id } = useParams();
  const mentors = useSelector(selectMentorList);
  //--------------------------------------
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
  const [seminarEndDate, setSeminarEndDate] = React.useState(
    moment(seminarDate).add(2, "hours").toDate()
  );
  const [seminarDetail, setSeminarDetail] = React.useState(null);
  const [selectedSpeakers, setSelectedSpeakers] = React.useState([]);

  const [departmentList, setDepartmentList] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState(null);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seminarBackground: null,
      seminarDocuments: [],
      seminarSpeakers: [],
    },
  });

  const userInfo = useSelector(selectUserInfo);

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

  const validateSeminarEndDate = (value) => {
    if (!value || value.length === 0) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (value <= watch("seminarTime")) {
      return ERROR_MESSAGES.INVALID_SEMINAR_END_DATE;
    }
    if (value.toString() === "Invalid Date") {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
    const startDate = new Date(watch("seminarTime")).setHours(0, 0, 0, 0);
    const endDate = new Date(value).setHours(0, 0, 0, 0);
    if (startDate !== endDate) {
      return "Ngày bắt đầu và kết thúc của hội thảo phải cùng 1 ngày.";
    }
  };

  const onFileChange = (newValue) => {
    if (newValue && VALID_IMAGE_FILE_TYPE.indexOf(newValue.type) >= 0) {
      setSeminarBackground(URL.createObjectURL(newValue));
    } else {
      setSeminarBackground(null);
    }
  };

  const handleDocumentsChange = (e) => {
    const files = e.target.files;
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
      data.seminarEndTime = format(
        data.seminarEndTime,
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
        endTime: data.seminarEndTime,
        mentorIds: data.seminarSpeakers,
        attachmentUrls: attachmentList.length > 0 ? attachmentList : null,
      };
      if (userInfo.role === SYSTEM_ROLE.ADMIN) {
        requestBody.departmentId = selectedDepartment.id;
      }
      const result = await seminarService.create(requestBody);
      setNotification({
        isOpen: true,
        type: "success",
        message: COMMON_MESSAGE.CREATE_SEMINAR_SUCCESS,
      });
      history.push(ROUTES_STATIC.SEMINAR_DETAIL + "/" + result.id);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Tạo hội thảo thất bại. Vui lòng thử lại sau.",
      });
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
      data.seminarEndTime = format(
        data.seminarEndTime,
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
        endTime: data.seminarEndTime,
      };
      if (userInfo.role === SYSTEM_ROLE.ADMIN) {
        requestBody.departmentId = selectedDepartment.id;
      }
      await seminarService.update(id, requestBody);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Cập nhật hội thảo thành công",
      });
      history.push(ROUTES_STATIC.SEMINAR_DETAIL + "/" + id);
    } catch (error) {
      if (error.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: "Cập nhật hội thảo thất bại. Vui lòng thử lại sau.",
        });
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

  const getDepartmentList = async () => {
    try {
      setLoading(true);
      let result = await departmentService.getDepartments();
      result = result.map((dep) => ({
        id: dep.id,
        name: dep.name,
      }));
      setDepartmentList(result);
    } catch (error) {
      history.push(ROUTES.SERVER_ERROR);
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const onDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  React.useEffect(() => {
    if (userInfo?.role === SYSTEM_ROLE.STUDENT) {
      history.push(ROUTES.NOT_FOUND);
      return;
    }

    const getSeminarDetail = async () => {
      try {
        const seminar = await seminarService.getSeminarDetail(id);
        if (
          userInfo?.role === SYSTEM_ROLE.STAFF &&
          seminar.department?.id !== userInfo.departmentId
        ) {
          history.push(ROUTES.NOT_FOUND);
          return;
        }
        if (userInfo?.role === SYSTEM_ROLE.MENTOR) {
          const mentorIdList = seminar?.mentors.map((mentor) => mentor.id);
          if (!mentorIdList.includes(userInfo.accountId)) {
            history.push(ROUTES.NOT_FOUND);
            return;
          }
        }

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
    getDepartmentList();
  }, []);

  React.useEffect(() => {
    const fetchMentorList = async () => {
      const mentorResults = await getSpeakerList();
      setMentorList(mentorResults);
    };
    fetchMentorList();
  }, [mentors]);

  React.useEffect(() => {
    if (seminarDetail && departmentList.length > 0) {
      setValue("seminarName", seminarDetail.name);
      setValue("seminarPlace", seminarDetail.location);
      setValue("seminarDescription", seminarDetail.description);
      setValue("seminarTime", moment(seminarDetail.startTime).toDate());
      setValue("seminarEndTime", moment(seminarDetail.endTime).toDate());
      setValue("seminarSpeakers", seminarDetail.mentors);
      setSeminarBackground(seminarDetail.imageLink);
      setOldDocuments(
        seminarDetail.attachments
          ? convertObjectToArray(seminarDetail.attachments)
          : []
      );
      setOldDocumentUrls(seminarDetail.attachmentUrls ?? []);
      setSelectedDepartment(
        departmentList.find((dep) => dep.id === seminarDetail.department.id)
      );

      if (
        moment(seminarDetail.startTime).toDate() < new Date() ||
        userInfo?.role === SYSTEM_ROLE.MENTOR
      ) {
        setFormDisabled(true);
      }
    } else if (!seminarDetail && departmentList.length > 0) {
      setSelectedDepartment(departmentList[0]);
    }
  }, [seminarDetail, departmentList]);

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
                validate: isFormDisabled ? null : validationSeminarDate,
              }}
              defaultValue={seminarDate}
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <CustomizedDateTimePicker
                  label={TEXTFIELD_LABEL.START_TIME}
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
            <Controller
              control={control}
              name="seminarEndTime"
              rules={{
                validate: isFormDisabled ? null : validateSeminarEndDate,
              }}
              defaultValue={seminarEndDate}
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <CustomizedDateTimePicker
                  label={TEXTFIELD_LABEL.END_TIME}
                  ampm={false}
                  formName="seminarEndTime"
                  required={true}
                  disabled={isFormDisabled}
                  onChange={(event) => {
                    onChange(event);
                    setSeminarEndDate(event);
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
            {userInfo.role === SYSTEM_ROLE.ADMIN && (
              <FormControl style={{ width: "100%" }}>
                <CustomizedSelect
                  inputId="department"
                  isMultipleSelect={false}
                  items={departmentList}
                  value={selectedDepartment}
                  required={true}
                  name="Phòng ban"
                  MenuProps={MenuProps}
                  disabled={isFormDisabled}
                  onChange={onDepartmentChange}
                />
              </FormControl>
            )}

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

            <Controller
              control={control}
              name="seminarDescription"
              rules={{
                validate: isFormDisabled ? null : validateSeminarDescription,
              }}
              render={({ fieldState }) => (
                <CustomizedTextField
                  inputId="seminarDescription"
                  name={TEXTFIELD_LABEL.SEMINAR_DESCRIPTION}
                  disabled={isFormDisabled}
                  required={false}
                  optional={true}
                  isRichText={true}
                  fieldState={fieldState}
                  initData={getValues("seminarDescription")}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue("seminarDescription", data);
                  }}
                />
              )}
            />

            <ListFileDisplay
              mode={
                isFormUpdate
                  ? SEMINAR_DETAIL_VIEW_MODE.UPDATE
                  : SEMINAR_DETAIL_VIEW_MODE.CREATE
              }
              isUpdate={isFormUpdate}
              items={documents}
              oldItems={oldDocuments}
              onRemove={handleRemoveDocuments}
              handleRemoveOldDocuments={handleRemoveOldDocuments}
            />

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
