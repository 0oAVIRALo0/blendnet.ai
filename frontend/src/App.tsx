import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signup"
import Login from "./pages/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  )
}

export default App