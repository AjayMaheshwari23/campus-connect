import { StyleSheet, View } from "react-native";
import { Avatar, Card, Divider, Text, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/src/components/Icon";
import { SvgProps } from "react-native-svg";
import { CustomSvgProps } from "../../interfaces";
import Center from "../atoms/Center";

type CustomCardProps = {
  children?: React.ReactNode;
  titleIcon: IconSource;
  heading: string;
  title?: string;
  subtitle?: string;
  divider?: boolean;
  contentImage?: (props?: CustomSvgProps) => React.ReactNode;
};

const CustomCard = ({
  titleIcon,
  heading,
  title,
  subtitle,
  children,
  divider,
  contentImage,
}: CustomCardProps) => {
  const theme = useTheme();

  return (
    <Card mode="contained">
      <Card.Title
        titleVariant="titleSmall"
        title={heading}
        leftStyle={styles.left}
        titleStyle={{ ...styles.titleText, color: theme.colors.primary }}
        style={styles.title}
        left={(props) => (
          <Avatar.Icon {...props} icon={titleIcon} size={styles.left.height} />
        )}
      />
      <Card.Content style={{ marginBottom: 12 }}>
        {!!contentImage ? (
          <Center style={{ marginVertical: 12 }}>
            {contentImage({
              style: { width: 144 },
            })}
          </Center>
        ) : null}
        {title ? <Text variant="titleLarge">{title}</Text> : null}
        {subtitle ? <Text variant="bodyMedium">{subtitle}</Text> : null}
      </Card.Content>
      {divider == undefined || divider ? (
        <Divider style={{ backgroundColor: theme.colors.primary }} />
      ) : null}
      {children}
    </Card>
  );
};

// TODO: Make the text in the title have a color based on the theme
const styles = StyleSheet.create({
  left: {
    marginRight: 12,
    width: 24,
    height: 24,
  },
  title: {
    minHeight: 36,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    textAlignVertical: "center",
  },
});

export default CustomCard;
