<script>
import { onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketsListingComponent(props, context, options) {
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
		target
	} = useContentBaseComponent(props, context, options);

	const debug = ref(false);
	const detailItemDescription = ref(null);
	const detailItemIsPublic = ref(null);
	const detailItemManufacturers = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemWeight = ref(null);
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);
	const manufacturers = ref(null);
	const type = ref(options.type);

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['rockets'] ?? false;
	}
	
	const fetchParams = (correlationId, params) => {
		if (options.fetchParams)
			options.fetchParams(correlationId, params);

		params.name = detailItemName.value;
		params.public = detailItemIsPublic.value === true ? true : detailItemIsPublic.value === false ? false : null;
		params.weight = detailItemWeight.value;
		params.manufacturers = detailItemManufacturers.value;
		params.manufacturerStockId = detailItemManufacturerStockId.value;
		// params.weightMeasurementUnitId = weightMeasurementUnitId.value;
		// params.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
		return params;
	};
	const resetAdditionalFilter = (correlationId) => {
		if (options.resetAdditionalFilter)
			options.resetAdditionalFilter(correlationId,);
		detailItemName.value = null;
		detailItemIsPublic.value = null;
		detailItemManufacturers.value = null;
		detailItemWeight.value = null;
	};

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === options.type));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name }; });
		manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
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
