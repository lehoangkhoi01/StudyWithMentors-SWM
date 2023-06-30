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
  ERROR_MESSAGES,
  MENTOR_STATUS,
  MODAL_DELETE_PROPERTY,
  SORT_DIRECTION,
} from "../../constants/common";
import { Button, IconButton, Pagination } from "@mui/material";
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

const CustomizedTable = (props) => {
  const { register, getValues, setValue } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const [data, setData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [sortData, setSortData] = useState({
    attribute: null,
    direction: null,
  });
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
  const [deletedData, setDeletedData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    onSortTable();
  }, [sortData]);

  useEffect(() => {
    onPaginate(pagination.page);
  }, [data]);

  const getData = async () => {
    try {
      setLoading(true);

      const responseData = await props.getData();

      setData([...responseData]);
      setOriginData([...responseData]);
      onPaginate(1, [...responseData]);
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

      sortedData.sort((a, b) => {
        if (a[sortData.attribute] > b[sortData.attribute]) {
          return sortData.direction === SORT_DIRECTION.ASC ? -1 : 1;
        }
        if (a[sortData.attribute] < b[sortData.attribute]) {
          return sortData.direction === SORT_DIRECTION.ASC ? 1 : -1;
        }
        return 0;
      });

      return [...sortedData];
    });
  };

  const resetDefault = () => {
    setData([...originData]);
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

  const onSearch = () => {
    const searchTerm = getValues("searchTerm").toLowerCase().trim();

    let copyData = [...originData];

    const filterdData = props.filterData(copyData, searchTerm);

    onSortTable(filterdData);
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

  const openDeleteModalHandler = (item) => {
    if (item) {
      setDeletedData(item);
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
    setDeletedData(null);
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

      getData();
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
    <div>
      <div className={style.list__container}>
        <div className={style.list__actions}>
          <CustomizedButton
            variant="outlined"
            color="primary600"
            onClick={openUpsertModalHandler}
          >
            <img src={require("../../../assets/icons/Add_Mentor.png")} />
            <p>{BUTTON_LABEL.ADD_MENTOR}</p>
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
                <StyledTableCell align="center">
                  {ADMIN_TABLE_HEADER.ACTION}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((row) => (
                <StyledTableRow key={`ROW_INDEX_${row.id}`}>
                  {props.headerTable.map((header, index) => (
                    <StyledTableCell
                      key={`CELL_TABLE_${index}`}
                      align={header.center ? "center" : "left"}
                    >
                      {header.link && (
                        <Link to={row.link}>
                          {row.linkName ?? "CV diễn giả"}
                        </Link>
                      )}
                      {!header.link && `${row[header.property]}`}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        openUpsertModalHandler(null, row);
                      }}
                    >
                      <img
                        className={style.list__table_icon}
                        src={require("../../../assets/icons/Table_Edit.png")}
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
                        src={require("../../../assets/icons/Table_Delete.png")}
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
        title={deletedData?.fullName}
        onDeleteProperty={onDeleteData}
        type={MODAL_DELETE_PROPERTY.DEACTIVATE}
      />
      <UpsertMentorModal
        openModal={openModal.upsert}
        onCloseModal={onCloseModal}
        existedData={existedData}
        onSuccess={getData}
      />
    </div>
  );
};

export default CustomizedTable;