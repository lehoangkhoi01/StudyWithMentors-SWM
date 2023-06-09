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

const DUMMY_DATA = [
  {
    id: 0,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 1,
    name: "Nguyễn Văn B",
    email: "nguyenvanb@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 2,
    name: "Nguyễn Văn C",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 5,
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 7,
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 8,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 9,
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 10,
    name: "Nguyễn Văn B",
    email: "nguyenvanb@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 11,
    name: "Nguyễn Văn C",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
  {
    id: 12,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Đang chờ",
  },
  {
    id: 13,
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    phone: "0982 123 456",
    createAt: "2023-03-23 07:00:00",
    status: "Hoạt động",
  },
];

const AdminMentorList = () => {
  const { register, getValues, setValue } = useForm();

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

  const adjustMentorList = (mentors) => {
    const updatedMentorList = mentors.map((mentor, index) => {
      return {
        ...mentor,
        number: index + 1,
        createAt: handleTimeToDisplay(
          mentor.createAt,
          null,
          DATE_FORMAT.DD_MM_YYYY,
          " -"
        ),
        defaultCreateAt: mentor.createAt,
      };
    });

    setMentors([...updatedMentorList]);
    setOriginMentors([...updatedMentorList]);
    onPaginate(1, [...updatedMentorList]);
  };

  useEffect(() => {
    adjustMentorList(DUMMY_DATA);
  }, []);

  useEffect(() => {
    onSortTable();
  }, [sortData]);

  useEffect(() => {
    onPaginate(pagination.page);
  }, [mentors]);

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
      mentor.name.toLowerCase().includes(searchTerm)
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

  return (
    <div className={style.list__container}>
      <div className={style.list__actions}>
        <CustomizedButton variant="outlined" color="primary600">
          <img src={require("../../assets/icons/Add_Mentor.png")} />
          <p>Thêm diễn giả</p>
        </CustomizedButton>
        <CustomizedButton variant="outlined" color="primary600">
          <img src={require("../../assets/icons/Remove_Mentor.png")} />
          <p>Vô hiệu hóa</p>
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
                  updateSort("name");
                }}
              >
                <span>{ADMIN_TABLE_HEADER.NAME}</span>
                {renderSortIcon("name")}
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
                  updateSort("phone");
                }}
              >
                <span>{ADMIN_TABLE_HEADER.PHONE}</span>
                {renderSortIcon("phone")}
              </StyledTableCell>
              <StyledTableCell align="center">
                <span>{ADMIN_TABLE_HEADER.PROFILE}</span>
              </StyledTableCell>
              <StyledTableCell
                className={style.list__header_sortable}
                align="center"
                onClick={() => {
                  updateSort("defaultCreateAt");
                }}
              >
                <span>{ADMIN_TABLE_HEADER.CREATED_DATE}</span>
                {renderSortIcon("defaultCreateAt")}
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
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`#`}>CV diễn giả</Link>
                </StyledTableCell>
                <StyledTableCell align="center">{row.createAt}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton>
                    <img
                      className={style.list__table_icon}
                      src={require("../../assets/icons/Table_Edit.png")}
                    />
                  </IconButton>
                  <IconButton>
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
  );
};

export default AdminMentorList;
