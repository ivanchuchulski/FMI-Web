<?php
    header("Content-type: application/json");

    $successResponse = [];
    $errors = [];

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $formData = json_decode($_POST["data"], true);

        $username = $formData["usernameField"];
        $password = $formData["passwordField"];
        $passwordRepeated = $formData["passwordRepeatedField"];
        
        // error handling and validation
        // TODO
        
        // build successResponse
        $successResponse["username"] = $username;
        $successResponse["password"] = $password;
        $successResponse["passwordRepeated"] = $passwordRepeated;
    }
    else {
        $errors["requestType"] = 'error : invalid request type';
    }

    $errorsuccessResponseCode = 400;
    $successsuccessResponseCode = 200;

    if ($errors) {
        http_response_code($errorsuccessResponseCode);
        echo json_encode($errors);
    }
    else {
        http_response_code($successsuccessResponseCode);
        echo json_encode($successResponse);
    }

    function testInput($input) {
        $input = trim($input);
        $input = htmlspecialchars($input);
        $input = stripslashes($input);
    
        return $input;
      }

?>