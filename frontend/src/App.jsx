import { useState } from "react"
import Navbar from "@/components/Navbar"
import Dashboard from "@/pages/Dashboard"
import Agendamentos from "@/pages/Agendamentos"
import { colors } from "@/styles/tokens"

function App() {
  const [aba, setAba] = useState("Dashboard")

  return (
    <div className={`min-h-screen ${colors.bgPrimary}`}>
      <Navbar aba={aba} setAba={setAba} />
      {aba === "Dashboard" ? <Dashboard /> : <Agendamentos />}
    </div>
  )
}

export default App