<script>
import useVuelidate from '@vuelidate/core';

import { usePartsListingComponent } from '@/components/content/parts/partsListingComponent';

export function useChuteReleasePartsListingComponent(props, context, options) {
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
		sort,
		target,
		debug,
		filterItemIsPublic,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemWeight,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		manufacturers,
		type,
		fetchParams,
		resetAdditionalFilter
	} = usePartsListingComponent(props, context, Object.assign(options, {
		fetchParams: (correlationId, params) => {
			return params;
		},
		resetAdditionalFilter: (correlationId, data) => {
		}
	}));

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
		sort,
		target,
		debug,
		filterItemIsPublic,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemName,
		filterItemWeight,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		manufacturers,
		type,
		fetchParams,
		resetAdditionalFilter,
		scope: 'ChuteReleasesFilterControl',
		validation: useVuelidate({ $scope: 'ChuteReleasesFilterControl' })
	};
};
</script>
