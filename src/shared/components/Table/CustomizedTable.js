import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./CustomizedTable.module.scss";
import {
  ADMIN_TABLE_HEADER,
  BUTTON_LABEL,
  COMMON_MESSAGE,
  CONFIRM_TOPIC_MODAL,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  MODAL_DELETE_PROPERTY,
  OTHERS,
  SORT_DIRECTION,
  TABLE_TYPE,
  TOPIC_TABLE,
  TRANSLATED_TABLE_TYPE,
  UPSERT_MENTOR,
  UPSERT_STAFF,
} from "../../constants/common";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CustomizedButton from "../Button/CustomizedButton";
import CustomizedTextField from "../TextField/CustomizedTextField";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import DeletePropertyModal from "../../../Components/Modal/DeletePropertyModal";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import UpsertMentorModal from "../../../Components/Modal/UpsertMentorModal";
import ActivePropertyModal from "../../../Components/Modal/ActivePropertyModal";
import {
  ACTIVE_ACTION,
  BOOKING_DETAIL_ACTION,
  CONFIRM_ACTION,
  DEACTIVATE_ACTION,
  DELETE_ACTION,
  EXTERNAL_ACTION,
  SEND_INVITATION,
  UPSERT_ACTION,
  VIEW_DETAIL,
} from "../../constants/actionType";
import AddTopicModal from "../../../Components/Modal/AddTopic/AddTopicModal";
import ConfirmTopicModal from "../../../Components/Modal/ConfirmTopic/ConfirmTopicModal";
import UpsertField from "../../../Components/Modal/UpsertField/UpsertField";
import UpsertCategory from "../../../Components/Modal/UpsertCategory/UpsertCategory";
import UpsertDepartment from "../../../Components/Modal/UpsertDepartment/UpsertDepartment";
import UpsertStaff from "../../../Components/Modal/UpsertStaff/UpsertStaff";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../constants/systemType";
import CustomizedSelect from "../Select/CustomizedSelect";
import { deepCloneArray } from "../../../Helpers/arrayHelper";
import TopicDetailModal from "../../../Components/Modal/TopicDetail/TopicDetailModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3948AB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingBlock: 3,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DEFAULT_OPEN_MODAL = {
  upsert: false,
  delete: false,
  active: false,
  confirm: false,
  detail: false,
};

