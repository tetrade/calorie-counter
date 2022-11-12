const inputText = document.querySelectorAll('input[type="text"]')
const calcButton = document.querySelector(".form__submit-button");
const resetButton = document.querySelector(".form__reset-button");
const allActivities = document.querySelectorAll('input[name="activity"]');
const genders = document.querySelectorAll('input[name="gender"]');
const resultCounter = document.querySelector(".counter__result");
const caloriesNorm = document.querySelector("#calories-norm");
const caloriesMinimal = document.querySelector("#calories-minimal");
const caloriesMaximal = document.querySelector("#calories-maximal");

let weightSupport = 0,
	weightLoss = 0,
	weightGain = 0;

let activityRatio = 1.2;
let gender = "male";

let blankFields = new Set([0, 1, 2]);

const activityList = {
	'activity-minimal':  1.2,
	'activity-low': 1.375,
	'activity-medium': 1.55,
	'activity-high': 1.725,
	'activity-maximal': 1.9
}

const genderСoefficient = {
	'female': 5,
	'male': -161
}

const updateButtonsStatus = () => {
	resetButton.disabled = blankFields.size === 3;
	calcButton.disabled = blankFields.size !== 0;
};

const setDefaultParams = () => {
	activityRatio = 1.2;
	gender = "male";
	[0, 1, 2].forEach(value => blankFields.add(value));
	updateButtonsStatus();
};

inputText.forEach((input, index) => {
	input.addEventListener("change", () => {
		if (input.value == 0) {
			blankFields.add(index);
		} else {
			blankFields.delete(index);
		}
		updateButtonsStatus();
	});
});

genders.forEach(genderName => genderName.addEventListener("change", () => gender = genderName.value));

allActivities.forEach(activity => activity.addEventListener("change", () => activityRatio = activityList[activity.id]));

calcButton.addEventListener("click", () => {
	weightSupport = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + genderСoefficient[gender]) * activityRatio;

	weightLoss = weightSupport - (weightSupport * 0.15);
	weightGain = weightSupport + (weightSupport * 0.15);

	caloriesNorm.textContent = Math.round(weightSupport);
	caloriesMinimal.textContent = Math.round(weightLoss);
	caloriesMaximal.textContent = Math.round(weightGain);

	resultCounter.classList.remove("counter__result--hidden");
});

resetButton.addEventListener("click", () => {
	setDefaultParams();
	resultCounter.classList.add("counter__result--hidden");
});