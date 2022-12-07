import data from "./data"

const groupDataByProperty = (jsonData, propertyName) => jsonData.reduce((acc, item) => {
  const list = item[propertyName]

  if (!acc[list]) {
    acc[list] = []
  }

  // Grouping
  acc[list].push(item)
  return acc
}, {})

const loadStorageData = () => {
  const loaded = localStorage.getItem('savedTaskList')
  return JSON.parse(loaded) || data //return data from local storage or data file
}

const getRandomFact = () =>{
  fetch('https://uselessfacts.jsph.pl/random.json')
  .then((response) => response.json())
  .then((data) => alert(data.text))
}

export {
  groupDataByProperty,
  loadStorageData,
  getRandomFact
}