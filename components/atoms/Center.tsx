import { StyleProp, View, ViewStyle } from "react-native";

type CenterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Center = ({ children, style }: CenterProps) => {
  return (
    <View
      style={{
        ...(style as {}),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export default Center;
