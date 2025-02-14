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
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjJmOGYwNDZmLTQ2YTktNDUzOC04ZGUyLWExM2UwYmViZTg2YyIsImlhdCI6MTczOTU1MTU3NSwic3ViIjoiZGV2ZWxvcGVyLzM1YjYwZjAwLTgxNzItZTZmMi0wNDgwLTNkMmU3NWIyMjA4ZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTguMTg4LjQ1LjM1IiwiMTMuNTguMTUuMTc5Il0sInR5cGUiOiJjbGllbnQifV19.esOqJX0kbJ_5zhzYZQgge69k6ZNk2Emvs9un_JDb6fSXduNKCh0MpLAOpCv6XgEq37IWxRf_6yQoOkaPy54Gpg"
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