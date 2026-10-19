
import NavigationScroll from "@/layout/NavigationScroll";
import ThemeCustomization from "@/themes";
import AppRoutes  from "./Routes";

const App = () => (
        <ThemeCustomization>
            <NavigationScroll>
                <AppRoutes />
            </NavigationScroll>
        </ThemeCustomization>
);

export default App;