import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import {
  FLOATING_SURFACE_RADIUS,
  FloatingShellSurface,
} from "@/components/floating-shell-surface";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-shell";

export default function MyBeastScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={[styles.row, styles.rowFull, styles.rowDouble]}>
        <View style={styles.heroShell}>
          <Image
            accessibilityIgnoresInvertColors
            source={require("@/assets/backgrounds/beast-hero.png")}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>
      </View>
      <View style={styles.row}>
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/red-square.png")}
        />
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/grey-square.png")}
        />
      </View>
      <View style={styles.row}>
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/green-square.png")}
        />
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/yellow-square.png")}
        />
      </View>
      <View style={styles.row}>
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/purple-square.png")}
        />
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          tileSource={require("@/assets/backgrounds/light-blue-square.png")}
        />
      </View>
      <View style={[styles.row, styles.rowFull]}>
        <FloatingShellSurface
          gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
          style={[styles.cellFull, styles.bottomRowFloatingOuter]}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
    borderBottomWidth: 5,
    borderBottomColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0,
  },
  rowFull: {
    alignSelf: "stretch",
  },
  /** Same vertical weight as two former `flex: 1` rows. */
  rowDouble: {
    flex: 2,
  },
  cellFull: {
    flex: 1,
    minWidth: 0,
  },
  heroShell: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  heroImage: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },
  /** Gutter wrapper for the lowest grid row only — matches tab bar corner radius. */
  bottomRowFloatingOuter: {
    borderBottomLeftRadius: FLOATING_SURFACE_RADIUS,
    borderBottomRightRadius: FLOATING_SURFACE_RADIUS,
  },
});
