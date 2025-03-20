<?php
class hackathonusta2025_1 extends Conexion
{
    public $Conexions;

    function __construct()
    {

        parent::__construct();
        $this->Conexions = new Conexion;
    }

    public function getValues($arg)
    { //no necesita ningun parámetro realmente.
        $sql = "SELECT * FROM `hackathonusta2025-1`";
        $array = $this->Conexions->connection->query($sql);
        if (!$this->Conexions->connection->query($sql) === true) {

            echo "\n- Error en la petición -> " . $this->connection->connect_error . "\n";
        }
        $response = array();
        while ($row = $array->fetch_assoc()) {
            array_push($response, $row);
        }
        return json_encode($response, true);
        //return $response;
    }

    public function getSystemVar($arg)
    { //no necesita ningun parámetro realmente.
        $sql = "SELECT * FROM systemVar";
        $array = $this->Conexions->connection->query($sql);
        if (!$this->Conexions->connection->query($sql) === true) {

            echo "\n- Error en la petición -> " . $this->connection->connect_error . "\n";
        }
        $response = array();
        while ($row = $array->fetch_assoc()) {
            array_push($response, $row);
        }
        //return json_encode($response, true);
        return $response;
    }

    public function setSystemVar($arg)
    {
        //print_r($arg);
        $field = $arg['field'];
        $value = $arg['value'];
        $sql = "UPDATE systemVar SET $field = '$value' WHERE 1";

        if (!$this->Conexions->connection->query($sql)) {
            echo 'petición fallida -> ' . $this->connection->connect_error;
            return 0;
        } else {
            //return '{1: 1}';
            return 1;
        }
    }

    public function addData($arg)
    {
        //print_r($arg);
        $querySuccessful = false;

        foreach ($arg as $jsonString) {
            //print_r($jsonString);

            // Acceder a los valores
            $temperature = $jsonString['temperature'];
            $humidity = $jsonString['humidity'];
            $noise = $jsonString['noise'];
            $thereIsMovement = $jsonString['thereIsMovement'];
            $light = $jsonString['light'];

            $sql2 = "INSERT INTO `hackathonusta2025-1` (`temperature`, `humidity`, `noise`, `thereIsMovement`, `light`)
                                               VALUES ('$temperature','$humidity','$noise', '$thereIsMovement','$light')";

            ($this->Conexions->connection->query($sql2)) ? $querySuccessful = true : $querySuccessful = false;
        }
        if (!$querySuccessful) {
            echo 'petición fallida -> ' . $this->connection->connect_error;
            return 0;
        } else {
            //return '{1: 1}';
            return 1;
        }
    }

    public function getLastData($arg)
    {
        //print_r($arg);
        $sql = "SELECT * FROM monitoreoBioGas ORDER BY id DESC LIMIT 1"; //me traigo el último grupo ingresado
        $array = $this->Conexions->connection->query($sql);

        $row_response = $array->fetch_assoc();
        if (empty($row_response)) {
            echo 'petición fallida -> ' . $this->connection->connect_error;
            //return 0;
        } else {
            $group = $row_response['group'];

            $sql = "SELECT * FROM monitoreoBioGas WHERE `group` = '$group'";
            $array = $this->Conexions->connection->query($sql);
            if (!$this->Conexions->connection->query($sql) === true) {
                echo "\n- Error en la petición -> " . $this->connection->connect_error . "\n";
            }
            $response = array();
            while ($row = $array->fetch_assoc()) {
                array_push($response, $row);
            }
            return $response;
        }
    }

    public function getlastConnection($arg)
    { //no necesita ningun parámetro realmente.
        $sql = "SELECT * FROM lastConnection WHERE id = 1";
        $array = $this->Conexions->connection->query($sql);
        if (!$this->Conexions->connection->query($sql) === true) {
            echo "\n- Error en la petición -> " . $this->connection->connect_error . "\n";
        }
        $response = array();
        while ($row = $array->fetch_assoc()) {
            array_push($response, $row);
        }
        //return json_encode($response, true);
        return $response;
    }

    public function setlastConnection($arg)
    {
        $numAleatorio = rand(1, 100);
        $sql = "UPDATE lastConnection SET anyValue = '$numAleatorio' WHERE id = 1";

        if (!$this->Conexions->connection->query($sql)) {
            echo 'petición fallida -> ' . $this->connection->connect_error;
            return 0;
        } else {
            //return '{1: 1}';
            return 1;
        }
    }
}
