import React from "react";
const API_WEATHER="http://localhost:8080/weather-service/weathers?cityName=";
// Stateless component
// const Weather = (props) => {
//     // 1 .
//     // class 형태로 변경 후 fetch 선택 도시의 날씨
//     // 2 .
//     // react Hook << 검색
//     // state, setState
//     const { cityName } = props.match.params;
//     console.log(cityName);
//     return (
//         <div>
//             <h1>Weather : {cityName}</h1>
//             <p>Here is front page.!</p>
//         </div>
//     );
// };

class Weather extends React.Component {
    state = {
        cityName: "",
        main:"",
        description:"",
        celcius:0,
    };
    
    componentDidMount(){
        const {cityName} = this.props.match.params;
        const weatherData = fetch(API_WEATHER+cityName)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({
                cityName: cityName,
                main:data.weather[0].main,
                description:data.weather[0].description,
                celcius:(data.main.temp-273.15).toFixed(2),
            });
        });
    }
    render(){
        const {cityName, main, description, celcius} = this.state;
        return(
            <div>
                <h2>Current Weather of {cityName}</h2>
                <ul>
                    <li>도시이름 : {cityName}</li>
                    <li>날씨 : {main}</li>
                    <li>날씨 상세 : {description}</li>
                    <li>온도 : {celcius}`C</li>
                </ul>
            </div>
        )
    }
}

export default Weather;