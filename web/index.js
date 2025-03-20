const fetchData = (module, accion, parameters) => {
    return new Promise((resolve, reject) => {
        const url = "https://midnightblue-tiger-539584.hostingersite.com/"
        const json = {
            'module': module,
            'accion': accion,
            'parameters': parameters,
        }
        const data = new FormData()
        data.append('json', JSON.stringify(json))
        const req = new XMLHttpRequest()
        req.open("post", url)
        req.onload = () => {
            (req.status === 200)
                ? resolve(req.responseText)
                : reject(req.error)
        }
        req.send(data)
    })
}

const bringData = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getValues", "{}")
        response = JSON.parse(JSON.parse(response))
        console.log(response)
        let i = 0
        const rowTable = document.getElementById("row_table")
        rowTable.innerHTML = ""
        for (const e of response) {
            i++
            console.log(e)
            let thereIsMovement;
            if (e.thereIsMovement == 1 || e.thereIsMovement == '1')
                thereIsMovement = 'Sí';
            else
                thereIsMovement = 'No';

            rowTable.innerHTML += `
                <tr>
                    <th scope="row">${i}</th>
                    <td scope="col">${e.temperature}</td>
                    <td scope="col">${e.humidity}</td>
                    <td scope="col">${e.noise}</td>
                    <td scope="col">${thereIsMovement}</td>
                    <td scope="col">${e.light}</td>
                    <td scope="col">${formatDate(e.createdAt)}</td>
                </tr>
                `
        }
        // getLastConnection();
    } catch (error) { console.error(error) }
}

const formatDate = (DateResponse) => {
    let newDate = new Date(DateResponse)
    newDate.setHours(newDate.getHours() - 5)
    return newDate.toLocaleString()
}


const getLastConnection = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        const temperature_graphic = document.getElementById("temperature_graphic")
        temperature_graphic.innerHTML = `
            <canvas data-type="linear-gauge" data-width="160" data-height="600" data-border-radius="00" data-borders="0"
                data-bar-stroke-width="20" data-minor-ticks="10"
                data-major-ticks="0,10,20,30,40,50,60,70,80,90,100" data-value="${response[0].temperature}"
                data-units="°C" data-color-value-box-shadow="false">
            </canvas>`
    } catch (error) { console.error(error) }
}

bringData()