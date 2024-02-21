import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComponent from './componenti/FooterComponent';
import NavbarComponent from './componenti/NavbarComponent';
// import Homepage from './pagine/Homepage';
import Postpage from './pagine/Postpage';
import Userspage from "./pagine/Userspage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          {/* <Route path={"/"} element={<Homepage/>}></Route> */}
          <Route path={"/"} element={<Postpage/>}></Route>
          <Route path={"/users"} element={<Userspage/>}></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  );
}

export default App;
