import apiCore from "@/config/api/core/api";
import StorageUtils from "@/utils/utils.helper";
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
      const weekDays = StorageUtils.getWeekDays();
      const streams_week = [];
      for (let i = 0; i < weekDays.length; i++) {
        try {
          const response = await apiCore.get(`/week/${i + 1}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            const transformedData = StorageUtils.transformStreamData(
              response.data,
              i + 1
            );

            streams_week.push({
              day: weekDays[i].dayNumber,
              day_name: weekDays[i].dayName.toUpperCase(),
              month: weekDays[i].month,
              year: weekDays[i].year,
              data: transformedData.data,
            });
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
      }

      res.status(200).json(streams_week);
    } else if (req.method === "POST") {
      const bodyData = req.body;

      try {
        const response = await apiCore.post(`/stream`, bodyData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const streamId = response.data.id;
          if (streamId) {
            const responsePatch = await apiCore.patch(
              `/week/${streamId}/adicionar`,
              { dayOfWeek: bodyData.dayOfWeek },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (responsePatch.status === 200) {
              res.status(200).json(responsePatch.data);
            } else {
              res.status(error.status).json({ message: "Algo deu errado!" });
            }
          }
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
