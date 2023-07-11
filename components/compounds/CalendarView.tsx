import React from "react";
import { Calendar } from "react-native-calendars";
import { MD3Theme, useTheme } from "react-native-paper";

type CalendarViewProps = { theme: MD3Theme };

const CalendarView = ({ theme }: CalendarViewProps) => {
  // const [{ theme: calTheme, key }, setCalTheme] = React.useState({
  //   theme,
  //   key: theme.dark ? "dark" : "light",
  // });

  const keyRender = (theme: MD3Theme) => {
    return theme.dark ? "dark" : "light";
  };

  // // React.useEffect(() => {
  // //   console.log("REFRESH");
  // //   setCalTheme({theme, key: theme.});
  // // }, [theme.dark]);

  return (
    <Calendar
      key={keyRender(theme)}
      enableSwipeMonths
      renderHeader={() => <></>}
      renderArrow={() => <></>}
      theme={{
        dayTextColor: theme.colors.onSurface,
        arrowColor: theme.colors.primary,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: theme.colors.onBackground,
        backgroundColor: theme.colors.surface,
        calendarBackground: theme.colors.surface,
        todayTextColor: theme.colors.onSurfaceVariant,
        todayBackgroundColor: theme.colors.surfaceVariant,
        textDisabledColor: "gray",
      }}
      markingType={"dot"}
      // Collection of dates that have to be marked. Default = {}
      markedDates={{
        "2012-05-16": { selected: true, marked: true, selectedColor: "blue" },
        "2012-05-17": { marked: true },
        "2012-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        "2012-05-19": { disabled: true, disableTouchEvent: true },
      }}
    />
  );
};

export default CalendarView;
