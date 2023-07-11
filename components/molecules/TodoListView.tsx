import React from "react";

import { View } from "react-native";
import { CustomEvent } from "../../interfaces";
import { RadioButton, Text } from "react-native-paper";
import GlobalStyles from "../../config/GlobalStyles";

type TodoListProps = {
  data: Array<CustomEvent>;
};

const TodoListItem = ({
  title,
  completed,
  date
}: CustomEvent) => {
  const [checked, setChecked] = React.useState<boolean>(completed);

  React.useEffect(() => {
    setChecked(completed);
  }, [completed]);

  return (
    <View style={{ ...GlobalStyles.HView, justifyContent: "flex-start" }}>
      <RadioButton
        value={date.toString()}
        status={checked ? "checked" : "unchecked"}
        onPress={() => setChecked(!checked)}
      />
      <Text
        style={{ textDecorationLine: checked ? "line-through" : undefined }}
      >
        {title}
      </Text>
    </View>
  );
};

const TodoList = ({ data }: TodoListProps) => {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      {data.map((event) => (
        <TodoListItem key={event.date.toString()} {...event} />
      ))}
    </View>
  );
};

export default TodoList;
