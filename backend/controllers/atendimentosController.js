const dados = require('../data/atendimentos.json');

const listar = (req, res) => {
  try {
    const { busca, realizado, pagina = 1, limite = 10 } = req.query;

    let resultado = [...dados];

    if (busca) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(
        (a) =>
          (a.nome_cliente && a.nome_cliente.toLowerCase().includes(termo)) ||
          (a.advogado && a.advogado.toLowerCase().includes(termo)) ||
          (a.organizacao && a.organizacao.toLowerCase().includes(termo))
      );
    }

    if (realizado) {
      resultado = resultado.filter((a) => a.realizado === realizado);
    }

    const total = resultado.length;
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;
    const fim = inicio + limiteNum;
    const paginado = resultado.slice(inicio, fim);

    res.json({
      dados: paginado,
      total,
      pagina: paginaNum,
      totalPaginas: Math.ceil(total / limiteNum),
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar atendimentos' });
  }
};

const buscarPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const atendimento = dados.find((a) => a.id === id);
    if (!atendimento) {
      return res.status(404).json({ erro: 'Atendimento não encontrado' });
    }
    res.json(atendimento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar atendimento' });
  }
};

const metricas = (req, res) => {
  try {
    const total = dados.length;
    const realizados = dados.filter((a) => a.realizado === 'Sim').length;
    const naoRealizados = dados.filter((a) => a.realizado === 'Não').length;

    const porMes = {};
    dados.forEach((a) => {
      if (a.data) {
        const mes = a.data.substring(0, 7);
        porMes[mes] = (porMes[mes] || 0) + 1;
      }
    });

    const evolucaoMensal = Object.entries(porMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, quantidade]) => ({ mes, quantidade }));

    const porAdvogado = {};
    dados.forEach((a) => {
      if (a.advogado) {
        porAdvogado[a.advogado] = (porAdvogado[a.advogado] || 0) + 1;
      }
    });

    res.json({
      total,
      realizados,
      naoRealizados,
      evolucaoMensal,
      porAdvogado,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao calcular métricas' });
  }
};

module.exports = { listar, buscarPorId, metricas };