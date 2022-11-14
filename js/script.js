const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
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

let blankFields = new Set();

const activityList = {
	'activity-minimal':  1.2,
	'activity-low': 1.375,
	'activity-medium': 1.55,
	'activity-high': 1.725,
	'activity-maximal': 1.9
}

const genderСoefficients = {
	'female': -161,
	'male': 5
}

let activityRatio = activityList['activity-minimal'];
let genderСoefficient = genderСoefficients['male'];

const updateButtonsStatus = () => {
	resetButton.disabled = blankFields.size === 3;
	calcButton.disabled = blankFields.size !== 0;
};

const setDefaultParams = () => {
	activityRatio = activityList['activity-minimal'];
	genderСoefficient = genderСoefficients['male'];
	[0, 1, 2].forEach(value => blankFields.add(value));
	updateButtonsStatus();
};

inputText.forEach((input, index) => {
	if (input.value == 0) blankFields.add(index);
	input.addEventListener("change", () => {
		if (input.value == 0) {
			blankFields.add(index);
		} else {
			blankFields.delete(index);
		}
		updateButtonsStatus();
	});
});

genders.forEach(genderName => {
	if (genderName.checked) genderСoefficient = genderСoefficients[genderName.value];
	genderName.addEventListener("change", () => genderСoefficient = genderСoefficients[genderName.value]);
});

allActivities.forEach(activity => {
  if (activity.checked) activityRatio = activityList[activity.id];
  activity.addEventListener("change", () => activityRatio = activityList[activity.id]);
});

calcButton.addEventListener("click", () => {
	weightSupport = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + genderСoefficient) * activityRatio;

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