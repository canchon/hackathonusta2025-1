<?php
class historialIngresos extends Conexion
{
    public $Conexions;

    function __construct()
    {

        parent::__construct();
        $this->Conexions = new Conexion;
    }

    public function getValues($arg)
    { //no necesita ningun parámetro realmente.
        $sql = "SELECT * FROM `historialIngresos`";
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

    public function addData($arg)
    {
        //print_r($arg);
        $querySuccessful = false;

        foreach ($arg as $jsonString) {
            //print_r($jsonString);

            // Acceder a los valores
            $userId = $jsonString['userId'];
            $joined = $jsonString['joined'];

            $sql2 = "INSERT INTO `historialIngresos` (`userId`, `joined`)
                                            VALUES ('$userId', '$joined')";

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
    public function getLastJoined($arg)
    { //no necesita ningun parámetro realmente.
        //print_r($arg);
        $sql = "SELECT joined FROM `historialIngresos` ORDER BY id DESC LIMIT 1";
        $array = $this->Conexions->connection->query($sql);
        if (!$this->Conexions->connection->query($sql) === true) {
            echo "\n- Error en la petición -> " . $this->connection->connect_error . "\n";
        }
        $response = array();
        while ($row = $array->fetch_assoc()) {
            array_push($response, $row);
        }
        //print_r($response);
        //print_r($response['joined']);
        //return json_encode($response, true);
        return $response[0]['joined'];
    }
}
