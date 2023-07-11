import * as React from "react";
import { Button, Card, Text } from "react-native-paper";

const CardComponent = (props: any) => (
  <Card style={{ margin: 10 }}>
    <Button>{props.title}</Button>
    <Card.Content>
      <Text variant="titleMedium">{props.prof}</Text>
      <Text variant="bodyMedium">{props.content}</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
  </Card>
);

export default CardComponent;
