import { useEffect, useState } from "react"
import { colors, typography, spacing } from "@/styles/tokens"
import KPICard from "@/components/KPICard"
import GraficoBarras from "@/components/GraficoBarras"
import GraficoLinha from "@/components/GraficoLinha"

const API = "http://localhost:3001/api/atendimentos"

function Dashboard() {
  const [metricas, setMetricas] = useState(null)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(`${API}/metricas`)
      .then((r) => r.json())
      .then(setMetricas)
      .catch(() => setErro("Erro ao carregar métricas. Verifique se o backend está rodando em http://localhost:3001"))
  }, [])

  const dadosAdvogado = metricas
    ? Object.entries(metricas.porAdvogado)
        .map(([nome, quantidade]) => ({ nome: nome.split(" ")[0] + " " + nome.split(" ")[1], quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade)
    : []

  return (
    <main className={`max-w-7xl mx-auto px-6 py-8 ${spacing.sectionGap}`}>
      {erro && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
          {erro}
        </div>
      )}

      {metricas && (
        <section>
          <h2 className={`${typography.label} ${colors.textMuted} mb-4`}>Visão Geral</h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${spacing.gridGap}`}>
            <KPICard titulo="Total de Atendimentos" valor={metricas.total} destaque />
            <KPICard titulo="Realizados" valor={metricas.realizados} />
            <KPICard titulo="Não Realizados" valor={metricas.naoRealizados} />
            <KPICard titulo="Taxa de Realização" valor={`${Math.round((metricas.realizados / metricas.total) * 100)}%`} />
          </div>
        </section>
      )}

      {metricas && (
        <section className={`grid grid-cols-1 lg:grid-cols-2 ${spacing.gridGapLg}`}>
          <GraficoLinha dados={metricas.evolucaoMensal} />
          <GraficoBarras dados={dadosAdvogado} />
        </section>
      )}

      {!metricas && !erro && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </main>
  )
}

export default Dashboard