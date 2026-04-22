const weather = (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error fetching weather data' });
        });
};

export { weather };