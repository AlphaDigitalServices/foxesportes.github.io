const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Caminho do diretório onde os arquivos JSON estão localizados dentro do Lambda
    const directoryPath = path.join(__dirname, 'javascripts/jsons');

    // Regex para encontrar o arquivo correspondente
    const regex = /response_\d+\.json$/;

    // Lendo o conteúdo do diretório
    const files = fs.readdirSync(directoryPath);

    // Encontrando o arquivo que corresponde ao padrão
    const matchedFile = files.find(file => regex.test(file));

    if (!matchedFile) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Arquivo não encontrado" }),
      };
    }

    // Caminho completo do arquivo encontrado
    const filePath = path.join(directoryPath, matchedFile);

    // Lendo o conteúdo do arquivo
    const data = fs.readFileSync(filePath, 'utf8');
    const bsData = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(bsData),
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao processar a requisição" }),
    };
  }
};
