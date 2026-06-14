import ExportarDados from "@/components/ExportarDados"
import { colors, typography, shadows, rounded, spacing, } from "@/styles/tokens"

function TabelaAtendimentos({ dados, busca, setBusca, filtroRealizado, setFiltroRealizado }) {
  return (
    <div className={`${colors.bgCard} ${rounded.lg} ${spacing.cardPadding} ${shadows.card} border ${colors.border}`}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className={`${typography.heading2} ${colors.textGold}`}>Agendamentos</h2>
          <ExportarDados dados={dados} busca={busca} filtroRealizado={filtroRealizado} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por cliente, advogado ou organização..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={`flex-1 px-4 py-2 ${rounded.md} ${colors.bgPrimary} border ${colors.border} ${colors.textPrimary} placeholder-gray-400 focus:outline-none ${colors.focusBorder} ${typography.body}`}
          />
          <select
            value={filtroRealizado}
            onChange={(e) => setFiltroRealizado(e.target.value)}
            className={`px-4 py-2 ${rounded.md} ${colors.bgPrimary} border ${colors.border} ${colors.textPrimary} focus:outline-none ${colors.focusBorder} ${typography.body}`}
          >
            <option value="">Todos</option>
            <option value="Sim">Realizados</option>
            <option value="Não">Não realizados</option>
          </select>
        </div>
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
                        ? `${colors.bgGreen} ${colors.textWhite}`
                        : "bg-red-100 text-red-800"
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