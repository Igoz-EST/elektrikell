# Elektrikell app.

This project is build on react framework with bootstrap elements. [Create React App](https://github.com/facebook/create-react-app).

## What is this app about?

In this web app, you can see the price of electricity at a specific time. You can also change the country, to see their prices to compare. Another feature of this app is that you can choose the hours range to see the electricity's lowest and highest price times.

## Why react?

React JS allows complete flexibility to the developer.You can add as many external libraries and tools as required and build a massive, complicated web application. ReactJS will ensure your app performance is optimized.

### Key benefits of react js for front-end development

 ◉ Speed

 ◉ Flexibility

 ◉ Performance

 ◉ Usability

 ◉ Reusable Components

 ◉ It's easy to learn

 ◉ It helps to build rich user interfaces

 ◉ It allows writing custom components

# How this app works

Our project works with the API to display up-to-date information about electricity prices and times. We take this information from [elering.ee](https://elering.ee/)

```
const apiUrl = 'https://dashboard.elering.ee/api';

export async function getCurrentPrice(selectedCountry) {
const country = selectedCountry.key;
const response = await fetch(`${apiUrl}/nps/price/${country}/current`);
return response.json();
};

```

In the code above, we are exporting the async function, which is awaiting the server response, and saving it to the variable 'response'.

## Displaying data

To display the received data, we used the library named [Recharts](https://recharts.org/en-US/). This library allows you to build charts with your data.


### `JSX example:`
```
 return (
        <>
            <Row>
                <Col>
                    <ResponsiveContainer width="100%" height="100%" minHeight="500px">
                        <LineChart
                            width={500}
                            height={300}
                            data={data.priceData}
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
```

## Data processing

To work with time, we used a library called [momentjs](https://momentjs.com/). This library makes it more convenient to work with time. It will help us to work with the receiving data.

```
let priceData = response[selectedCountry.key].map(dataObject => {
                    return {
                        x: moment.unix(dataObject.timestamp).format('HH'),
                        y: dataObject.price,
                        timestamp: dataObject.timestamp,
                    };
                }
```
In the code above, we are making a new array, which has objects with processed data.

## Optimization

To optimize our project and rid of extra rerenders, we used Redux.
### What are the advantages of Redux?

It is very difficult to reuse the components in React because it is tightly coupled with the root component. Redux reduces this complexity and provides global accessibility that helps to build applications that work frequently; are easy to test and run in different environments (client, server, and native).

![Redux explanation](https://synergytop.com/wp-content/uploads/2019/06/Store.png)


## Multipage

Why use React Router? React Router, and dynamic, client-side routing, allows us to build a single-page web application with navigation without the page refreshing as the user navigates. React Router uses component structure to call components, which display the appropriate information.