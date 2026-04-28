import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Header";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { n } from "@/utils/scaling";

export default function SettingsScreen() {
  const { invertColors, setInvertColors } = useInvertColors();

  const bg = invertColors ? "white" : "black";

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bg }]}>
      <Header headerTitle="Settings" hideBackButton />
      <View style={styles.content}>
        <ToggleSwitch
          label="Invert colors"
          value={invertColors}
          onValueChange={setInvertColors}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: n(22),
    paddingTop: n(16),
  },
});
