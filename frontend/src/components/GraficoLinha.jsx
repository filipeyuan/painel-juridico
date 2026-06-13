import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function GraficoLinha({ dados }) {
  return (
    <div className={`${colors.bgCard} ${rounded.lg} ${spacing.cardPadding} ${shadows.card} border ${colors.border}`}>
      <h2 className={`${typography.heading3} mb-4 ${colors.textGold}`}>Evolução Mensal de Atendimentos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.raw.border} />
          <XAxis dataKey="mes" stroke={colors.raw.textMuted} tick={{ fill: colors.raw.textSecondary }} />
          <YAxis stroke={colors.raw.textMuted} tick={{ fill: colors.raw.textSecondary }} />
          <Tooltip contentStyle={{ backgroundColor: colors.raw.bgCard, border: `1px solid ${colors.raw.border}`, color: colors.raw.textWhite }} />
          <Line type="monotone" dataKey="quantidade" stroke={colors.chartPrimary} strokeWidth={2} dot={{ fill: colors.chartPrimary }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoLinha