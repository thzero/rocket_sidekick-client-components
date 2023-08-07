<script>
import { computed, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useRocketPartsComponent(props, context, options) {
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors
	} = useBaseComponent(props, context, options);
	
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const manufacturersI = ref(null);
	const panels = ref([]);
	const partTypes = ref(AppCommonConstants.Rocketry.PartTypes);

	const results = computed(() => {
		let temp = props.items ?? [];
		temp = temp.sort(
			firstBy((v1, v2) => { return (v1.typeId && v2.typeId) && v1.typeId.localeCompare(v2.typeId); })
			// .thenBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			// .thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
			// .thenBy((v1, v2) => { return (v1.manufacturerName && v2.manufacturerName) && v1.manufacturerName.localeCompare(v2.manufacturerName); })
		);
		const panels2 = [];
		let prev = null;
		let prevId = null;
		const output = [];
		for(const item of temp) {
			if (item.typeId === prevId) {
				if (prev) 
					prev.results.push(item);
				continue;
			}

			prevId = item.typeId;
			prev = { name: item.typeId, typeId: item.typeId, separator: true, results: [] };
			prev.results.push(item);
			output.push(prev);
			panels2.push(item.typeId);
		}
		panels.value = panels2;
		return output;
	});

	const clickSelect = async (item) => {
		context.emit('select', item);
	};
	const isPartType = (item, typeId) => {
		return item && item.typeId === typeId;
	};
	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!manufacturersI.value)
			return null;

		const temp = manufacturersI.value.find(l => l.id === id);
		return temp ? temp.name : null;
	};
	const partTypeName = (id) => {
		return LibraryClientUtility.$trans.t(`forms.content.parts['${id}'].plural`);
	};

	onMounted(async () => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.parachute) ||
			(j === AppCommonConstants.Rocketry.ManufacturerTypes.streamer)
		));
		temp2 = temp2.sort((a, b) => a.name.localeCompare(b.name));
		manufacturersI.value = temp2.map((item) => { return { id: item.id, name: item.name }; });
	});

	watch(() => props.items,
		(value) => {
			alert(value);
		}
	);
	
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		manufacturersI,
		panels,
		partTypes,
		results,
		clickSelect,
		isPartType,
		manufacturer,
		partTypeName
	};
};
</script>
