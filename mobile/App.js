import Navigation from "./src/screens/Navigation";
import StateProvider from "./src/Utils/StateProvider";

export default function App() {
  return (
    <StateProvider>
      <Navigation />
    </StateProvider>
  );
}
