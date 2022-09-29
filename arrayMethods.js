const recommendedFood = function () {
	dogs.forEach((dog) => {
		dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
	});
};

const findSarahDog = function () {
	const sarahDog = dogs.find((dog) => {
		return dog.owners.includes("Sarah");
	});
	if (sarahDog) {
		const lowerRange = sarahDog.recommendedFood * 0.9;
		const upperRange = sarahDog.recommendedFood * 1.1;
		if (sarahDog.curFood > upperRange) console.log(`Too much`);
		else if (sarahDog.curFood < lowerRange) console.log(`Too little`);
		else console.log("Proper Diet");
	} else console.log(`Sarah Dog not found`);
};


const dogs = [
	{
		weight: 22,
		curFood: 250,
		owners: ["Alice", "Bob"],
	},
	{
		weight: 8,
		curFood: 200,
		owners: ["Matilda"],
	},
	{
		weight: 13,
		curFood: 275,
		owners: ["Sarah", "John"],
	},
	{
		weight: 32,
		curFood: 340,
		owners: ["Michael"],
	},
];

recommendedFood(dogs);
findSarahDog()