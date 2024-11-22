/* eslint-disable @typescript-eslint/no-explicit-any */
export function splitArrayIntoChunks<T>(
  array: T[],
  chunkSize: number = 20
): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export function getWeekDays() {
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

  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

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

export function transformStreamData(array: any, week_day_number: any) {
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

export function getDayName(dayNumber: any) {
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
