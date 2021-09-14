const validateForm = (userDetails) => {
    let validator = true
    const { userName, eMail, pwd, confirmPwd } = userDetails

    const eMailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const pwdValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!eMailValidator.test(eMail)) {
        setformErrors(preValue => ({ ...preValue, eMail: 'Invalid e-Mail' }))
        validator = false
    }
    else {
        setformErrors(preValue => ({ ...preValue, eMail: '' }))
    }

    if (!pwdValidator.test(pwd)) {
        setformErrors(preValue => ({ ...preValue, pwd: 'Minimum 8 characters long and must contain a number' }))
        validator = false
    }
    else {
        setformErrors(preValue => ({ ...preValue, pwd: '' }))
    }


    if (pwd !== confirmPwd) {
        setformErrors(preValue => ({ ...preValue, confirmPwd: 'Passwords does not match' }))
        validator = false
    }
    else {
        setformErrors(preValue => ({ ...preValue, confirmPwd: '' }))
    }

    return validator
}

// export { validateForm }