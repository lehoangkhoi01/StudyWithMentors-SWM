import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./AdminMentorList.module.scss";
import {
  ADMIN_TABLE_HEADER,
  BUTTON_LABEL,
  DATE_FORMAT,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  MODAL_DELETE_PROPERTY,
  OTHERS,
  SORT_DIRECTION,
} from "../../shared/constants/common";
import { Button, Checkbox, IconButton, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { handleTimeToDisplay } from "../../Helpers/dateHelper";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";
import DeletePropertyModal from "../Modal/DeletePropertyModal";
import { accountService } from "../../Services/accountService";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";
import UpsertMentorModal from "../Modal/UpsertMentorModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3948AB",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 3,
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

const AdminMentorList = () => {
  const { register, getValues, setValue } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [mentors, setMentors] = useState([]);
  const [originMentors, setOriginMentors] = useState([]);
  const [displayedMentors, setDisplayedMentors] = useState([]);
  const [sortData, setSortData] = useState({
    attribute: null,
    direction: null,
  });
  const [selectedMentorId, setSelectedMentorId] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 1,
  });
  const [openModal, setOpenModal] = useState({
    upsert: false,
    delete: false,
  });
  const [existedData, setExistedData] = useState(null);
  const [deletedMentor, setDeletedMentor] = useState(null);

  useEffect(() => {
    getMentors();
  }, []);

  useEffect(() => {
    onSortTable();
  }, [sortData]);

  useEffect(() => {
    onPaginate(pagination.page);
  }, [mentors]);

  const getMentors = async () => {
    try {
      setLoading(true);
      const mentors = await accountService.getAllMentors();

      adjustMentorList(mentors);
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const adjustMentorList = (mentors) => {
    const updatedMentorList = mentors.map((mentor, index) => {
      return {
        ...mentor,
        number: index + 1,
        createdDate: handleTimeToDisplay(
          mentor.createdDate,
          null,
          DATE_FORMAT.DD_MM_YYYY,
          " -"
        ),
        defaultCreatedDate: mentor.createdDate,
      };
    });

    setMentors([...updatedMentorList]);
    setOriginMentors([...updatedMentorList]);
    onPaginate(1, [...updatedMentorList]);
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
    setMentors((prevValue) => {
      const sortedMentors = newData ?? prevValue;

      sortedMentors.sort((a, b) => {
        if (a[sortData.attribute] > b[sortData.attribute]) {
          return sortData.direction === SORT_DIRECTION.ASC ? -1 : 1;
        }
        if (a[sortData.attribute] < b[sortData.attribute]) {
          return sortData.direction === SORT_DIRECTION.ASC ? 1 : -1;
        }
        return 0;
      });

      return [...sortedMentors];
    });
  };

  const resetDefault = () => {
    setMentors([...originMentors]);
    setSortData({
      attribute: null,
      direction: null,
    });
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

  const onSearchMentor = () => {
    const searchTerm = getValues("searchTerm").toLowerCase().trim();

    let temp = [...originMentors];

    temp = temp.filter((mentor) =>
      mentor.fullName.toLowerCase().includes(searchTerm)
    );

    onSortTable(temp);
  };

  const onSelectMentor = (id) => {
    const selectedIndex = selectedMentorId.indexOf(id);

    if (selectedIndex === -1) {
      setSelectedMentorId((prevValue) => [...prevValue, id]);
    } else {
      setSelectedMentorId((prevValue) => {
        prevValue.splice(selectedIndex, 1);

        return [...prevValue];
      });
    }
  };

  const openUpsertModalHandler = (_, data) => {
    if (data) {
      setExistedData(data);
    }

    setOpenModal({
      upsert: true,
      delete: false,
    });
  };

  const openDeleteModalHandler = (mentor) => {
    if (mentor) {
      setDeletedMentor(mentor);
    }
    setOpenModal({
      upsert: false,
      delete: true,
    });
  };

  const onCloseModal = () => {
    setExistedData(null);
    setOpenModal({
      upsert: false,
      delete: false,
    });
    setDeletedMentor(null);
  };

  const onPaginate = (page, initData) => {
    const { pageSize } = pagination;

    const mentorList = initData ?? mentors;

    let pageNumber = page;

    if (!page && mentorList.length) {
      pageNumber = 1;
    }

    const totalPage = Math.ceil(mentorList.length / pageSize);

    const adjustPage = totalPage >= pageNumber ? pageNumber : totalPage;
    const offset = pageSize * (adjustPage - 1);

    const paginatedMentors = mentorList.slice(offset, pageSize * adjustPage);

    setDisplayedMentors(paginatedMentors);

    setPagination({
      pageSize,
      page: adjustPage,
      totalPage,
    });
  };

  const onDeleteMentors = async () => {
    try {
      setLoading(true);
      if (deletedMentor) {
        await accountService.deleteMentors([deletedMentor.id]);
        setDeletedMentor(null);
      } else {
        await accountService.deleteMentors(selectedMentorId);
        setSelectedMentorId([]);
      }

      getMentors();
    } catch (error) {
      console.log(error);

      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setOpenModal({ upsert: false, delete: false });
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.list__container}>
        <div className={style.list__actions}>
          <CustomizedButton
            variant="outlined"
            color="primary600"
            onClick={openUpsertModalHandler}
          >
            <img src={require("../../assets/icons/Add_Mentor.png")} />
            <p>{BUTTON_LABEL.ADD_MENTOR}</p>
          </CustomizedButton>
          <CustomizedButton
            variant="outlined"
            color="primary600"
            disabled={!selectedMentorId.length}
            onClick={() => openDeleteModalHandler()}
          >
            <img src={require("../../assets/icons/Remove_Mentor.png")} />
            <p>{BUTTON_LABEL.DEACTIVATE_MENTOR}</p>
          </CustomizedButton>
          <CustomizedTextField
            placeholder="Tìm kiếm diễn giả"
            className={style.list__input}
            required={true}
            options={{ ...register("searchTerm") }}
          />
          <CustomizedButton
            variant="contained"
            color="primary600"
            onClick={onSearchMentor}
          >
            <img src={require("../../assets/icons/Search_Icon.png")} />
            <p>Tìm kiếm</p>
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
                <StyledTableCell align="center">
                  {ADMIN_TABLE_HEADER.SELECT}
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  align="center"
                  onClick={() => {
                    updateSort("number");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.NUMBER}</span>
                  {renderSortIcon("number")}
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  onClick={() => {
                    updateSort("fullName");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.NAME}</span>
                  {renderSortIcon("fullName")}
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  onClick={() => {
                    updateSort("email");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.EMAIL}</span>
                  {renderSortIcon("email")}
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  align="center"
                  onClick={() => {
                    updateSort("phoneNum");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.PHONE}</span>
                  {renderSortIcon("phoneNum")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <span>{ADMIN_TABLE_HEADER.PROFILE}</span>
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  align="center"
                  onClick={() => {
                    updateSort("defaultCreatedDate");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.CREATED_DATE}</span>
                  {renderSortIcon("defaultCreatedDate")}
                </StyledTableCell>
                <StyledTableCell
                  className={style.list__header_sortable}
                  align="center"
                  onClick={() => {
                    updateSort("status");
                  }}
                >
                  <span>{ADMIN_TABLE_HEADER.STATUS}</span>
                  {renderSortIcon("status")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ADMIN_TABLE_HEADER.ACTION}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedMentors.map((row) => (
                <StyledTableRow key={`ROW_INDEX_${row.id}`}>
                  <StyledTableCell align="center">
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#3948AB",
                        },
                      }}
                      checked={selectedMentorId.includes(row.id)}
                      onChange={() => {
                        onSelectMentor(row.id);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.number}</StyledTableCell>
                  <StyledTableCell>{row.fullName}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phoneNum}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`#`}>CV diễn giả</Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.createdDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {MENTOR_STATUS[row.status]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        openUpsertModalHandler(null, row);
                      }}
                    >
                      <img
                        className={style.list__table_icon}
                        src={require("../../assets/icons/Table_Edit.png")}
                      />
                    </IconButton>
                    <IconButton
                      disabled={row.status !== MENTOR_STATUS.ACTIVATED}
                      onClick={() => {
                        openDeleteModalHandler(row);
                      }}
                    >
                      <img
                        className={style.list__table_icon}
                        src={require("../../assets/icons/Table_Delete.png")}
                      />
                    </IconButton>
                  </StyledTableCell>
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
        title={deletedMentor?.fullName ?? OTHERS.ALL_MENTOR}
        onDeleteProperty={onDeleteMentors}
        type={MODAL_DELETE_PROPERTY.DEACTIVATE}
      />
      <UpsertMentorModal
        openModal={openModal.upsert}
        onCloseModal={onCloseModal}
        existedData={existedData}
        getMentors={getMentors}
      />
    </>
  );
};

export default AdminMentorList;
