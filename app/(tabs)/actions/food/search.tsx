import { Image } from "expo-image";
import { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

import {
  APP_SHELL_INPUT_PLACEHOLDER_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";
import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";

const SEARCH_INPUT_BACKGROUND = require("@/assets/backgrounds/search-input.png");

export default function FoodSearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <ActionsSubScreenLayout>
      <View style={styles.inputShell}>
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          source={SEARCH_INPUT_BACKGROUND}
          style={StyleSheet.absoluteFillObject}
          contentFit="fill"
        />
        <TextInput
          accessibilityLabel="Search food"
          value={query}
          onChangeText={setQuery}
          placeholder="Search foods…"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.input}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          {...Platform.select({
            android: {
              includeFontPadding: false,
              textAlignVertical: "center" as const,
            },
          })}
        />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  inputShell: {
    alignSelf: "stretch",
    height: 52,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 52,
    /** Extra space on the left for the search icon baked into the background asset. */
    paddingLeft: 55,
    /** Room for the iOS clear (“×”) control while editing. */
    paddingRight: 50,
    paddingVertical: 0,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    color: APP_SHELL_MAIN_TEXT_COLOR,
    backgroundColor: "transparent",
  },
});
