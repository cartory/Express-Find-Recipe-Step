var recipes = require("../recipes.json");
var router = require("express").Router();

router
	//
	.get("/", (_, res) => res.status(200).json(recipes))
	.get("/:id", ({ params }, res) => {
		let { id } = params;
		id = Number.parseInt(id);
		if (isNaN(id)) {
			return res.status(400).send("NOT_A_NUMBER_VALUE");
		}

		const recipe = recipes.find((recipe) => recipe.id === id);
		if (!recipe) {
			return res.status(400).send("NOT_FOUND");
		}

		return res.status(200).json(recipe);
	})
	.get("/step/:id", ({ query, params }, res) => {
		let { id } = params;
		let { elapsedTime = 0 } = query;

		id = Number.parseInt(id);
		elapsedTime = Number.parseInt(elapsedTime);

		if (isNaN(id)) {
			return res.status(400).send("NOT_FOUND");
		}

		if (!elapsedTime) {
			return res.status(200).json({ index: 0 });
		}

		const recipe = recipes.find((recipe) => (recipe.id = id));
		if (!recipe) {
			return res.status(400).send("NOT_FOUND");
		}

		let index = 0;
		while (index < recipe.timers.length) {
			elapsedTime -= recipe.timers[index];
			console.log(elapsedTime);

			if (elapsedTime < 0) {
				return res.status(200).json({ index });
			}

			index++;
		}

		return res.status(500).json("NOT_FOUND");
	});

module.exports = router;
