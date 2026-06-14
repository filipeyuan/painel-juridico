import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function GraficoBarras({ dados }) {
  return (
    <div className={`${colors.bgCard} ${rounded.lg} ${spacing.cardPadding} ${shadows.card} border ${colors.border}`}>
      <h2 className={`${typography.heading3} mb-4 ${colors.textGold}`}>Atendimentos por Advogado</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} layout="vertical">
          <XAxis type="number" stroke={colors.raw.textMuted} />
          <YAxis type="category" dataKey="nome" stroke={colors.raw.textMuted} width={160} tick={{ fontSize: 11, fill: colors.raw.textSecondary }} />
          <Tooltip
  contentStyle={{
    backgroundColor: colors.raw.bgNav,
    border: `1px solid ${colors.raw.gold}`,
    color: colors.raw.textWhite,
    borderRadius: "8px",
    fontSize: "12px",
  }}
  labelStyle={{ color: colors.raw.gold }}
/>
          <Bar dataKey="quantidade" fill={colors.chartPrimary} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoBarras