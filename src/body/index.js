import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from "recharts";
import { getPriceData } from "../services/apiService";
import ErrorModal from "../ErrorModal";
import moment from "moment";
// import Col from "react-bootstrap/Col";

const BodyComponent = ({radioValue, 
    hourValue, 
    setBestTimeRange, 
    setWorstTimeRange,
    selectedCountry,
}) => {

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [hourNowI, setHourNowI] = useState(0);
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);

  useEffect(() => {
    //Внутри открыли расинхронную фунцию, которая моментально и запускается
    // немедленно взываемая функция
      (async function () {
        // try пробует выполнить всё, что в его скопе. {}
        // При обнаружении ошибки, try останавливается и запускает catch scope {} передав ему ошибку
        // 
          try {
            // Мы спращиваем, есть ли ответ с api в состоянии копонента
            if(!response){
                // если нет, то мы делаем запрос и сохраняем его состоянии в компонента
                const response = await getPriceData();
                setResponse(response.data);
                return; // Гарантируем, чтобы код дальше не выполнянлся
            }
            // Взяв ответ с api мы выбираем выбранным пользователем страну (ee)
            // на массив с данными, мы запускаем цикл map, который нам возвращает новый массив
           let priceData = response[selectedCountry.key].map(dataObject => {
            // в цикле мы с timestamp взяли часы "HH" и назначили х и у
            // у = цена
            // х = время
            // timestamp = unix timestamp = сколько секунд прошло с 01.01.1970
                return {
                    x: moment.unix(dataObject.timestamp).format('HH'),
                    y: dataObject.price,
                    timestamp: dataObject.timestamp,
                };
            });
            setData(priceData); // назначили новый массив с обработанными данными

            //ищем индекс в котором записан данный час
              const hourNowI = priceData.findIndex(dataObject => {
                  return dataObject.x === moment().format('HH');
              });
              setHourNowI(hourNowI);

              // выделяем/фильтруем массив, где только будущее время, по скольку знаем, что будущее время наступает после 9го индекса.
              const futureData = priceData.filter((v, i) => i >= 9);
              const areaPrices = [];
            // Допустим ищем 3 самых дешёвых часа
            // запускаем цикл на будущие времена
            // каждый цикл берёт будущие 3 часа / 3 элемента с массива
            // суммирует их и записывает в новый массив с текущим индексом
            // таким образом, мы находим самый дешёвый диапозон в 3 часа.
              futureData.forEach((v, i, arr) => {
                  const partData = arr.slice(i, i + hourValue + 1);
                  if (partData.length === hourValue + 1) {
                      let result = 0;
                      for (const p of partData) result += p.y;
                      areaPrices.push({ result, i });
                  }
                  return;
              });
              // сортируем по сумме, дешёвые в начало
              areaPrices.sort((a, b) => a.result - b.result);
              if (radioValue === 'low') {
                // если хотим знать самые дешёвые цены
                // берём будущие времена и ищем объект с ценой по первому/дешёвому индексу
                // составляем нащи данные для графика и счетчика
                  setBestTimeRange({
                      from: futureData[areaPrices[0].i].x,
                      until: futureData[areaPrices[0].i + hourValue].x,
                      timestamp: futureData[areaPrices[0].i].timestamp,
                      bestPrice: futureData[areaPrices[0].i].y,
                  });
              } else {
                // Если хотим самые дорогие, то мы переварачиваем самые дешёвые суммы. Теперь порядок с дорогова к дешёвым
                  areaPrices.reverse();
                  setWorstTimeRange({
                      from: futureData[areaPrices[0].i].x,
                      until: futureData[areaPrices[0].i + hourValue].x,
                      worstPrice: futureData[areaPrices[0].i].y,
                  });
              }
              // добавляем прошлое для графика и назначаем точки выбранного диапозона (3 часа)
              setX1(9 + areaPrices[0].i);
              const x2 = 9 + areaPrices[0].i + hourValue;
              setX2(x2);

          } catch (error) {
              setShowError(true);
              setErrorMessage(error.message);
          }
      })();
  }, [hourValue, data, setBestTimeRange, setWorstTimeRange, radioValue, selectedCountry, response]);

  return (
      <>
          <Row>
              <Col>
                  <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                      <LineChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                          }}
                      >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="x" />
                          <YAxis dataKey="y" />
                          <Tooltip />
                          <Line type="monotone" dataKey="y" stroke="#8884d8" />
                          <ReferenceLine x={hourNowI} stroke="red" />
                          {
                              radioValue === 'low'
                                  ? <ReferenceArea x1={x1} x2={x2} stroke="green" fill="green" opacity={0.4} />
                                  : <ReferenceArea x1={x1} x2={x2} stroke="red" fill="red" opacity={0.4} />
                          }

                      </LineChart>
                  </ResponsiveContainer>
              </Col>
          </Row>
          <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
      </>
  );
};
export default BodyComponent;
