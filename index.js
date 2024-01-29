function getForm() {
    const form = document.querySelector("form");
    let input = document.querySelector("input");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputValue = input.value
        retrieveData(inputValue)
    })

    async function retrieveData(city) {
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=08a923b93f0443539a6145034242901&q=${city}`, { mode: 'cors' })
        const dataFormated = await data.json()
        console.log(dataFormated.current.temp_c)
        input.value = `${dataFormated.location.name}, ${dataFormated.location.region
            ? dataFormated.location.region
            : dataFormated.location.country}`
        renderData(input.value, dataFormated.current.temp_c)
    }
}

async function retrieveDataDefault() {
    let input = document.querySelector("input");
    const data = await fetch('https://api.weatherapi.com/v1/current.json?key=08a923b93f0443539a6145034242901&q=london', { mode: 'cors' })
    const dataFormated = await data.json()
    console.log(dataFormated.current.temp_c)
    input.value = `${dataFormated.location.name}, ${dataFormated.location.region
        ? dataFormated.location.region
        : dataFormated.location.country}`
        renderData(input.value, dataFormated.current.temp_c)
}

const renderData = (city, temperature) => {
    const citySpan = document.querySelector("#city")
    const temperatureSpan = document.querySelector("#temperature")

    citySpan.textContent = `The temperature in ${city} is`
    temperatureSpan.textContent = `${temperature}° Celcius`
}

getForm()
retrieveDataDefault()

