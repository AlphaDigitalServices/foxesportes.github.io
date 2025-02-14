const axios = require("axios");

class BrawlStarsAPI {
  constructor(apiKey) {
    this.baseUrl = "https://api.brawlstars.com/v1";
    this.apiKey = apiKey;
  }

  async getClubMembers(clubTag) {
    try {
      if (!clubTag) {
        throw new Error("ClubTag não fornecido.");
      }
      const encodedTag = encodeURIComponent(clubTag.trim());
      const response = await axios.get(`${this.baseUrl}/clubs/${encodedTag}/members`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return {
        error: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao buscar os membros do clube",
      };
    }
  }
}

exports.handler = async function (event) {
  try {
    const apiKey = ""
    if (!apiKey) throw new Error("API Key não configurada.");

    const clubTag = event.queryStringParameters?.clubTag?.trim() || "%232V2JQR82Y";
    const api = new BrawlStarsAPI(apiKey);
    const members = await api.getClubMembers(clubTag);

    return {
      statusCode: members.error ? members.error : 200,
      body: JSON.stringify(members),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};