/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
class StorageUtils {
  static splitArrayIntoChunks<T>(array: T[], chunkSize: number = 20): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  static getWeekDays() {
    const weekDays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const result = [];
    const today = new Date();

    const monday = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);

      const dayName = weekDays[currentDay.getDay()];
      const dayNumber = currentDay.getDate();
      const year = currentDay.getFullYear();
      const month = currentDay
        .toLocaleString("pt-BR", { month: "short" })
        .toUpperCase(); // Nome do mês abreviado

      result.push({ dayName, dayNumber, month, year });
    }

    return result;
  }

  static transformStreamData(array: any, week_day_number: any) {
    if (array.length > 0) {
      const transformedData = {
        day: "",
        day_name: "",
        month: "",
        year: "",
        data: array.map((stream: any) => ({
          stream_id: stream.id,
          stream_name: stream.liveName,
          stream_week_day_number: week_day_number,
          stream_live_link: stream.liveLink,
          stream_gif: stream.gifImg,
          stream_start_hour: stream.liveStartHour,
          stream_end_hour: stream.liveEndHour,
          stream_specs: stream.audienceLive,
          stream_is_living: stream.status,
          stream_update_type: stream.tipoAtualizacao,
          stream_is_double_size: false,
          stream_game: {
            id: stream.game.id,
            name: stream.game.gameName,
            icon: stream.game.gameImg,
            link: stream.game.gameLink,
          },
        })),
      };

      return transformedData;
    }

    return [];
  }

  static transformStoryData(array: any, week_day_number: any) {
    if (array.length > 0) {
      const transformedData = {
        day: "",
        day_name: "",
        month: "",
        year: "",
        data: array.map((story: any) => ({
          story_id: story.id,
          story_dayOfWeek: week_day_number,
          story_title: story.title,
          story_description: story.description,
          story_thumbnail: story.thumbnail,
          story_image: story.image,
          story_actionTo: story.actionTo,
          story_actionTarget: story.actionTarget,
          story_actionTitle: story.actionTitle,
        })),
      };

      return transformedData;
    }

    return [];
  }

  static formatStory(input: any): any {
    return {
      id: input.story_id || "",
      dayOfWeek: input.story_dayOfWeek ?? null,
      title: input.story_title || "",
      description: input.story_description || "",
      thumbnailFile: input.story_thumbnail || null,
      imageFile: input.story_image || null,
      thumbnailBase64: null,
      imageBase64: null,
      actionTo: input.story_actionTo || "",
      actionTarget: input.story_actionTarget || "",
      actionTitle: input.story_actionTitle || "",
    };
  }

  static getDayName(dayNumber: any) {
    const weekDays = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];

    if (dayNumber < 1 || dayNumber > 7) {
      throw new Error("O número do dia deve estar entre 1 e 7");
    }

    return weekDays[dayNumber - 1];
  }

  static setDataJwtToken(value: string) {
    // Armazenar o token em um cookie com um tempo de expiração (exemplo: 7 dias)
    Cookies.set("jwt", value, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    console.log("Token salvo no cookie");
  }

  // Recupera o token do cookie
  static getDataJwtToken() {
    // Verifica se estamos no cliente
    const valueJwtToken = Cookies.get("jwt"); // Recupera o cookie "jwt"
    console.log("Token do cookie:", valueJwtToken);

    if (!valueJwtToken) {
      console.log("Nenhum token encontrado no cookie.");
      return false; // Retorna falso caso o token não exista
    }

    try {
      const parsedToken = JSON.parse(valueJwtToken); // Parseia o valor JSON do cookie
      console.log("Token JSON parseado:", parsedToken);
      return parsedToken; // Retorna o token parseado
    } catch (error) {
      console.error("Erro ao parsear o token:", error);
      return false; // Retorna falso se não for possível parsear o token
    }
  }

  // Remove o token do cookie
  static deleteDataJwtToken() {
    Cookies.remove("jwt");
    console.log("Token removido do cookie");
  }
}

export default StorageUtils;
