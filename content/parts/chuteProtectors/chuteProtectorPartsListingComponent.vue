<script>
import {  ref } from 'vue';

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
		contentLoadSignal,
		serviceStore,
		sort,
		target,
		debug,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturers,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemWeight,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		manufacturers,
		type,
		fetchParams,
		resetAdditionalFilter
	} = usePartsListingComponent(props, context, Object.assign(options, {
		fetchParams: (correlationId, params) => {
			params.diameter = detailItemDiameter.value;
			// params.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
			// params.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;
			params.dimension = detailItemDimension.value;
			// params.dimensionMeasurementUnitId = dimensionMeasurementUnitId.value;
			// params.dimensionMeasurementUnistId = dimensionMeasurementUnistId.value;
			return params;
		},
		resetAdditionalFilter: (correlationId) => {
			detailItemDiameter.value = null;
			detailItemDimension.value = null;

			// diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
			
			// dimensionMeasurementUnitId.value = value ? value.dimensionMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// dimensionhMeasurementUnitsId.value = value ? value.dimensionhMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		}
	}));

	const detailItemDiameter = ref(null);
	const detailItemDimension = ref(null);

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
		contentLoadSignal,
		serviceStore,
		sort,
		target,
		debug,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturers,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemWeight,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		manufacturers,
		type,
		fetchParams,
		resetAdditionalFilter,
		detailItemDiameter,
		detailItemDimension
	};
};
</script>
