import apiCore from "@/config/api/core/api";
import { getWeekDays, transformStreamData } from "@/utils/utils.helper";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const weekDays = getWeekDays();
    const streams_week = [];

    for (let i = 0; i < weekDays.length; i++) {
      try {
        const response = await apiCore.get(`/week/${i + 1}`);

        console.log("teste: ", response);

        if (response.status === 200) {
          const transformedData = transformStreamData(response.data, i + 1);

          streams_week.push({
            day: weekDays[i].dayNumber,
            day_name: weekDays[i].dayName.toUpperCase(),
            month: weekDays[i].month,
            year: weekDays[i].year,
            data: transformedData.data,
          });

          res.status(200).json(streams_week);
        } else if (response.status === 403) {
          res
            .status(403)
            .json({ message: response.response.data || "Acesso Negado!" });
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          res
            .status(error.response.status)
            .json({ message: error.response.data || "Acesso Negado!" });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
