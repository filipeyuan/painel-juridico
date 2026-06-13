import { colors, typography, rounded } from "@/styles/tokens"

function Navbar({ aba, setAba }) {
  return (
    <header className={`${colors.bgSecondary} border-b ${colors.border} px-6 py-5`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className={`${typography.heading2} ${colors.textGold}`}>Painel Jurídico</h1>
          <p className={`${typography.bodySmall} ${colors.textMuted}`}>Gestão de Atendimentos</p>
        </div>
        <div className={`flex gap-1 p-1 ${colors.bgPrimary} ${rounded.lg}`}>
          {["Dashboard", "Agendamentos"].map((item) => (
            <button
              key={item}
              onClick={() => setAba(item)}
              className={`px-5 py-2 ${rounded.md} ${typography.body} transition-all duration-200 ${
                aba === item
                  ? `${colors.accent} text-white shadow-md`
                  : `${colors.textMuted} hover:${colors.textSecondary}`
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