import { colors, rounded, shadows, typography } from "@/styles/tokens"

const API = "http://localhost:3001/api/atendimentos"

function ExportarDados({ busca = "", filtroRealizado = "" }) {
  const buscarTodos = async () => {
    const params = new URLSearchParams({ pagina: 1, limite: 500, busca, realizado: filtroRealizado })
    const res = await fetch(`${API}?${params}`)
    const data = await res.json()
    return data.dados
  }

  const exportarCSV = async () => {
    try {
      const todos = await buscarTodos()
      const cabecalho = ["ID", "Cliente", "Data", "Hora Início", "Hora Fim", "Advogado", "Organização", "Realizado"]
      const linhas = todos.map((a) => [
        a.id, a.nome_cliente, a.data, a.hora_inicio, a.hora_fim,
        a.advogado || "", a.organizacao || "", a.realizado
      ])
      const csv = [cabecalho, ...linhas].map((l) => l.join(",")).join("\n")
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "atendimentos.csv"
      link.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("Não foi possível exportar os dados. Tente novamente.")
    }
  }

  const exportarPDF = async () => {
    try {
      const todos = await buscarTodos()
      const { jsPDF } = await import("jspdf")
      const { default: autoTable } = await import("jspdf-autotable")
      const doc = new jsPDF()
      doc.setFontSize(14)
      doc.text("Relatório de Atendimentos", 14, 15)
      doc.setFontSize(10)
      doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 22)
      if (busca) doc.text(`Busca: ${busca}`, 14, 28)
      if (filtroRealizado) doc.text(`Filtro: ${filtroRealizado}`, 14, busca ? 34 : 28)
      autoTable(doc, {
        startY: busca || filtroRealizado ? 40 : 28,
        head: [["Cliente", "Data", "Horário", "Advogado", "Realizado"]],
        body: todos.map((a) => [
          a.nome_cliente, a.data,
          `${a.hora_inicio} - ${a.hora_fim}`,
          a.advogado || "—", a.realizado
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [201, 168, 76] },
      })
      doc.save("atendimentos.pdf")
    } catch {
      alert("Não foi possível exportar o PDF. Tente novamente.")
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportarCSV}
        className={`px-4 py-2 ${rounded.md} ${shadows.button} ${typography.body} border ${colors.borderGreen} ${colors.textGreen} ${colors.bgGreenHover} hover:text-white transition-colors`}
      >
        Exportar CSV
      </button>
      <button
        onClick={exportarPDF}
        className={`px-4 py-2 ${rounded.md} ${shadows.button} ${typography.body} ${colors.bgGold} ${colors.textWhite} ${colors.bgGoldHover} transition-colors`}
      >
        Exportar PDF
      </button>
    </div>
  )
}

export default ExportarDados