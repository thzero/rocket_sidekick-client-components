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
			params.length = detailItemLength.value;
			// params.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
			// params.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
			params.pilotChute = detailItemPilotChute.value;
			return params;
		},
		resetAdditionalFilter: (correlationId) => {
			detailItemDiameter.value = null;
			detailItemLength.value = null;
			detailItemPilotChute.value = false;

			// diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
			
			// lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
			// lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		}
	}));

	const detailItemDiameter = ref(null);
	const detailItemLength = ref(null);
	const detailItemPilotChute = ref(false);

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
		detailItemLength,
		detailItemPilotChute
	};
};
</script>
