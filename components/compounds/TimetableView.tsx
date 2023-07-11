import { StyleProp, View, ViewStyle } from "react-native";
import { Timetable } from "../../interfaces";
import GlobalStyles from "../../config/GlobalStyles";
import { Text } from "react-native-paper";

type TimetableViewProps = { data: Timetable; style?: StyleProp<ViewStyle> };

// TODO: Remove the hardcoded date
const TimetableView = ({ data, style }: TimetableViewProps) => {
  return (
    <View style={{ ...GlobalStyles.VView, ...(style as {}) }}>
      {data.days.map((day) => (
        <View key={day.day} style={{ ...GlobalStyles.VView }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 12,
              alignItems: "baseline",
            }}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: "600", textTransform: "capitalize" }}
            >
              {day.day}
            </Text>
            <Text
              variant="titleSmall"
              style={{ fontWeight: "100", color: "gray" }}
            >
              Apr 22, 2023
            </Text>
          </View>
          <View style={{ ...GlobalStyles.VView, paddingHorizontal: 12 }}>
            {day.classes.map((cl) => (
              <View key={cl.class.name} style={{ ...GlobalStyles.HView }}>
                <Text style={{ marginRight: 12 }}>
                  {cl.timeSlot.from.toString()}
                </Text>
                <Text>{cl.class.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TimetableView;
