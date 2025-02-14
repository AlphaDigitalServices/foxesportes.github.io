const axios = require("axios");

class BrawlStarsAPI {
  constructor(apiKey) {
    this.baseUrl = "https://api.brawlstars.com/v1";
    this.apiKey = apiKey;
  }

  async getClubMembers(clubTag) {
    try {
      const encodedTag = encodeURIComponent(clubTag);
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
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjljNDg3OGJkLTBiZTYtNDk5NC05ZDlkLTc0NjdlZjQyOTIzZSIsImlhdCI6MTczOTUzODc1OSwic3ViIjoiZGV2ZWxvcGVyLzM1YjYwZjAwLTgxNzItZTZmMi0wNDgwLTNkMmU3NWIyMjA4ZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuMjM0LjEwNi44MCIsIjEwMC4yOC4yMDEuMTU1IiwiMTcwLjIzMy4yMjkuNTUiLCIyMDEuNDguNDkuOTkiXSwidHlwZSI6ImNsaWVudCJ9XX0.4emqXgVEmyVVesYU4xVvE6KYsf15oebY1unsRz99358XHWJGvG8NiP16CHp1icDqYjr3ehPC3wEcd7j7oaJ2vg";
  const clubTag = event.queryStringParameters?.clubTag || "#2V2JQR82Y";

  const api = new BrawlStarsAPI(apiKey);
  const members = await api.getClubMembers(clubTag);

  return {
    statusCode: members.error ? members.error : 200,
    body: JSON.stringify(members),
  };
};
