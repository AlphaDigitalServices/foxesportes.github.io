const fs = require('fs');

exports.handler = async function (event, context) {
  try {
    const data = fs.readFileSync('/javascripts/jsons/response_1739542371739.json', 'utf8');
    const bsData = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(bsData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao processar a requisição" }),
    };
  }
};
