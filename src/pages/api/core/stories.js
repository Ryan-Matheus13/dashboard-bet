import apiCore from "@/config/api/core/api";
import StorageUtils from "@/utils/utils.helper";
import Cookies from "cookies";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};
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
      const stories_week = [];
      try {
        const response = await apiCore.get(`/stories`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const data = response.data;

          const storiesByWeekDay = Array(7)
            .fill(null)
            .map(() => []);

          data.forEach((story) => {
            const dayIndex = story.dayOfWeek;
            if (dayIndex >= 1 && dayIndex <= 7) {
              storiesByWeekDay[dayIndex - 1].push(
                StorageUtils.transformStoryData([story], dayIndex).data[0]
              );
            }
          });

          storiesByWeekDay.forEach((stories, index) => {
            const dayInfo = weekDays[index];

            stories_week.push({
              day: dayInfo.dayNumber,
              day_name: dayInfo.dayName.toUpperCase(),
              month: dayInfo.month,
              year: dayInfo.year,
              data: stories,
            });
          });

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
    } else if (req.method === "POST") {
      const bodyData = req.body;

      try {
        const response = await apiCore.post(`/stories`, bodyData, {
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
      const { id } = bodyData;
      delete bodyData.id;

      try {
        const response = await apiCore.put(`/stories/${id}`, bodyData, {
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
      const { id } = bodyData;

      try {
        const response = await apiCore.delete(`/stories/${id}`, {
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
