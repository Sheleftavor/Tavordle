export const handleWord = async (wordsArr, selectedWord, hardModeOn, wordsNum) => {
    const response = await fetch('https://tavordle.onrender.com/api', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({wordsArr, selectedWord, hardModeOn, wordsNum})
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}

export const getData = async () => {
    const response = await fetch('https://tavordle.onrender.com/api', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
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