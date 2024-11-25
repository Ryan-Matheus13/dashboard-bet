import apiAuth from "@/config/api/auth/api";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      console.log("aqui");
      const response = await apiAuth.post(
        `/usuario/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
          },
        }
      );

      if (response.status === 200) {
        res.status(200).json(response.data);
      } else if (response.status === 403) {
        res
          .status(403)
          .json({ message: response.response.data || "Acesso Negado!" });
      }
    } catch (error) {
      if (error.response) {
        res
          .status(error.response.status)
          .json({ message: error.response.data || "Acesso Negado!" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
