export const classNames = (currentClass = "", restClass = {}) => {
	if (!restClass) return currentClass;

	let newClass = "";

	Object.entries(restClass).map(([key, val]) => (newClass += val ? key : ""));

	return currentClass + " " + newClass;
};
