(function() {
    let submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', submitForm);
})();

function submitForm(clickEvent) {
    const url = 'https://jsonplaceholder.typicode.com/users'; 

    
    clickEvent.preventDefault();

    ajax('GET', url)
        .then(handleRequest)
        .catch(console.error)
}

function ajax(method, url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.onload = function() {
            resolve(xhr.responseText);
        }

        xhr.onerror = reject; 
        xhr.open(method, url, true);
        xhr.send();
    });
}

function handleRequest(responseText) {
    try {
        let response = JSON.parse(responseText);
        let formData = {
            name: null, 
            username : null, 
            email: null, 
            password :null,
        };
        
        formData['name'] = validateName();
        formData['username'] = validateUsername();
        formData['email'] = validateEmail();
        formData['password'] = validatePassword();
        
        // console.log(formData);
        // console.log(response);

        Object.keys(response).forEach(key => {
            let { username } = response[key];

            // console.log('username : ' + username);

            if (formData['username'] === username) {
                throw 'error : user already registered'
            }
        })

        displaySuccessPage();
    } 
    catch (error) {
        displayErrors(error)
    }
}

function validateName() {
    const lowerLimit = 2;
    const upperLimit = 50;
    const pattern = `^[A-Za-z ]{${lowerLimit},${upperLimit}}$`;
    const regex = new RegExp(pattern);
    const elementId = 'name';

    let name = document.getElementById(`${elementId}`).value;

    if (name === '') {
        throw 'error : first and last name is required';
    }

    if (!name.match(regex)) {
        throw `error : first and last name must contain only letters and be between ${lowerLimit} and ${upperLimit} symbols`;
    }

    return formatInput(name);
}

function validateUsername() {
    const lowerLimit = 3;
    const upperLimit = 10;
    const pattern = `^[A-Za-z-_]{${lowerLimit},${upperLimit}}$`;
    const regex = new RegExp(pattern);
    const elementId = 'username';

    let username = document.getElementById(`${elementId}`).value;

    if (username === '') {
        throw 'error : username is required';
    }

    if (!username.match(regex)) {
        throw `error : username must contain only letters and be between ${lowerLimit} and ${upperLimit} symbols`;
    }
    
    return formatInput(username);
}

function validateEmail() {
    const lowerLimit = 3;
    const upperLimit = 15;
    const pattern = `^[A-Za-z_-]{${lowerLimit},${upperLimit}}@[a-z]+\.[a-z]+$`;
    const regex = new RegExp(pattern);
    const elementId = 'email';

    let email = document.getElementById(`${elementId}`).value;

    if (email === '') {
        throw 'error : email is required';
    }

    if (!email.match(regex)) {
        throw 'error : email must have the following form : example@domain-name.com';
    }
    
    return formatInput(email);
}

function validatePassword() {
    const lowerLimit = 6;
    const upperLimit = 10;
    const pattern = `^[A-Za-z0-9]{${lowerLimit},${upperLimit}}$`;
    const regex = new RegExp(pattern);
    const elementId = 'password';

    let password = document.getElementById(`${elementId}`).value;

    if (password === '') {
        throw 'error : password is required';
    }

    if (!containsUppercaseLetter(password)) {
        throw 'error : password must contain only at least one uppercase letter';
    }

    if (!containsDigit(password)) {
        throw 'error : password must contain only at least one digit';
    }

    if (!password.match(regex)) {
        throw `error : password must contain only at least one uppercase letter, at least one digit and be between ${lowerLimit} and ${upperLimit} symbols`;
    }
    
    return formatInput(password);
}

function displaySuccessPage() {
    const pageURL = 'success.html';

    window.location = pageURL;
}

function displayErrors(error) {
    let errors = document.getElementById('errorsLabel');
    errors.innerHTML = error; 
}

function formatInput(formField) {
    formField = trimTrailingWhitespace(formField);
    formField = removeSlashes(formField);
    formField = removeHTMLSpecialCharacters(formField);
    
    return formField;
}

function trimTrailingWhitespace(str) {
    return str.trim();
}

function removeSlashes(str) {
    return str.replace(/\//g, '');
}

function removeHTMLSpecialCharacters(str) {
    let htmlSpecialCharactersMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
    
      return str.replace(/[&<>"']/g, function(symbol) { return htmlSpecialCharactersMap[symbol]; });
}

function containsUppercaseLetter(str) {
    return str.match(/[A-Z]/);
}

function containsDigit(str) {
    return str.match(/[0-9]/);
}

