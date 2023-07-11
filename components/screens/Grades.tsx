import { Card, Text } from "react-native-paper";
import CustomDD from "../molecules/CustomDropdown";

type row = {
  Student_ID: string;
  Course_ID: string;
  Semester_ID: string;
  Faculty_ID: string;
  grade: string;
  Attendance: string;
};

type AgendaProps = {};

const Grades = (props: AgendaProps) => {
  /*

  Fetch data
  You know User info Ex: LCI2021023 , Sem = 4th

  query: Felech all rows from takesRelation where Student_id==LCI2021023 
  data will look like : 
  {
    Student_ID : string,
    Course_ID : string,
    Semester_ID : string,
    Faculty_ID : string,
    grade : string,
    Attendance : string,
  }

  -> BigData

  */

  const onerow: row = {
    Student_ID: "A",
    Course_ID: "CND12300C",
    Faculty_ID: "VKS",
    Semester_ID: "3",
    grade: "A+",
    Attendance: "45%",
  };

  const BigData: row[] = [onerow];

  return (
    <Card>
      <CustomDD data={BigData}></CustomDD>
    </Card>
  );
};

Grades.title = "Calendar";

export default Grades;