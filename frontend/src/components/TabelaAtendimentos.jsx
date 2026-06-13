import { colors, typography, shadows, rounded, spacing } from "@/styles/tokens"

function TabelaAtendimentos({ dados, busca, setBusca }) {
  return (
    <div className={`${colors.bgCard} ${rounded.lg} ${spacing.cardPadding} ${shadows.card} border ${colors.border}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className={`${typography.heading2} ${colors.textGold}`}>Agendamentos</h2>
        <input
          type="text"
          placeholder="Buscar por cliente, advogado ou organização..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={`w-full md:w-96 px-4 py-2 ${rounded.md} ${colors.bgPrimary} border ${colors.border} ${colors.textPrimary} placeholder-gray-500 focus:outline-none ${colors.focusBorder} ${typography.body}`}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${colors.border}`}>
              <th className={`text-left py-3 px-4 ${colors.textMuted} ${typography.label}`}>Cliente</th>
              <th className={`text-left py-3 px-4 ${colors.textMuted} ${typography.label}`}>Data</th>
              <th className={`text-left py-3 px-4 ${colors.textMuted} ${typography.label}`}>Horário</th>
              <th className={`text-left py-3 px-4 ${colors.textMuted} ${typography.label}`}>Advogado</th>
              <th className={`text-left py-3 px-4 ${colors.textMuted} ${typography.label}`}>Realizado</th>
            </tr>
          </thead>
          <tbody>
            {dados.length === 0 ? (
              <tr>
                <td colSpan={5} className={`text-center py-8 ${colors.textMuted} ${typography.body}`}>
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              dados.map((a) => (
                <tr key={a.id} className={`border-b ${colors.border} ${colors.bgHover} transition-colors`}>
                  <td className={`py-3 px-4 ${colors.textPrimary} ${typography.body}`}>{a.nome_cliente}</td>
                  <td className={`py-3 px-4 ${colors.textSecondary} ${typography.body}`}>{a.data}</td>
                  <td className={`py-3 px-4 ${colors.textSecondary} ${typography.body}`}>{a.hora_inicio} - {a.hora_fim}</td>
                  <td className={`py-3 px-4 ${colors.textSecondary} ${typography.body}`}>{a.advogado || "—"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 ${rounded.full} ${typography.bodySmall} font-medium ${
                      a.realizado === "Sim"
                        ? "bg-emerald-900 text-emerald-300"
                        : "bg-red-900 text-red-300"
                    }`}>
                      {a.realizado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TabelaAtendimentos