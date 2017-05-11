# Open Weather Widget (Isolated React JS components)
**Easy Start**
**Just import widget reducer to (APP/reducers/index.js), and import Widget Component.**
Working on Openweather API (http://openweathermap.org).

## Demo
[Run Demo](http://react-open-wether-widget.herokuapp.com/)

## Install packages
```
$ npm i
```
## Run development mode
```
$ npm dev
```
## Run production mode
```
$ npm build
$ npm start
```

## Easy to use

### Weather card (today):
```
<WeatherWidgetToday city="Kiev" units="metric" width="300px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
```

**Properties:**

> city (string) <br/>
> units (string) -> metric || imperial <br/>
> appid (string) -> you API key (http://openweathermap.org) <br/>
> width (string) -> default Value = 100% <br/>
> height (string) -> default Value = 310px <br/>


### Weather card (forecast):
```
<WeatherWidgetForecast city="Kiev" units="metric" width="400px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
```

**Properties:**

> city (string) <br/>
> units (string) -> metric || imperial <br/>
> appid (string) -> you API key (http://openweathermap.org) <br/>
> width (string) -> default Value = 100% <br/>
> height (string) -> default Value = 400px <br/>

### Weather card (daily):
```
<WeatherWidgetDaily city="Kiev" units="metric" width="600px" appid="0b05a584505dcf7b077f8aac73f971bd"/>
```

**Properties:**

> city (string) <br/>
> units (string) -> metric || imperial <br/>
> appid (string) -> you API key (http://openweathermap.org) <br/>
> width (string) -> default Value = 100% <br/>
> height (string) -> default Value = 310px <br/>