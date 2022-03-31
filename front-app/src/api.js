export const handleWord = async (word, selectedWord, hardModeOn) => {
    const response = await fetch('http://192.168.1.32:5000/api', {
        method: 'POST',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({word, selectedWord, hardModeOn})
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}

export const getData = async (word, selectedWord, hardModeOn) => {
    const response = await fetch('http://192.168.1.32:5000/api', {
        method: 'GET',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}