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
        let response = await fetchData("rocket", "getlastConnection", "{}")
        response = JSON.parse(response)
        console.log(response)
        let i = 0
        const rowTable = document.getElementById("lastConnection")
        rowTable.innerHTML = ""
        for (const e of response) {
            i++
            rowTable.innerHTML += `
                ${formatDate(e.modifiedAt)}
            `
        }
    } catch (error) { console.error(error) }
}

bringData()