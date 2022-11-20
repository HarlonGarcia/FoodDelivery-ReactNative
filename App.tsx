import { useFonts } from "expo-font";
import { Main } from "./src/Main";
import { StatusBar } from "expo-status-bar";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

export default function App() {
  const [isFontsLoaded] = useFonts({
    "Inter-400": require("./src/assets/fonts/Inter-VariableFont_slntwght.ttf"),
    "Inter-700": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Inter-900": require("./src/assets/fonts/Inter-Black.ttf"),
  });

  if (!isFontsLoaded) return null;
  return (
    <>
      <StatusBar style="dark" />
      <Main />
    </>
  );
}
