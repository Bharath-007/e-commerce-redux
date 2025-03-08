import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./pages/Header";

export interface IPageHandler {
  page: boolean;
  handlePage: () => void;
}

const App = () => {
  const [switchPage, setSwitchPage] = useState<boolean>(false);
  const handlePageSwitcher = () => {
    setSwitchPage(!switchPage);
  };
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Home page={switchPage} handlePage={handlePageSwitcher} />
      </div>
    </Provider>
  );
};

export default App;
