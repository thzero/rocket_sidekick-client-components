<script>
import { computed } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useMeasurementUnitSelectBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		contentLoadSignal,
		serviceStore,
		contentLoadStart,
		contentLoadStop,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const {
		// correlationId,
		// error,
		// hasFailed,
		// hasSucceeded,
		// initialize,
		// logger,
		// noBreakingSpaces,
		// notImplementedError,
		// success,
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		innerValueUpdate,
		initValue
	} = useBaseControlEditComponent(props, context, options);

	const measurementUnits = computed(() => {
		const output = [];
		let temp = measurementUnitTrans(AppCommonConstants.MeasurementUnits.english[props.measurementUnitsType], 'english', props.measurementUnitsType).map(element => {
			element.props = { subtitle: AppCommonConstants.MeasurementUnits.english.id };
			return element;
		});
		output.push(...temp);
		temp = measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics[props.measurementUnitsType], 'metrics', props.measurementUnitsType).map(element => {
			element.props = { subtitle: AppCommonConstants.MeasurementUnits.metrics.id };
			return element;
		});
		output.push(...temp);
		return output;
	});

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return object ? Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; }) : [];
	};

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		serviceStore,
		sortByOrder,
		target,
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		innerValueUpdate,
		initValue,
		measurementUnits,
		measurementUnitTrans
	};
};
</script>
