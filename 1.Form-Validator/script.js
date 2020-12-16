const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid');
    }
}

//check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required!`);
            isRequired = true
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

//check input length
//`${expression}` Template literals
function checkLenth(input, min, max) {
    console.log("here !!")
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters` );
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//check password match
function checkPasswordMatch(input1, input2) {
    if (input1 !== input2) {
        showError(input2, 'Password do not match');
    }
}

//get fieldName
function getFieldName(input) {
    let fieldName = input.id.charAt(0).toLocaleUpperCase() + input.id.slice(1);
//    console.log(fieldName);
    return fieldName;
}

//event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if(!checkRequired([username,email,password,password2]))
        {
                checkLenth(username, 3, 15);
    checkLenth(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
        }

})
