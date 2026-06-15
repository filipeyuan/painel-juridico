import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function GraficoLinha({ dados }) {
  return (
    <div className={`${colors.bgCard} ${rounded.lg} ${spacing.cardPadding} ${shadows.card} border ${colors.border}`}>
      <h2 className={`${typography.heading3} mb-4 ${colors.textGold}`}>Evolução Mensal de Atendimentos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} vertical={false} />
          <XAxis dataKey="mes" stroke={colors.raw.textMuted} tick={{ fill: colors.raw.textSecondary, fontSize: 11 }} tickLine={false} axisLine={false} dy={8} />
          <YAxis stroke={colors.raw.textMuted} tick={{ fill: colors.raw.textSecondary, fontSize: 11 }} tickLine={false} axisLine={false} dx={-8} />
          <Tooltip
            contentStyle={{ backgroundColor: colors.raw.bgNav, border: `1px solid ${colors.raw.gold}`, color: colors.raw.textWhite, borderRadius: "8px", fontSize: "12px" }}
            labelStyle={{ color: colors.raw.gold }}
          />
          <Line type="monotone" dataKey="quantidade" stroke={colors.chartPrimary} strokeWidth={2.5} dot={{ fill: colors.chartPrimary, r: 5, strokeWidth: 0 }} activeDot={{ r: 7, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoLinha