import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const thrustInitialtRequired2 = (value, siblings, vm) => {
	return siblings.motorSelected2 ? !String.isNullOrEmpty(value) && siblings.motorSelected2 && siblings.thrustInitial2 : true;
}
const thrustInitialtRequired3 = (value, siblings, vm) => {
	return siblings.motorSelected3 ? !String.isNullOrEmpty(value) && siblings.motorSelected3 && siblings.thrustInitial3 : true;
}
const thrustInitialtRequired4 = (value, siblings, vm) => {
	return siblings.motorSelected4 ? !String.isNullOrEmpty(value) && siblings.motorSelected4 && siblings.thrustInitial4: true;
}

const thrustAverageInitialI = (value, initial) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(initial))
		return true;
	// return (value > LibraryClientUtility.convertNumber(initial));
	return true;
}
const thrustAverageInitial1 = (value, siblings, vm) => {
	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial1);
}
const thrustAverageInitial2 = (value, siblings, vm) => {
	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial2);
}
const thrustAverageInitial3 = (value, siblings, vm) => {
	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial3);
}
const thrustAverageInitial4 = (value, siblings, vm) => {
	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial4);
}

const thrustInitialAverageI = (value, average) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(average))
		return true;
	// return (value <= LibraryClientUtility.convertNumber(average));
	return true;
}
const thrustInitialAverage1 = (value, siblings, vm) => {
	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage1);
}
const thrustInitialAverage2 = (value, siblings, vm) => {
	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage2);
}
const thrustInitialAverage3 = (value, siblings, vm) => {
	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage3);
}
const thrustInitialAverage4 = (value, siblings, vm) => {
	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage4);
}

const thrustInitialPeakI = (value, peak) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(peak))
		return true;
	return (value <= LibraryClientUtility.convertNumber(peak));
}
const thrustInitialPeak1 = (value, siblings, vm) => {
	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak1);
}
const thrustInitialPeak2 = (value, siblings, vm) => {
	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak2);
}
const thrustInitialPeak3 = (value, siblings, vm) => {
	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak3);
}
const thrustInitialPeak4 = (value, siblings, vm) => {
	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak4);
}

const thrustAveragePeakI = (value, peak, vm) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(peak))
		return true;
	return (value < LibraryClientUtility.convertNumber(peak));
}
const thrustAveragePeak1 = (value, siblings, vm) => {
	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak1);
}
const thrustAveragePeak2 = (value, siblings, vm) => {
	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak2);
}
const thrustAveragePeak3 = (value, siblings, vm) => {
	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak3);
}
const thrustAveragePeak4 = (value, siblings, vm) => {
	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak4);
}

const thrustPeakAverageI = (value, average) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(average))
		return true;
	return (value > LibraryClientUtility.convertNumber(average));
}
const thrustPeakAverage1 = (value, siblings, vm) => {
	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage1);
}
const thrustPeakAverage2 = (value, siblings, vm) => {
	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage2);
}
const thrustPeakAverage3 = (value, siblings, vm) => {
	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage3);
}
const thrustPeakAverage4 = (value, siblings, vm) => {
	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage4);
}

const thrustPeakInitialI = (value, initial) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(initial))
		return true;
	return (value >= LibraryClientUtility.convertNumber(initial));
}
const thrustPeakInitial1 = (value, siblings, vm) => {
	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial1);
}
const thrustPeakInitial2 = (value, siblings, vm) => {
	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial2);
}
const thrustPeakInitial3 = (value, siblings, vm) => {
	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial3);
}
const thrustPeakInitial4 = (value, siblings, vm) => {
	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial4);
}

export const useThrust2WeightValidation = {
	data2: { $autoDirty: true },
	mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
	massMeasurementUnitId: { $autoDirty: true },
	massMeasurementUnitsId: { required, $autoDirty: true },
	maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
	motorSelected1: { $autoDirty: true },
	motorSelected2: { $autoDirty: true },
	motorSelected3: { $autoDirty: true },
	motorSelected4: { $autoDirty: true },
	thrustAverage1: {
		decimal, between: between(0, 40960),
		thrustAverageInitial1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial1),
		thrustAveragePeak1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak1),
		$autoDirty: true, $lazy: true
	},
	thrustAverage2: {
		decimal, between: between(0, 40960),
		thrustAverageInitial2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial2),
		thrustAveragePeak2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak2),
		$autoDirty: true, $lazy: true
	},
	thrustAverage3: {
		decimal, between: between(0, 40960),
		thrustAverageInitial3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial3),
		thrustAveragePeak3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak3),
		$autoDirty: true, $lazy: true
	},
	thrustAverage4: {
		decimal, between: between(0, 40960),
		thrustAverageInitial4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial4),
		thrustAveragePeak4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak4),
		$autoDirty: true, $lazy: true
	},
	thrustInitial1: {
		required, decimal, between: between(0, 40960),
		thrustInitialAverage1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage1),
		thrustInitialPeak1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak1),
		$autoDirty: true
	},
	thrustInitial2: {
		thrustInitialtRequired2, decimal, between: between(0, 40960),
		thrustInitialAverage2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage2),
		thrustInitialPeak2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak2),
		$autoDirty: true
	},
	thrustInitial3: {
		thrustInitialtRequired3, decimal, between: between(0, 40960),
		thrustInitialAverage3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage3),
		thrustInitialPeak3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak3),
		$autoDirty: true
	},
	thrustInitial4: {
		thrustInitialtRequired4, decimal, between: between(0, 40960),
		thrustInitialAverage4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage4),
		thrustInitialPeak4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak4),
		$autoDirty: true
	},
	// thrustInitial3: { required, decimal, between: between(0, 40960), $autoDirty: true },
	// thrustInitial4: { required, decimal, between: between(0, 40960), $autoDirty: true },
	thrustPeak1: {
		decimal, between: between(0, 40960),
		thrustPeakAverage1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage1),
		thrustPeakInitial1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial1),
		$autoDirty: true, $lazy: true
	},
	thrustPeak2: {
		decimal, between: between(0, 40960),
		thrustPeakAverage2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage2),
		thrustPeakInitial2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial2),
		$autoDirty: true, $lazy: true
	},
	thrustPeak3: {
		decimal, between: between(0, 40960),
		thrustPeakAverage3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage3),
		thrustPeakInitial3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial3),
		$autoDirty: true, $lazy: true
	},
	thrustPeak4: {
		decimal, between: between(0, 40960),
		thrustPeakAverage4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage4),
		thrustPeakInitial4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial4),
		$autoDirty: true, $lazy: true
	},
};
