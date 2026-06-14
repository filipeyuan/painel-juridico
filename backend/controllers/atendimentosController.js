const dados = require('../data/atendimentos.json');

const listar = (req, res) => {
  try {
    const { busca, pagina, limite } = req.query;
    const realizado = req.query.realizado ? decodeURIComponent(req.query.realizado) : null;

    const paginaNum = parseInt(pagina) || 1;
    const limiteNum = parseInt(limite) || 10;

    if (paginaNum < 1) {
      return res.status(400).json({ erro: 'O parâmetro "pagina" deve ser maior que zero.' });
    }

    if (limiteNum < 1 || limiteNum > 500) {
      return res.status(400).json({ erro: 'O parâmetro "limite" deve estar entre 1 e 500.' });
    }

    if (realizado && !['Sim', 'Não'].includes(realizado)) {
      return res.status(400).json({ erro: 'O parâmetro "realizado" deve ser "Sim" ou "Não".' });
    }

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
    const totalPaginas = Math.ceil(total / limiteNum) || 1;

    if (paginaNum > totalPaginas) {
      return res.status(400).json({ erro: `Página ${paginaNum} não existe. Total de páginas: ${totalPaginas}.` });
    }

    const inicio = (paginaNum - 1) * limiteNum;
    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
      dados: paginado,
      total,
      pagina: paginaNum,
      totalPaginas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao listar atendimentos.' });
  }
};

const buscarPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: 'O ID informado não é válido.' });
    }

    const atendimento = dados.find((a) => a.id === id);

    if (!atendimento) {
      return res.status(404).json({ erro: `Atendimento com ID ${id} não encontrado.` });
    }

    res.json(atendimento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao buscar atendimento.' });
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
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao calcular métricas.' });
  }
};

module.exports = { listar, buscarPorId, metricas };