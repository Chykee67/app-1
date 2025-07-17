function openFridge(...foods){
    for (let food of foods) {
        console.log(food);
    }
}


//const vegetable = "carrot";
//const fruit = "apple";
const veggies = ['carrot', 'broccoli', 'spinach'];
const fruits = ['apple', 'banana', 'orange'];

openFridge(...veggies, ...fruits);