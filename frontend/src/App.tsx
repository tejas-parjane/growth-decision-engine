import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import DecisionEngine from "./pages/DecisionEngine";
import DataSources from "./pages/DataSources";
import Guide from "./pages/Guide";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/decision" element={<DecisionEngine />} />
          <Route path="/data" element={<DataSources />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
