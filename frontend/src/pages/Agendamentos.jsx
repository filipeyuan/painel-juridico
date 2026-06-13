import { useEffect, useState } from "react"
import { colors, typography, spacing } from "@/styles/tokens"
import TabelaAtendimentos from "@/components/TabelaAtendimentos"
import ExportarDados from "@/components/ExportarDados"

const API = "http://localhost:3001/api/atendimentos"

function Agendamentos() {
  const [atendimentos, setAtendimentos] = useState([])
  const [total, setTotal] = useState(0)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [busca, setBusca] = useState("")
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ pagina, limite: 10, busca })
    fetch(`${API}?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setAtendimentos(data.dados)
        setTotal(data.total)
        setTotalPaginas(data.totalPaginas)
        setLoading(false)
      })
      .catch(() => {
        setErro("Erro ao carregar atendimentos. Verifique se o backend está rodando em http://localhost:3001")
        setLoading(false)
      })
  }, [pagina, busca])

  return (
    <main className={`max-w-7xl mx-auto px-6 py-8 ${spacing.sectionGap}`}>
      {erro && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
          {erro}
        </div>
      )}

      <TabelaAtendimentos
        dados={atendimentos}
        busca={busca}
        setBusca={(val) => { setBusca(val); setPagina(1) }}
      />

      {!loading && (
        <div className="flex items-center justify-between mt-4">
          <p className={`${typography.body} ${colors.textMuted}`}>
            {total} resultados — página {pagina} de {totalPaginas}
          </p>
          <div className="flex items-center gap-4">
            <ExportarDados dados={atendimentos} />
            <div className="flex gap-2">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className={`px-4 py-2 rounded-lg ${typography.body} border ${colors.border} ${colors.textSecondary} disabled:opacity-30 ${colors.bgHover} transition-colors`}
              >
                Anterior
              </button>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className={`px-4 py-2 rounded-lg ${typography.body} border ${colors.borderGold} ${colors.textGold} disabled:opacity-30 ${colors.bgHover} transition-colors`}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </main>
  )
}

export default Agendamentos