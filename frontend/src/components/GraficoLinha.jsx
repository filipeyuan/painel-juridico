import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { colors } from "@/styles/tokens"

function GraficoLinha({ dados }) {
  return (
    <div className={`${colors.bgCard} rounded-xl p-6 shadow-lg border ${colors.border}`}>
      <h2 className={`font-semibold mb-4 ${colors.textGold}`}>Evolução Mensal de Atendimentos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} />
          <XAxis dataKey="mes" stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
          <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1a1d27", border: "1px solid #2a2d3a", color: "#fff" }} />
          <Line type="monotone" dataKey="quantidade" stroke={colors.chartPrimary} strokeWidth={2} dot={{ fill: colors.chartPrimary }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoLinha