import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function KPICard({ titulo, valor }) {
  return (
    <div className={`${spacing.cardPadding} ${rounded.lg} ${shadows.card} border ${colors.bgCard} ${colors.border}`}>
      <p className={`${typography.bodySmall} mb-1 ${colors.textMuted}`}>
        {titulo}
      </p>
      <p className={`text-3xl font-bold ${colors.textGreen}`}>
        {valor}
      </p>
    </div>
  )
}

export default KPICard