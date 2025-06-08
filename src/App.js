import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import RoleSelection from "./pages/RoleSelectionPage"
import TestatorDashboard from "./pages/testator/DashBoard"
import CreateWill from "./pages/testator/CreateWill"
import EditWill from "./pages/testator/EditWill"
import BeneficiaryDashboard from "./pages/beneficiary/Dashboard"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/testator/dashboard" element={<TestatorDashboard />} />
          <Route path="/testator/create-will" element={<CreateWill />} />
          <Route path="/testator/edit-will" element={<EditWill />} />
          <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
