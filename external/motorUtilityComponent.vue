<script>
import { computed } from 'vue';

import Constants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useMotorUtilityComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const serviceMotors = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_MOTORS);

	const motorImpulseClasses = computed(() => {
		return ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map((item) => { return { id: item, name: item }; });
	});
	const motorImpulseClassesNonBlank = computed(() => {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map((item) => { return { id: item, name: item }; });
	});
	const motorMountDiameters = computed(() => {
		return ['', '13', '18', '24', '29', '38', '54', '75', '98'].map((item) => { return { id: item, name: (item ? item + LibraryClientUtility.$trans.t('motorSearch.motor_diameter_measurement') : '') }; });
	});
	const motorMountDiametersNonBlank = computed(() => {
		return ['13', '18', '24', '29', '38', '54', '75', '98'].map((item) => { return { id: item, name: (item ? item + LibraryClientUtility.$trans.t('motorSearch.motor_diameter_measurement') : '') }; });
	});

	const motorCaseInfo = (motor) => {
		if (motor.type === 'SU')
			return LibraryClientUtility.$trans.t('motorSearch.motor_type_singleuse');

		if (motor.type === 'hybrid' || motor.type === 'reload') {
			if (motor.caseInfo !== null) {
				const type = LibraryClientUtility.$trans.t('motorSearch.motor_type_' + motor.type.toLowerCase());
				return '(' + motor.caseInfo + '; ' + type + ')';
			}
		}

		return '';
	};
	const motorMountDiameter = (diameter) => {
		return `${diameter}${LibraryClientUtility.$trans.t('motorSearch.motor_diameter_measurement')}`;
	};
	const motorMountName = (item) => {
		if (!item)
			return null;
		const diameter = item.diameter ? motorMountDiameter(item.diameter) : '';
		const count = item.count ? item.count : null;
		if (count > 1)
			return `${diameter}${diameter ? ' x ' : ''}${count}`;
		return diameter;
	};
	const motorUrl = (motor) => {
		return serviceMotors.urlMotor(motor);
	};

	return {
		motorImpulseClasses,
		motorImpulseClassesNonBlank,
		motorMountDiameters,
		motorMountDiametersNonBlank,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	};
};
</script>
