/* eslint-disable @typescript-eslint/no-explicit-any */
import apiCore from "@/config/api/core/api";
import StorageUtils from "@/utils/utils.helper";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: "Token não fornecido." });
      }

      const weekDays = StorageUtils.getWeekDays();
      const stories_week = [];
      try {
        const response = await apiCore.get(`/stories`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const data = response.data;

          // Cria um array vazio para cada dia da semana
          const storiesByWeekDay = Array(7)
            .fill(null)
            .map(() => []);

          // Organiza as histórias por dia da semana
          data.forEach((story) => {
            const dayIndex = story.dayOfWeek; // dayOfWeek deve estar entre 0 (segunda) e 6 (domingo)
            if (dayIndex >= 0 && dayIndex <= 6) {
              storiesByWeekDay[dayIndex].push(
                StorageUtils.transformStoryData([story], dayIndex).data[0]
              );
            }
          });

          // Monta a estrutura `stories_week` com base nos dias da semana
          storiesByWeekDay.forEach((stories, index) => {
            const dayInfo = weekDays[index]; // Obtém informações sobre o dia da semana

            stories_week.push({
              day: dayInfo.dayNumber,
              day_name: dayInfo.dayName.toUpperCase(),
              month: dayInfo.month,
              year: dayInfo.year,
              data: stories, // Histórias do respectivo dia
            });
          });

          console.log(stories_week);
          res.status(200).json(stories_week);
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
    console.log("error: ", error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data || "Algo deu errado!" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
