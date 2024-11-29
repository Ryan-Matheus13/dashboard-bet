import apiCore from "@/config/api/core/api";
import Cookies from "cookies";

export default async function handler(req, res) {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get("jwt");
    if (!token) {
      res
        .status(403)
        .json({ message: response.response.data || "Token não fornecido." });
    }
    if (req.method === "GET") {
      try {
        const response = await apiCore.get(`/game`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          res.status(200).json(response.data);
        } else if (response.status === 403) {
          res
            .status(403)
            .json({ message: response.response.data || "Algo deu errado!" });
        }
      } catch (error) {
        if (error.message) {
          res
            .status(error.status)
            .json({ message: error.message || "Algo deu errado!" });
        } else if (error.response) {
          res
            .status(error.response.status)
            .json({ message: error.response.data || "Algo deu errado!" });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data || "Algo deu errado!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
