import { colors } from "@/styles/tokens"

function KPICard({ titulo, valor, destaque = false }) {
  return (
    <div className={`rounded-xl p-6 shadow-lg border ${
      destaque
        ? `${colors.accent} border-transparent`
        : `${colors.bgCard} ${colors.border}`
    }`}>
      <p className={`text-sm mb-1 ${destaque ? "text-yellow-100" : colors.textMuted}`}>
        {titulo}
      </p>
      <p className={`text-3xl font-bold ${destaque ? "text-white" : colors.textGold}`}>
        {valor}
      </p>
    </div>
  )
}

export default KPICard