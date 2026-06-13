import { useState, useEffect } from "react"
import { colors } from "@/styles/tokens"
import KPICard from "@/components/KPICard"
import GraficoBarras from "@/components/GraficoBarras"
import GraficoLinha from "@/components/GraficoLinha"
import TabelaAtendimentos from "@/components/TabelaAtendimentos"
import ExportarDados from "@/components/ExportarDados"

const API = "http://localhost:3001/api/atendimentos"

function App() {
  const [metricas, setMetricas] = useState(null)
  const [atendimentos, setAtendimentos] = useState([])
  const [total, setTotal] = useState(0)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [busca, setBusca] = useState("")
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(`${API}/metricas`)
      .then((r) => r.json())
      .then(setMetricas)
      .catch(() => setErro("Erro ao carregar métricas."))
  }, [])

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
        setErro("Erro ao carregar atendimentos.")
        setLoading(false)
      })
  }, [pagina, busca])

  const dadosAdvogado = metricas
    ? Object.entries(metricas.porAdvogado)
        .map(([nome, quantidade]) => ({ nome: nome.split(" ")[0] + " " + nome.split(" ")[1], quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade)
    : []

  return (
    <div className={`min-h-screen ${colors.bgPrimary}`}>
      <header className={`${colors.bgSecondary} border-b ${colors.border} px-6 py-4`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-xl font-bold ${colors.textGold}`}>Painel Jurídico</h1>
          <p className={`text-xs ${colors.textMuted}`}>Gestão de Atendimentos</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {erro && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            {erro} Verifique se o backend está rodando em http://localhost:3001
          </div>
        )}

        {metricas && (
          <section>
            <h2 className={`text-sm font-medium ${colors.textMuted} mb-4 uppercase tracking-wider`}>Visão Geral</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard titulo="Total de Atendimentos" valor={metricas.total} destaque />
              <KPICard titulo="Realizados" valor={metricas.realizados} />
              <KPICard titulo="Não Realizados" valor={metricas.naoRealizados} />
              <KPICard titulo="Taxa de Realização" valor={`${Math.round((metricas.realizados / metricas.total) * 100)}%`} />
            </div>
          </section>
        )}

        {metricas && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraficoLinha dados={metricas.evolucaoMensal} />
            <GraficoBarras dados={dadosAdvogado} />
          </section>
        )}

        <section>
          <TabelaAtendimentos
            dados={atendimentos}
            busca={busca}
            setBusca={(val) => { setBusca(val); setPagina(1) }}
          />

          {!loading && (
            <div className="flex items-center justify-between mt-4">
              <p className={`text-sm ${colors.textMuted}`}>
                {total} resultados — página {pagina} de {totalPaginas}
              </p>
              <div className="flex items-center gap-4">
                <ExportarDados dados={atendimentos} />
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagina((p) => Math.max(1, p - 1))}
                    disabled={pagina === 1}
                    className={`px-4 py-2 rounded-lg text-sm border ${colors.border} ${colors.textSecondary} disabled:opacity-30 hover:bg-[#122929] transition-colors`}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                    disabled={pagina === totalPaginas}
                    className={`px-4 py-2 rounded-lg text-sm border ${colors.borderGold} ${colors.textGold} disabled:opacity-30 hover:bg-[#122929] transition-colors`}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

      </main>
    </div>
  )
}

export default App