import { Scale } from "lucide-react"
import { colors, typography, rounded } from "@/styles/tokens"

function Navbar({ aba, setAba }) {
  return (
    <header className={`${colors.bgSecondary} border-b ${colors.borderNav} px-6 py-5`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: "rgba(201, 168, 76, 0.15)", padding: "8px", borderRadius: "8px" }}>
  <Scale size={20} color="#c9a84c" />
</div>
          <div>
            <h1 className={`${typography.heading2} ${colors.textGold}`}>Painel Jurídico</h1>
            <p className={`${typography.bodySmall} ${colors.textNav}`}>Gestão de Atendimentos</p>
          </div>
        </div>
        <div className={`flex gap-1 p-1 ${colors.bgNavInput} ${rounded.lg}`}>
          {["Dashboard", "Agendamentos"].map((item) => (
            <button
              key={item}
              onClick={() => setAba(item)}
              className={`px-5 py-2 ${rounded.md} ${typography.body} transition-all duration-200 border-b-2 border-transparent ${
                aba === item
                  ? `${colors.bgGold} ${colors.textWhite}`
                  : `${colors.textNav} hover:text-white`
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar