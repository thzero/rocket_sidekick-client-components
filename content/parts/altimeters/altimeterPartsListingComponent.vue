<script>
import { usePartsListingComponent } from '@/components/content/parts/partsListingComponent';

export function useAltimeterPartsListingComponent(props, context, options) {
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
			return params;
		},
		resetAdditionalFilter: (correlationId) => {
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
	};
};
</script>
