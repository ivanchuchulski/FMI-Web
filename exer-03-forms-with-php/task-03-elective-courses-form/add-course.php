<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>backend</title>
</head>
<body>
    <?php
    function formatInput($formField) {
        $formField = trim($formField);
        $formField = stripslashes($formField);
        $formField = htmlspecialchars($formField);
        
        return $formField;
    }

    class FormData 
    {
        private $validData;
        private $inputDataErrors;
        
        public function __construct()
        {
            $validData = array();
            $inputDataErrors = array();
        }

        public function &getValidData()
        {
            return $this->validData;
        }

        public function &getInputDataErrors()
        {
            return $this->inputDataErrors;
        }

        public function addValidField($fieldName, $fieldData)
        {
           $this->validData[$fieldName] = formatInput($fieldData);
        }

        public function addError($fieldName, $errorMessege)
        {
           $this->inputDataErrors[$fieldName] = formatInput($errorMessege);
        }

        private function formatInput($formField) {
            $formField = trim($formField);
            $formField = stripslashes($formField);
            $formField = htmlspecialchars($formField);
            
            return $formField;
        }
    }

    function validateCourse($course, &$formData)
    {
        if (empty($course)) {
            $formData->addError("course", "error : course field is required");
        } 
        elseif (strlen($course) > 150) {
            $formData->addError("course", "error : course field max len is 150 chars");
        }
        else {
            $formData->addValidField("course", $course);
        } 
    }

    function validateLecturer($lecturer, &$formData)
    {
        if (empty($lecturer)) {
            $formData->addError("lecturer", "error : lecturer field is required");
        } 
        elseif (strlen($lecturer) > 200) {
            $formData->addError("lecturer", "error : lecturer field max len is 200 chars");
        }
        else {
            $formData->addValidField("lecturer", $lecturer);
        } 
    }

    function validateDescribtion($describtion, &$formData)
    {
        if (empty($describtion)) {
            $formData->addError("describtion", "error : describtion field is required");
        } 
        elseif (strlen($describtion) < 10) {
            $formData->addError("describtion", "error : describtion field min len is 10 chars");
        }
        else {
            $formData->addValidField("describtion", $describtion);
        } 
    }


    $formData = new FormData();

    validateCourse($_POST['course'], $formData);
    validateLecturer($_POST['lecturer'], $formData);
    validateDescribtion($_POST['describtion'], $formData);
    $formData->addValidField("group", $_POST['group']);

    // $a = 'name';
    // $arr = array();
    // $arr[$a] = 'opa';
    // var_dump($arr);

    var_dump($formData->getValidData());
    var_dump($formData->getInputDataErrors());



    ?>
    
</body>
</html>