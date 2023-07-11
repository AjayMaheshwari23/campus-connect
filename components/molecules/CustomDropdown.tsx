import { Card, useTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";

type row = {
  Student_ID: string;
  Course_ID: string;
  Semester_ID: string;
  Faculty_ID: string;
  grade: string;
  Attendance: string;
};

type DDProps = {
  data?: Array<row>;
};

const CustomDD = ({ data }: DDProps) => {
  console.log(data);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Macbook", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <Card>
      <DropDownPicker
        style={{
          backgroundColor: theme.colors.background,
          borderColor: "transparent",
          borderRadius: 24,
        }}
        containerStyle={{}}
        textStyle={{
          fontSize: 12,
          color: theme.colors.inverseSurface,
        }}
        labelStyle={{
          fontWeight: "bold",
        }}
        dropDownContainerStyle={{
          backgroundColor: theme.colors.background,
          borderTopColor: "transparent",
        }}
        arrowIconStyle={
          {
            // the arrow color is not changing
          }
        }
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => {
          console.log(value);
        }}
        onSelectItem={(item) => {
          console.log(item);
        }}
      />
    </Card>
  );
};

export default CustomDD;
