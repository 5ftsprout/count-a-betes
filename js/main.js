//Example fetch using pokemonapi.co
document.getElementById('get_carbs').addEventListener('click', getFetch)
let i=0
let lastsearch = ''
const ingredientList = []
let totalCarb = 0
let totalCarbText = document.querySelector('#total_carb')


function getFetch(){
  const appID = 'e9a378bb'
  const appKey = 'd3b7656d157631797a1334c443fe9127'
  const ingredient = document.querySelector('#input_ingredient').value.toLowerCase()
  const gram = document.querySelector('#input_gram').value
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appID}&app_key=${appKey}&ingr=${ingredient}`
  const resultName = document.querySelector('#result_name')
  const resultImg = document.querySelector('img')
  const resultCarb = document.querySelector('#result_carb')

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data)
        //check if user is searching for the same ingredient
        if (lastsearch == `${ingredient}`) {
          i++} else {i=0}
        let dataCarb = data.hints[i].food.nutrients.CHOCDF
        resultName.innerText = data.hints[i].food.label
        resultImg.src = data.hints[i].food.image
        resultCarb.innerText = gram/100*dataCarb
        document.querySelector('#add_this').style.visibility = 'visible'
        document.querySelector('#add_this').addEventListener('click', addIngredient)
        return lastsearch = `${ingredient}`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      class MealIngredient {
        constructor() {
          this.name = resultName.innerText
          this.img = resultImg.src
          this.carb = resultCarb.innerText
        }
      };
      
      function addIngredient() {
        currentIngredient = new MealIngredient()
        console.log(currentIngredient.name)
        console.log(ingredientList)
        let totalCarb = 0
        ingredientList.push(currentIngredient)
        //ingredientList.forEach( (ingredient) => )
        //Number(totalCarb += Number(ingredientList.carb)) 
        totalCarb += Number(currentIngredient.carb)
        totalCarbText.innerText = Number(totalCarb)
        console.log(ingredientList)
      };
}