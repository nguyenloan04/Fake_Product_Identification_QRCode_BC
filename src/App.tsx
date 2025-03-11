import "./App.css";
import AppRouter from "@/AppRouter";
import AppContext from "@/AppContext.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

function App() {
  return (
    <>
      <AppContext>
        <AppRouter />
        <Toaster position="top-left" />
      </AppContext>
    </>
  );
}

export default App;
