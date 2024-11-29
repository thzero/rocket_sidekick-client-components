<script>
import { onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useMeasurementUnitsSelectBaseComponent(props, context, options) {
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
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const {
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		innerValue,
		initValue,
		innerValueUpdate
	} = useBaseControlEditComponent(props, context, options);

	const measurementUnitsOptions = ref(null);

	onMounted(async () => {
		measurementUnitsOptions.value = LibraryClientVueUtility.selectOptions(AppUtility.measurementUnitsOptions(), LibraryClientUtility.$trans.t, 'measurementUnits');
	});

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
		innerValue,
		innerValueUpdate,
		initValue,
		measurementUnitsOptions
	};
};
</script>
