/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import apiCore from "@/config/api/core/api";
import Cookies from "cookies";
import bodyParser from 'body-parser';

const jsonMiddleware = bodyParser.json({ limit: '10mb' });

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, jsonMiddleware);

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
    } else if (req.method === "POST") {
      const bodyData = req.body;

      try {
        const response = await apiCore.post(`/game`, bodyData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          res.status(200).json(response.data);
        } else if (response.status === 403) {
          res
            .status(403)
            .json({ message: response.response.data || "Acesso Negado!" });
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
    } else if (req.method === "PUT") {
      const bodyData = req.body;
      const {id} = bodyData
      delete bodyData.id

      try {
        const response = await apiCore.put(`/game/${id}`, bodyData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          res.status(200).json(response.data);
        } else if (response.status === 403) {
          res
            .status(403)
            .json({ message: response.response.data || "Acesso Negado!" });
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
    } else if (req.method === "DELETE") {
      const bodyData = req.body;
      const {id} = bodyData

      try {
        const response = await apiCore.delete(`/game/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 204) {
          res.status(204).json(response.data);
        } else if (response.status === 403) {
          res
            .status(403)
            .json({ message: response.response.data || "Acesso Negado!" });
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
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
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
