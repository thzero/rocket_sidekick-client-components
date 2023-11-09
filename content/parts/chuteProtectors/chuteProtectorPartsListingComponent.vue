<script>
import {  ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import { usePartsListingComponent } from '@/components/content/parts/partsListingComponent';

export function useChuteProtectorPartsListingComponent(props, context, options) {
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
			params.diameter = filterItemDiameter.value;
			// params.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
			// params.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;
			params.dimension = filterItemDimension.value;
			// params.dimensionMeasurementUnitId = dimensionMeasurementUnitId.value;
			// params.dimensionMeasurementUnitsId = dimensionMeasurementUnitsId.value;
			return params;
		},
		resetAdditionalFilter: (correlationId, data) => {
			filterItemDiameter.value = data ? data.diameter : null;
			filterItemDimension.value = data ? data.dimension : null;

			// diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
			
			// dimensionMeasurementUnitId.value = value ? value.dimensionMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// dimensionhMeasurementUnitsId.value = value ? value.dimensionhMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		}
	}));

	const filterItemDiameter = ref(null);
	const filterItemDimension = ref(null);

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
		filterItemDiameter,
		filterItemDimension,
		scope: 'ChuteProectorsFilterControl',
		validation: useVuelidate({ $scope: 'ChuteProectorsFilterControl' })
	};
};
</script>
