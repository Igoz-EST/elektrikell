import moment from "moment"; // npm пакет для работы с датой\число и время

const apiUrl = 'https://dashboard.elering.ee/api'; //api url

// эскмпортируем расинхронную функцию, которая запрашивает текущую стоимость электроэнергии
// запрос GET /nps/price/ee/current - endpoint
// await позволяет дожидаться ответа с api
// fetch возвращает Promise и при правильном выполнении объект response.
// каждый response имеет функцию .json() которая переводит JSON в JS объект
export async function getCurrentPrice() {
const country = 'EE';
const response = await fetch(`${apiUrl}/nps/price/${country}/current`);
return response.json();
};

export async function getPriceData() {
    // moment() - выдаёт момент с текущем времени и датой
    // .utc конвертирует это в нулевой часовой пояс
    // substract - вычитает
    // .format() - превращает момент объект в стринг с удобным форматом чтения
    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    //URLSearchParams ревращает JS объект в строчку для url
    const params = new URLSearchParams({start, end});
    const response = await fetch(`${apiUrl}/nps/price?${params}`);
    return response.json();
}
