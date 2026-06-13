import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { colors } from "@/styles/tokens"

function GraficoBarras({ dados }) {
  return (
    <div className={`${colors.bgCard} rounded-xl p-6 shadow-lg border ${colors.border}`}>
      <h2 className={`font-semibold mb-4 ${colors.textGold}`}>Atendimentos por Advogado</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} layout="vertical">
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="nome" stroke="#6b7280" width={160} tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1a1d27", border: "1px solid #2a2d3a", color: "#fff" }} />
          <Bar dataKey="quantidade" fill={colors.chartPrimary} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoBarras