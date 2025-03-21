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
                    <td scope="col">${e.temperatureOperation}</td>
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


const getLastTemperature = async () => {
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

const getLastLuminocidad = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        var gauge = new RadialGauge({
            renderTo: 'luminocidad_graphicCanvas',
            width: 390,
            height: 390,
            units: 'Lx',
            title: false,
            value: response[0].light,
            minValue: 900,
            maxValue: 4200,
            majorTicks: [
                '900', '1200', '1500', '1800', '2100', '2400', '2700', '3000', '3300', '3600', '3900', '4200'
            ]
        }).draw();
    } catch (error) { console.error(error) }
}

const getLastOperationTemperature = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        const temperature_graphic = document.getElementById("temperatureOperation_graphic")
        temperature_graphic.innerHTML = `
            <canvas data-type="linear-gauge" data-width="160" data-height="600" data-border-radius="00" data-borders="0"
                data-bar-stroke-width="20" data-minor-ticks="10"
                data-major-ticks="0,10,20,30,40,50,60,70,80,90,100" data-value="${response[0].temperatureOperation}"
                data-units="°C" data-color-value-box-shadow="false">
            </canvas>`
    } catch (error) { console.error(error) }
}

const getLasnoise = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        var gauge = new RadialGauge({
            renderTo: 'noise_graphic',
            width: 600,
            height: 400,
            units: "dB",
            minValue: 1500,
            maxValue: 2050,
            // startAngle: 10,
            // ticksAngle: 180,
            valueBox: false,
            majorTicks: [
                "1500", "1550", "1600", "1650", "1700", "1750", "1800", "1850", "1900", "1950", "2000", "2050"
            ],
            minorTicks: 6,
            // strokeTicks: true,
            highlights: [
                {
                    "from": 1900,
                    "to": 2050,
                    "color": "rgba(200, 50, 50, .75)"
                }
            ],
            colorPlate: "#fff",
            borderShadowWidth: 0,
            borders: false,
            needleType: "arrow",
            needleWidth: 2,
            needleCircleSize: 7,
            needleCircleOuter: true,
            needleCircleInner: false,
            animationDuration: 1500,
            animationRule: "linear",
            animationTarget: "plate",
            value: response[0].noise
        }).draw();
    } catch (error) { console.error(error) }
}

const getLastHayPersonal = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        const hayPersonalButton = document.getElementById("switch-label")
        if (response[0].thereIsMovement == 1 || response[0].thereIsMovement == '1')
            hayPersonalButton.checked = true;
        else
            hayPersonalButton.checked = false;

    } catch (error) { console.error(error) }
}

const getLastHumidity = async () => {
    try {
        let response = await fetchData("hackathonusta2025_1", "getLastData", "{}")
        response = JSON.parse(response)
        console.log(response)
        const humidityBar = document.getElementById('humidityBar');
        const humidityValue = document.getElementById('humidityValue');

        humidityBar.style.height = `${response[0].humidity}%`;
        humidityValue.textContent = `${response[0].humidity}%`;
    } catch (error) { console.error(error) }
}

function toggleRegister() {
    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');

    registerSection.style.display = registerSection.style.display === 'none' ? 'block' : 'none';
    loginSection.style.display = loginSection.style.display === 'block' ? 'none' : 'block';
}

const registerUser = async () => {
    const newUserId = document.getElementById('newUserId').value;
    const validIds = ["12345", "67890", "abcde"]; // IDs válidos de ejemplo
    const registerAlertBox = document.getElementById('registerAlert');
    registerAlertBox.style.display = 'block';

    try {
        if (!newUserId) {
            registerAlertBox.textContent = 'Por favor, ingresa un ID válido';
            registerAlertBox.className = 'custom-alert error';
            return;
        }
        parameters = [{ "userId": newUserId }];
        console.log(parameters)
        let response = await fetchData("users", "addData", parameters)
        response = JSON.parse(JSON.parse(response))
        console.log(response)

        // if (validIds.includes(newUserId)) {
        //     registerAlertBox.textContent = 'El ID ya está registrado';
        //     registerAlertBox.className = 'custom-alert error';
        // } else {
        if (response == 1 || response == '1') {
            validIds.push(newUserId);
            registerAlertBox.textContent = 'Registro exitoso';
            registerAlertBox.className = 'custom-alert success';
            document.getElementById('newUserId').value = '';
            // }
        }

        setTimeout(() => registerAlertBox.style.display = 'none', 3000);
    } catch (error) { console.error(error) }
}

const authenticate = async () => {
    const userId = document.getElementById('userId').value;
    const alertBox = document.getElementById('alert');
    let validIds = false;

    try {
        alertBox.style.display = 'block';

        if (!userId) {
            alertBox.textContent = 'Por favor, ingresa tu ID';
            alertBox.className = 'custom-alert error';
            return;
        }

        let response = await fetchData("users", "getValues", "{}")
        response = JSON.parse(JSON.parse(response))
        console.log(response)
        let i = 0
        for (const e of response) {
            i++
            console.log(e)
            if (e.userId == userId) {
                validIds = true;
            }
        }

        if (validIds) {
            alertBox.textContent = 'Acceso autorizado';
            alertBox.className = 'custom-alert success';
            loginAddData(1);
        } else {
            alertBox.textContent = 'Acceso denegado. Usuario inexistente';
            alertBox.className = 'custom-alert error';
            loginAddData(0);
        }

        setTimeout(() => alertBox.style.display = 'none', 3000); // Ocultar después de 3 segundos

    } catch (error) { console.error(error) }
}

const loginAddData = async (joined) => {
    const userId = document.getElementById('userId').value;

    try {
        parameters = [{
            "userId": userId,
            "joined": joined
        }];
        console.log(parameters)
        let response = await fetchData("historialIngresos", "addData", parameters)
        // response = JSON.parse(JSON.parse(response))
        console.log(response)
    } catch (error) { console.error(error) }
}

bringData()