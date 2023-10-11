import "./App.css";
import HomeCards from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNaveBar from "./Components/Navebar/MainNaveBar";
import SubNaveBar from "./Components/Navebar/SubNaveBar";
import SearchBatch from "./Components/Batch/SearchBatch";
import SearchClaim from "./Components/Claim/SearchClaim";
import SearchPatient from "./Components/Patient/SearchPatient";
import SearchProvider from "./Components/Provider/SearchProvider";
import MainFooter from "./Components/Footer/MainFooter";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainNaveBar />
        <SubNaveBar />
        <Routes>
          <Route path="/" element={<HomeCards />} />
          <Route path="/mcpsweb/searchbatch" element={<SearchBatch />} />
          <Route path="/mcpsweb/searchclaim" element={<SearchClaim />} />
          <Route path="/mcpsweb/searchpatient" element={<SearchPatient />} />
          <Route path="/mcpsweb/searchprovider" element={<SearchProvider />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
