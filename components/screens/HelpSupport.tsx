import React from "react";
import { Linking } from "react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Text,
  IconButton,
  MD3Colors,
  Divider,
  Button,
  useTheme,
} from "react-native-paper";

type AgendaProps = {};

const devs = [
  {
    name: "Chakri",
    subtitle: "Backend + Frontend",
    image: require("../../assets/Chakri.png"),
    links: [
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/chakradhar-reddy-d/",
      },
      {
        name: "github",
        link: "https://github.com/chakri68",
      },
    ],
  },
  {
    name: "Ajay Maheshwari",
    subtitle: "Backend + Frontend",
    image: require("../../assets/Ajay.png"),
    links: [
      {
        name: "linkedin2",
        link: "https://www.linkedin.com/in/ajay-maheshwari/",
      },
      {
        name: "github2",
        link: "https://github.com/AjayMaheshwari23",
      },
    ],
  },
];

const forms = [
  "https://forms.gle/SmMtNc847Tcfuy1L7",
  "https://forms.gle/MLbz6b23rpRhaTPP6",
];

const HAS = (props: AgendaProps) => {

  const openlink = (url:string) => {
    Linking.openURL(url);
  };

  const theme = useTheme();
  return (
    <View>
      {devs.map((dev) => (
        <React.Fragment key={dev.name}>
          <View
            key={dev.name}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 10,
                paddingHorizontal: 12,
              },
            ]}
          >
            <Avatar.Image size={95} source={dev.image} />
            <View style={[{ margin: 20 }]}>
              <Text variant="headlineSmall">{dev.name}</Text>
              <Text variant="bodySmall">{dev.subtitle}</Text>
              <View style={styles.card}>
                <IconButton
                  style={styles.icons}
                  icon="linkedin"
                  iconColor={theme.colors.primary}
                  size={23}
                  onPress={() => openlink(dev.links[0].link)}
                />
                <IconButton
                  style={styles.icons}
                  icon="github"
                  iconColor={theme.colors.error}
                  size={23}
                  onPress={() => openlink(dev.links[1].link)}
                />
              </View>
            </View>
          </View>
          <Divider />
        </React.Fragment>
      ))}
      <View
        style={[
          {
            display: "flex",
            paddingHorizontal: 24,
            marginVertical: 24,
            gap: 24,
          },
        ]}
      >
        <Button
          style={{ flexGrow: 1 }}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.surface}
          icon="lightbulb"
          mode="contained-tonal"
          onPress={() => openlink(forms[0])}
        >
          Suggestion
        </Button>
        <Button
          buttonColor={theme.colors.error}
          textColor={theme.colors.surface}
          icon="bug-outline"
          mode="contained"
          onPress={() => openlink(forms[1])}
        >
          {" "}
          Report Bug{" "}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    margin: 0,
    marginLeft: -10,
  },
});

HAS.title = "Help ANd Support";
export default HAS;
