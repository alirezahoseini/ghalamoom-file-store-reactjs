

const formValidation = (inputsValue) => {
    const result = inputsValue.every(value => value )
    return result
}

const setCooki = (token) => {
    const now = new Date();
      now.setTime((now.getTime() + 2 * 24 * 60 * 60 * 1000))
      const expiresDay = now;

      console.log(expiresDay)

     const cooki = `userToken=${token};path=/;expires=${expiresDay};`

     document.cookie = cooki;
}

const getCooki = (cookiName) => {
    const cookies = document.cookie;

    const cookiArray = cookies.split(';')

    const cookiValue = cookiArray.map(cooki => {
        if(cooki.includes(cookiName)){
            const value = cooki.split('=')[1];
            return value;
        }
        return null
    })

    return cookiValue;
}


export { formValidation, setCooki, getCooki }