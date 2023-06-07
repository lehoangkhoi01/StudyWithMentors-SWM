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
} from "../../shared/constants/common";
import { Button, Checkbox, IconButton, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { handleTimeToDisplay } from "../../Helpers/dateHelper";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";

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
];

const AdminMentorList = () => {
  const [mentors, setMentors] = useState([]);

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
      };
    });

    setMentors(updatedMentorList);
  };

  useEffect(() => {
    adjustMentorList(DUMMY_DATA);
  }, []);

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
        />
        <CustomizedButton variant="contained" color="primary600">
          <img src={require("../../assets/icons/Search_Icon.png")} />
          <p>Tìm kiếm</p>
        </CustomizedButton>
        <Button variant="text" className={`${style.filterSection__linkButton}`}>
          {BUTTON_LABEL.DEFAULT}
        </Button>
      </div>
      <TableContainer component={Paper} className={style.list__table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.SELECT}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.NUMBER}
              </StyledTableCell>
              <StyledTableCell>{ADMIN_TABLE_HEADER.NAME}</StyledTableCell>
              <StyledTableCell>{ADMIN_TABLE_HEADER.EMAIL}</StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.PHONE}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.PROFILE}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.CREATED_DATE}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.STATUS}
              </StyledTableCell>
              <StyledTableCell align="center">
                {ADMIN_TABLE_HEADER.ACTION}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map((row) => (
              <StyledTableRow key={`ROW_INDEX_${row.id}`}>
                <StyledTableCell align="center">
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#3948AB",
                      },
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
        count={6}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default AdminMentorList;