const CustomizedTable = (props) => {
  const { register, getValues, setValue } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [data, setData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [sortData, setSortData] = useState({
    attribute: props.defaultSort ? props.defaultSort : null,
    direction: props.defaultSort ? SORT_DIRECTION.DESC : null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 1,
  });
  const [openModal, setOpenModal] = useState({ DEFAULT_OPEN_MODAL });
  const [existedData, setExistedData] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [anchorElData, setAnchorElData] = useState({
    anchorEl: null,
    index: -1,
  });
  const [confirmType, setConfirmType] = useState(null);
  const [filterItem, setFilterItem] = useState(
    props.selectItems ? props.selectItems[0] : null
  );
  const [detailItem, setDetailItem] = useState(null);

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    onSortTable();
  }, [sortData]);

  useEffect(() => {
    onPaginate(pagination.page);
  }, [data]);

  useEffect(() => {
    if (originData) {
      setData([...originData]);
      onPaginate(1, [...originData]);
    }
  }, [originData]);

  const getData = async () => {
    try {
      setLoading(true);

      const responseData = await props.getData();

      setOriginData([...responseData]);

      onCloseModal();
      setLoading(false);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const open = (index) => {
    if (Boolean(anchorElData.anchorEl) && index === anchorElData.index) {
      return true;
    }

    return false;
  };

  const handleClick = (event, index) => {
    setAnchorElData({
      anchorEl: event.currentTarget,
      index,
    });
  };

  const handleClose = () => {
    setAnchorElData({
      anchorEl: null,
      index: -1,
    });
  };

  const updateSort = (att) => {
    if (sortData.attribute === att) {
      setSortData({
        ...sortData,
        direction:
          sortData.direction === SORT_DIRECTION.ASC
            ? SORT_DIRECTION.DESC
            : SORT_DIRECTION.ASC,
      });
    } else {
      setSortData({
        attribute: att,
        direction: SORT_DIRECTION.ASC,
      });
    }
  };

  const onSortTable = (newData) => {
    setData((prevValue) => {
      const sortedData = newData ?? prevValue;
      const sortInfo = {
        ...sortData,
        attribute: sortData.attribute === "time" ? "defaultTime" : sortData.attribute
      }

      sortedData.sort((a, b) => {
        if (a[sortInfo.attribute]?.toLowerCase().trim() > b[sortInfo.attribute]?.toLowerCase().trim()) {
          return sortInfo.direction === SORT_DIRECTION.ASC ? -1 : 1;
        }
        if (a[sortInfo.attribute]?.toLowerCase().trim() < b[sortInfo.attribute]?.toLowerCase().trim()) {
          return sortInfo.direction === SORT_DIRECTION.ASC ? 1 : -1;
        }
        return 0;
      });

      return [...sortedData];
    });
  };

  const resetDefault = () => {
    setData([...originData]);
    setFilterItem(props.selectItems ? props.selectItems[0] : null);

    if (props.defaultSort) {
      setSortData({
        attribute: props.defaultSort,
        direction: SORT_DIRECTION.DESC,
      });
    } else {
      setSortData({
        attribute: null,
        direction: null,
      });
    }

    setValue("searchTerm", "");
  };

  const renderSortIcon = (att) => {
    if (att !== sortData.attribute) {
      return;
    }

    if (sortData.direction === SORT_DIRECTION.ASC) {
      return (
        <div className={style.list__sortIcon}>
          <ExpandMoreIcon />
        </div>
      );
    }

    if (sortData.direction === SORT_DIRECTION.DESC) {
      return (
        <div className={style.list__sortIcon}>
          <ExpandLessIcon />
        </div>
      );
    }
  };

  const onSearch = () => {
    const searchTerm = getValues("searchTerm").toLowerCase().trim();

    let copyData = deepCloneArray(originData);

    const filterdData = props.filterData(copyData, searchTerm);

    onSortTable(filterdData);
  };

  const openUpsertModalHandler = (_, data) => {
    if (props.overdrivedAddingAcion) {
      props.overdrivedAddingAcion();

      return;
    }

    if (data) {
      setExistedData(data);
    }

    setOpenModal({
      ...DEFAULT_OPEN_MODAL,
      upsert: true,
    });
  };

  const openDeleteModalHandler = (item) => {
    if (item) {
      setDeletedData(item);
    }
    setOpenModal({
      ...DEFAULT_OPEN_MODAL,
      delete: true,
    });
  };

  const openConfirmModalHandler = (data, type) => {
    if (data) {
      setExistedData(data);
    }

    setOpenModal({
      ...DEFAULT_OPEN_MODAL,
      confirm: true,
    });

    setConfirmType(type);
  };

  const openDetailModalHandler = (data) => {
    setDetailItem(data);
    setOpenModal({
      ...DEFAULT_OPEN_MODAL,
      detail: true,
    });
  };

  const onCloseModal = () => {
    setExistedData(null);
    setOpenModal(DEFAULT_OPEN_MODAL);
    setDeletedData(null);
    setConfirmType(null);
    handleClose();
  };

  const onPaginate = (page, initData) => {
    const { pageSize } = pagination;

    const itemList = initData ?? data;

    let pageNumber = page;

    if (!page && itemList.length) {
      pageNumber = 1;
    }

    const totalPage = Math.ceil(itemList.length / pageSize);

    const adjustPage = totalPage >= pageNumber ? pageNumber : totalPage;
    const offset = pageSize * (adjustPage - 1);

    const paginatedData = itemList.slice(offset, pageSize * adjustPage);

    setDisplayedData(paginatedData);

    setPagination({
      pageSize,
      page: adjustPage,
      totalPage,
    });
  };

  const onDeleteData = async () => {
    try {
      setLoading(true);
      if (deletedData) {
        await props.onDelete([deletedData.id]);
        setDeletedData(null);
      }

      setTimeout(async () => {
        handleSuccess();
        setActiveData(null);

        setLoading(false);
      }, 500);
    } catch (error) {
      console.log("ERRROR")
      if (props.type) {
        setNotification({
          isOpen: true,
          type: "error",
          message:
            `${ERROR_MESSAGES.CAN_NOT_DELETE} ${TRANSLATED_TABLE_TYPE[props.type]} ${OTHERS.THIS}.`,
        });
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMENT_ERROR,
        });
      }
      setLoading(false);
    } finally {
      setOpenModal({
        upsert: false,
        delete: false,
        active: false,
        confirm: false,
        detail: false,
      });
    }
  };

  const openActiveModalHandler = (item) => {
    if (item) {
      setActiveData(item);
      setOpenModal({
        upsert: false,
        delete: false,
        active: true,
        confirm: false,
        detail: false,
      });
    }
  };

  const onActiveData = async () => {
    try {
      setLoading(true);
      if (activeData) {
        await props.onActive(activeData.id, {
          status: "ACTIVATED",
        });
      }

      setTimeout(async () => {
        handleSuccess();
        setActiveData(null);

        setLoading(false);
      }, 500);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });

      setLoading(false);
    } finally {
      setOpenModal({
        upsert: false,
        delete: false,
        active: false,
        confirm: false,
        detail: false,
      });
    }
  };

  const onSelectFilter = (event) => {
    const {
      target: { value },
    } = event;

    let copyData = deepCloneArray(originData);

    setFilterItem(value);
    const filteredList = props.onFilterBySelect(copyData, value.name);
    onSortTable(filteredList);
  };

  const getAddButtonLabel = () => {
    switch (props.type) {
      case TABLE_TYPE.MENTOR:
        return BUTTON_LABEL.ADD_MENTOR;
      case TABLE_TYPE.TOPIC:
        return BUTTON_LABEL.ADD_TOPIC;
      case TABLE_TYPE.FIELD:
        return BUTTON_LABEL.ADD_FIELD;
      case TABLE_TYPE.CATEGORY:
        return BUTTON_LABEL.ADD_CATEGORY;
      case TABLE_TYPE.DEPARTMENT:
        return BUTTON_LABEL.ADD_DEPARTMENT;
      case TABLE_TYPE.STAFF:
        return BUTTON_LABEL.ADD_STAFF;
      case TABLE_TYPE.SEMINAR:
        return BUTTON_LABEL.ADD_SEMINAR;
      default:
        return "";
    }
  };

  const getSearchButtonLabel = () => {
    switch (props.type) {
      case TABLE_TYPE.MENTOR:
        return BUTTON_LABEL.SEARCH_MENTOR;
      case TABLE_TYPE.TOPIC:
        return BUTTON_LABEL.SEARCH_TOPIC;
      case TABLE_TYPE.FIELD:
        return BUTTON_LABEL.SEARCH_FIELD;
      case TABLE_TYPE.CATEGORY:
        return BUTTON_LABEL.SEARCH_CATEGORY;
      case TABLE_TYPE.DEPARTMENT:
        return BUTTON_LABEL.SEARCH_DEPARTMENT;
      case TABLE_TYPE.STAFF:
        return BUTTON_LABEL.SEARCH_STAFF;
      default:
        return "";
    }
  };

  const handleSuccess = async () => {
    await getData();
    setNotification({
      isOpen: true,
      type: "success",
      message: COMMON_MESSAGE.UPDATE_SUCCESS
    });
  }

  return (
    <div>
      <div className={style.list__container}>
        <div className={style.list__actions}>
          {!props.hideAddingAction && (
            <CustomizedButton
              variant="outlined"
              color="primary600"
              onClick={openUpsertModalHandler}
            >
              <img src={require("../../../assets/icons/Add_Mentor.png")} />
              <p>{getAddButtonLabel()}</p>
            </CustomizedButton>
          )}
          <CustomizedTextField
            placeholder={getSearchButtonLabel()}
            className={style.list__input}
            required={true}
            options={{ ...register("searchTerm") }}
          />
          {props.selectItems && props.onFilterBySelect && (
            <CustomizedSelect
              inputId="filterItem"
              items={props.selectItems}
              value={filterItem}
              onChange={onSelectFilter}
              renderValue={(selected) => selected.name}
              placeholder={TOPIC_TABLE.STATUS}
              name={TOPIC_TABLE.STATUS}
            />
          )}

          <CustomizedButton
            variant="contained"
            color="primary600"
            onClick={onSearch}
          >
            <img src={require("../../../assets/icons/Search_Icon.png")} />
            <p>{BUTTON_LABEL.SEARCH}</p>
          </CustomizedButton>
          <Button
            variant="text"
            onClick={resetDefault}
            className={`${style.filterSection__linkButton}`}
          >
            {BUTTON_LABEL.DEFAULT}
          </Button>
        </div>
        <TableContainer component={Paper} className={style.list__table}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow className={style.list__header}>
                {props.headerTable.map((header, index) => (
                  <StyledTableCell
                    key={`TABLE_HEADER_${index}`}
                    className={
                      header.sortable ? style.list__header_sortable : ""
                    }
                    align={header.center ? "center" : "left"}
                    onClick={() => {
                      if (header.sortable) {
                        updateSort(header.property);
                      }
                    }}
                  >
                    <span>{header.name}</span>
                    {header.sortable && renderSortIcon(header.property)}
                  </StyledTableCell>
                ))}
                {props.actionItems && (
                  <StyledTableCell align="center">
                    {ADMIN_TABLE_HEADER.ACTION}
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((row, rowIndex) => (
                <StyledTableRow key={`ROW_INDEX_${row.id}`}>
                  {props.headerTable.map((header, index) => (
                    <StyledTableCell
                      key={`CELL_TABLE_${index}`}
                      align={header.center ? "center" : "left"}
                    >
                      {header.link &&
                        (row.translatedStatus === MENTOR_STATUS.ACTIVATED ? (
                          <Link to={row.link}>
                            {row.linkName ?? "Hồ sơ diễn giả"}
                          </Link>
                        ) : (
                          <Link
                            to={row.link}
                            className={style.list__table_disabledLink}
                          >
                            {"Chưa có dữ liệu"}
                          </Link>
                        ))}
                      {!header.link && `${row[header.property]}`}
                    </StyledTableCell>
                  ))}
                  {props.actionItems && (
                    <StyledTableCell align="center">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          handleClick(e, rowIndex);
                        }}
                        className={style.list__table_dropdown_icon}
                      >
                        <img
                          src={require("../../../assets/icons/Edit_Mentor.png")}
                        />
                      </Button>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={
                          anchorElData.index === rowIndex
                            ? anchorElData.anchorEl
                            : null
                        }
                        open={open(rowIndex)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        className={style.list__table_dropdown}
                      >
                        {props.actionItems.map((actionItem, index) => {
                          switch (actionItem.action) {
                            case UPSERT_ACTION:
                              return (
                                (!actionItem.rule || actionItem.rule(row)) && (
                                  <MenuItem
                                    key={`MENU_ITEM_${index}`}
                                    onClick={() => {
                                      return openUpsertModalHandler(null, row);
                                    }}
                                  >
                                    <img src={actionItem.imgSrc} />
                                    <span>{actionItem.label}</span>
                                  </MenuItem>
                                )
                              );

                            case DEACTIVATE_ACTION:
                              return (
                                userInfo?.role === SYSTEM_ROLE.ADMIN &&
                                row.translatedStatus ===
                                MENTOR_STATUS.ACTIVATED && (
                                  <MenuItem
                                    key={`MENU_ITEM_${index}`}
                                    onClick={() => {
                                      return openDeleteModalHandler(row);
                                    }}
                                  >
                                    <img src={actionItem.imgSrc} />
                                    <span>{actionItem.label}</span>
                                  </MenuItem>
                                )
                              );

                            case DELETE_ACTION:
                              return (
                                <MenuItem
                                  key={`MENU_ITEM_${index}`}
                                  onClick={() => {
                                    return openDeleteModalHandler(row);
                                  }}
                                >
                                  <img src={actionItem.imgSrc} />
                                  <span>{actionItem.label}</span>
                                </MenuItem>

                              );

                            case ACTIVE_ACTION:
                              return (
                                userInfo?.role === SYSTEM_ROLE.ADMIN &&
                                row.translatedStatus ===
                                MENTOR_STATUS.INVALIDATE && (
                                  <MenuItem
                                    key={`MENU_ITEM_${index}`}
                                    onClick={() => {
                                      return openActiveModalHandler(row);
                                    }}
                                  >
                                    <img src={actionItem.imgSrc} />
                                    <span>{actionItem.label}</span>
                                  </MenuItem>
                                )
                              );

                            case CONFIRM_ACTION:
                              return (
                                (!actionItem.rule || actionItem.rule(row)) && (
                                  <MenuItem
                                    key={`MENU_ITEM_${index}`}
                                    onClick={() => {
                                      return openConfirmModalHandler(
                                        row,
                                        actionItem.label ===
                                          CONFIRM_TOPIC_MODAL.SHOW
                                          ? CONFIRM_TOPIC_MODAL.ACCEPT
                                          : actionItem.label
                                      );
                                    }}
                                  >
                                    <img src={actionItem.imgSrc} />
                                    <span>{actionItem.label}</span>
                                  </MenuItem>
                                )
                              );
                            case BOOKING_DETAIL_ACTION:
                              return (
                                <MenuItem
                                  key={`MENU_ITEM_${index}`}
                                  onClick={() => {
                                    actionItem.functionAction(row);
                                  }}
                                >
                                  <img src={actionItem.imgSrc} />
                                  <span>{actionItem.label}</span>
                                </MenuItem>
                              );
                            case VIEW_DETAIL:
                              return (
                                <MenuItem
                                  key={`MENU_ITEM_${index}`}
                                  onClick={() => {
                                    openDetailModalHandler(row);
                                  }}
                                >
                                  <img src={actionItem.imgSrc} />
                                  <span>{actionItem.label}</span>
                                </MenuItem>
                              );
                            case SEND_INVITATION:
                              return (
                                (!actionItem.rule || actionItem.rule(row) && <MenuItem
                                  key={`MENU_ITEM_${index}`}
                                  onClick={() => {
                                    actionItem.functionAction(row);
                                  }}
                                >
                                  <img src={actionItem.imgSrc} />
                                  <span>{actionItem.label}</span>
                                </MenuItem>
                                ));

                            case EXTERNAL_ACTION:
                              return (
                                <MenuItem
                                  key={`MENU_ITEM_${index}`}
                                  onClick={() => {
                                    actionItem.functionAction(row);
                                  }}
                                >
                                  <img src={actionItem.imgSrc} />
                                  <span>{actionItem.label}</span>
                                </MenuItem>
                              );

                            default:
                              return;
                          }
                        })}
                      </Menu>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className={style.list__pagination}
          count={pagination.totalPage}
          variant="outlined"
          shape="rounded"
          page={pagination.page}
          onChange={(_, page) => {
            onPaginate(page);
          }}
        />
      </div>
      <DeletePropertyModal
        openModal={openModal.delete}
        onCloseModal={onCloseModal}
        title={deletedData?.fullName ?? deletedData?.name}
        onDeleteProperty={onDeleteData}
        type={
          (props.type === TABLE_TYPE.CATEGORY || props.type === TABLE_TYPE.FIELD || props.type === TABLE_TYPE.DEPARTMENT) ? MODAL_DELETE_PROPERTY.DELETE :
            MODAL_DELETE_PROPERTY.DEACTIVATE}
      />
      <ActivePropertyModal
        openModal={openModal.active}
        onCloseModal={onCloseModal}
        title={activeData?.fullName}
        onActive={onActiveData}
      />
      <UpsertMentorModal
        openModal={openModal.upsert && props.type === TABLE_TYPE.MENTOR}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
        title={
          existedData ? UPSERT_MENTOR.EDIT_MENTOR : UPSERT_MENTOR.ADD_MENTOR
        }
      />
      <AddTopicModal
        openModal={openModal.upsert && props.type === TABLE_TYPE.TOPIC}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
      />
      <UpsertField
        openModal={openModal.upsert && props.type === TABLE_TYPE.FIELD}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
      />
      <UpsertCategory
        openModal={openModal.upsert && props.type === TABLE_TYPE.CATEGORY}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
      />
      <UpsertDepartment
        openModal={openModal.upsert && props.type === TABLE_TYPE.DEPARTMENT}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
      />
      <ConfirmTopicModal
        type={confirmType}
        title={existedData?.name}
        openModal={openModal.confirm}
        existedData={existedData}
        onCloseModal={onCloseModal}
        onSuccess={handleSuccess}
      />
      <UpsertStaff
        openModal={openModal.upsert && props.type === TABLE_TYPE.STAFF}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={handleSuccess}
        title={existedData ? UPSERT_STAFF.EDIT_STAFF : UPSERT_STAFF.ADD_STAFF}
        allStaffs={originData}
      />
      <TopicDetailModal
        openModal={openModal.detail}
        onCloseModal={onCloseModal}
        data={detailItem}
        title={existedData ? UPSERT_STAFF.EDIT_STAFF : UPSERT_STAFF.ADD_STAFF}
      />
    </div>
  );
};

export default CustomizedTable;
