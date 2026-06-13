import { Button } from "@/components/ui/button"

function ExportarDados({ dados }) {
  const exportarCSV = () => {
    const cabecalho = ["ID", "Cliente", "Data", "Hora Início", "Hora Fim", "Advogado", "Organização", "Realizado", "Status"]
    const linhas = dados.map((a) => [
      a.id, a.nome_cliente, a.data, a.hora_inicio, a.hora_fim,
      a.advogado || "", a.organizacao || "", a.realizado, a.status
    ])
    const csv = [cabecalho, ...linhas].map((l) => l.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "atendimentos.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportarPDF = async () => {
    const { jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")
    const doc = new jsPDF()

    doc.setFontSize(14)
    doc.text("Relatório de Atendimentos - RMH Advocacia", 14, 15)
    doc.setFontSize(10)
    doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 22)

    autoTable(doc, {
      startY: 28,
      head: [["Cliente", "Data", "Horário", "Advogado", "Realizado"]],
      body: dados.map((a) => [
        a.nome_cliente, a.data,
        `${a.hora_inicio} - ${a.hora_fim}`,
        a.advogado || "—", a.realizado
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [201, 168, 76] },
    })

    doc.save("atendimentos.pdf")
  }

  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={exportarCSV}>
        Exportar CSV
      </Button>
      <Button onClick={exportarPDF}>
        Exportar PDF
      </Button>
    </div>
  )
}

export default ExportarDados