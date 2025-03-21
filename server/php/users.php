<?php
class users extends Conexion
{
    public $Conexions;

    function __construct()
    {

        parent::__construct();
        $this->Conexions = new Conexion;
    }

    public function getValues($arg)
    { //no necesita ningun parámetro realmente.
        $sql = "SELECT * FROM `users`";
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

            $sql2 = "INSERT INTO `users` (`userId`)
                                               VALUES ('$userId')";

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

    public function getUser($arg)
    {
        //print_r($arg);
        $querySuccessful = false;

        foreach ($arg as $jsonString) {
            
            $userId = $jsonString['userId'];
            print_r($userId);

            $sql2 = "SELECT * FROM `users` WHERE userId = '$userId";

            ($this->Conexions->connection->query($sql2)) ? $querySuccessful = true : $querySuccessful = false;
        }
        print_r($querySuccessful);

        if (!$querySuccessful) {
            echo 'petición fallida -> ' . $this->connection->connect_error;
            return 0;
        } else {
            $array = $this->Conexions->connection->query($sql2);
            $response = array();
            while ($row = $array->fetch_assoc()) {
                array_push($response, $row);
            }
            print_r($response);

            json_encode($response, true);
            if (empty($response)) {
                return 0;
            } else
                return 1;
        }
    }
}
