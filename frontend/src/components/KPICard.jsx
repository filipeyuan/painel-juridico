import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function KPICard({ titulo, valor, destaque = false }) {
  return (
    <div className={`${spacing.cardPadding} ${rounded.lg} ${shadows.card} border ${
      destaque
        ? `${colors.accent} border-transparent`
        : `${colors.bgCard} ${colors.border}`
    }`}>
      <p className={`${typography.bodySmall} mb-1 ${destaque ? "text-yellow-100" : colors.textMuted}`}>
        {titulo}
      </p>
      <p className={`text-3xl font-bold ${destaque ? "text-white" : colors.textGold}`}>
        {valor}
      </p>
    </div>
  )
}

export default KPICard