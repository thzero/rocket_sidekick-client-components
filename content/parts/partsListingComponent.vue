<script>
import { onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function usePartsListingComponent(props, context, options) {
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
	const filterItemDescription = ref(null);
	const filterItemIsPublic = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemName = ref(null);
	const filterItemWeight = ref(null);
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);
	const manufacturers = ref(null);
	const type = ref(options.type);

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['parts'] ?? false;
	}
	
	const fetchParams = (correlationId, params) => {
		if (options.fetchParams)
			options.fetchParams(correlationId, params);

		params.name = filterItemName.value;
		params.public = filterItemIsPublic.value;
		params.weight = filterItemWeight.value;
		params.manufacturers = filterItemManufacturers.value;
		params.manufacturerStockId = filterItemManufacturerStockId.value;
		// params.weightMeasurementUnitId = weightMeasurementUnitId.value;
		// params.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
		return params;
	};
	const resetAdditionalFilter = (correlationId, data) => {
		if (options.resetAdditionalFilter)
			options.resetAdditionalFilter(correlationId, data);
		filterItemName.value = data ? data.name : null;
		filterItemIsPublic.value = data ? data.public : 1;
		filterItemManufacturers.value = data ? data.manufacturers : null;
		filterItemManufacturerStockId.value = data ? data.manufacturerStockId : null;
		filterItemWeight.value = data ? data.weight : null;
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
	};
};
</script>
