/** @typedef {number} CourseLevel */

/** @enum {CourseLevel} */
export const CourseLevel = Object.freeze({
	A: 0,
	X: 0.5,
	H: 1,
	HH: 1.3,
	AP: 1.3,
});

/**
 * @param {object} courseDescriptor 
 * @param {number} courseDescriptor.gradePercent 
 * @param {CourseLevel} courseDescriptor.level 
 * @param {number} courseDescriptor.nCredits 
 * @returns {number}
 */
export function computeCourseWeightedGpa({gradePercent, level=CourseLevel.A, nCredits=1}) {
	return (computeNGradePoints(gradePercent) + level) * nCredits;
}

/**
 * @param {{gradePercent: number, level: CourseLevel, nCredits: number}[]} courseDescriptors 
 * @returns {number}
 */
export function computeWeightedGpa(courseDescriptors) {
	let cumsumGpaPoints = 0;
	let cumsumCredits = 0;

	for (const courseDescriptor of courseDescriptors) {
		cumsumGpaPoints += computeCourseWeightedGpa(courseDescriptor);
		cumsumCredits += courseDescriptor.nCredits;
	}

	return cumsumGpaPoints / cumsumCredits;
}

function computeNGradePoints(gradePercent) {
	const gradePercentRounded = Math.round(gradePercent);

	if (gradePercentRounded >= 98) {
		return 4;
	} else if (gradePercentRounded >= 95) {
		return 3.95;
	} else if (gradePercentRounded < 65) {
		return 0;
	}
	return 1 + (gradePercentRounded - 65) * 0.1;
}

/**
 * @param {object} courseDescriptor 
 * @param {number} courseDescriptor.gradePercent 
 * @param {number} courseDescriptor.nCredits 
 * @returns {number}
 */
export function computeCourseUnweightedGpa({gradePercent, nCredits=1}) {
	return computeNQualityPoints(gradePercent) * nCredits;
}

/**
 * @param {{gradePercent: number, nCredits: number}[]} courseDescriptors 
 * @returns {number}
 */
export function computeUnweightedGpa(courseDescriptors) {
	let cumsumQualityPoints = 0;
	let cumsumCredits = 0;

	for (const courseDescriptor of courseDescriptors) {
		cumsumQualityPoints += computeCourseUnweightedGpa(courseDescriptor);
		cumsumCredits += courseDescriptor.nCredits;
	}

	return cumsumQualityPoints / cumsumCredits;
}

function computeNQualityPoints(gradePercent) {
	const gradePercentRounded = Math.round(gradePercent);

	if (gradePercentRounded >= 90) {
		return 4;
	} else if (gradePercentRounded >= 80) {
		return 3;
	} else if (gradePercentRounded >= 70) {
		return 2;
	} else if (gradePercentRounded >= 65) {
		return 1;
	}
	return 0;
}