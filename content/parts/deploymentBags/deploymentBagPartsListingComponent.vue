<script>
import { ref } from 'vue';

import { usePartsListingComponent } from '@/components/content/parts/partsListingComponent';

export function useDeploymentBagPartsListingComponent(props, context, options) {
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
			params.length = filterItemLength.value;
			// params.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
			// params.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
			params.pilotChute = filterItemPilotChute.value;
			return params;
		},
		resetAdditionalFilter: (correlationId, data) => {
			filterItemDiameter.value = data ? data.diameter : null;
			filterItemLength.value = data ? data.length : null;
			filterItemPilotChute.value = data ? data.pilotChute : false;

			// diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
			
			// lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		}
	}));

	const filterItemDiameter = ref(null);
	const filterItemLength = ref(null);
	const filterItemPilotChute = ref(false);

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
		filterItemLength,
		filterItemPilotChute
	};
};
</script>
