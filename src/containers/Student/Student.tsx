import React from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  Icon,
  IconButton,
} from "@material-ui/core";
import SideDrawer from "../../components/organisms/SideDrawer/SideDrawer";

interface Props {}

interface State {
  studentdata: [];
  anchor: any;
  open: boolean;
  curentStudent: any
}

export default class Student extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      studentdata: [],
      anchor: '',
      open: false,
      curentStudent: {}
    };
  }

  componentDidMount() {
    this.getStudentData();
  }

  getStudentClass() {
    axios
      .get("https://mtml-api.hestawork.com/api/userClass/class-details")
      .then((res) => {
        const studentclass = res.data.data;
        console.log(studentclass);
      });
  }

  getStudentData() {
    axios
      .post("https://mtml-api.hestawork.com/api/user/filter-students")
      .then((res) => {
        const studentres = res.data.data.docs;
        this.setState({ studentdata: studentres });
        console.log(studentres)
      });
  }

  toggleDrawer = (student : any) => {
    this.setState({ anchor: "right", open: true, curentStudent : student });

  };

  closeDrawer = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow role="checkbox">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Student Id</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Class</TableCell>
                <TableCell align="right">Section</TableCell>
                <TableCell align="right">Email Id</TableCell>
                <TableCell align="right">Campus</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.studentdata.map((student: any) => (
                <TableRow key={student.student.student_id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.student.student_id}
                  </TableCell>
                  <TableCell align="right">{student.first_name}</TableCell>
                  <TableCell align="right">{student.last_name}</TableCell>
                  <TableCell align="right">
                    {student.student.class_name}
                  </TableCell>
                  <TableCell align="right">{student.student.section}</TableCell>
                  <TableCell align="right">{student.email}</TableCell>
                  <TableCell align="right">{student.campus}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={()=> this.toggleDrawer(student)}
                    >
                      <Icon className="fa fa-edit" />
                    </IconButton>
                    <IconButton size="small">
                      <Icon className="fa fa-ban" />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <Icon className="fa fa-trash" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

          <SideDrawer
          open={this.state.open}
          anchor={this.state.anchor}
          onClose={this.closeDrawer}
          student={this.state.curentStudent}
          />
      </>
    );
  }
}
