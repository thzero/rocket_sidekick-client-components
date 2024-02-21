<script>
import { computed, onMounted, ref } from 'vue';
import { firstBy, thenBy } from 'thenby';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
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

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);
	
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const appCommonConstants = ref(AppCommonConstants);
	const dialogRocketParts = ref([
		AppCommonConstants.Rocketry.PartTypes.altimeter, 
		AppCommonConstants.Rocketry.PartTypes.chuteRelease,
		AppCommonConstants.Rocketry.PartTypes.parachute
	]);
	const dialogEditRocketPartsManager = ref({});
	for(let part of dialogRocketParts.value)
		dialogEditRocketPartsManager.value[part] = new DialogSupport();
	const dialogEditRocketPartParams = ref(null);
	const panels = ref([]);
	const partTypes = ref(AppCommonConstants.Rocketry.PartTypes);

	const results = computed(() => {
		let temp = props.items ?? [];
		// for (const item of temp) {
		// 	item.manufacturer = props.manufacturers.find(l => l.id === item.manufacturerId);
		// 	if (item.manufacturer)
		// 		item.manufacturer = item.manufacturer.name;
		// }
		// temp = temp.sort(
		// 	firstBy((v1, v2) => { return (v1.typeId && v2.typeId) && v1.typeId.localeCompare(v2.typeId); })
		// 	// .thenBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
		// 	// .thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		// 	//.thenBy((v1, v2) => { return (v1.manufacturer && v2.manufacturer) && v1.manufacturer.localeCompare(v2.manufacturer); })
		// 	.thenBy((v1, v2) => { return (v1.index && v2.index) && v1.index.compare(v2.index); })
		// );
		temp = temp.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
			.thenBy((v1, v2) => { return (v1.manufacturer && v2.manufacturer) && v1.manufacturer.localeCompare(v2.manufacturer); })
		);
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
		}
		return output;
	});

	const clickDeleteRocketPart = async (item, stageId) => {
		context.emit('delete', item, stageId);
	};
	const clickEditRocketPart = async (item, stageId, typeId) => {
		dialogEditRocketPartParams.value = { item: item, stageId: stageId, typeId: typeId };
		dialogEditRocketPartsManager.value[typeId].signal = true;
	};
	const clickSelectRocketPart = async (item, stageId) => {
		context.emit('select', item, stageId);
	};
	const dialogEditRocketPartCancel = async () => {
		if (!dialogEditRocketPartParams.value)
			return;

		dialogEditRocketPartsManager.value[dialogEditRocketPartParams.value.typeId].signal = false;
	};
	const dialogEditRocketPartOk = async () => {
		if (!dialogEditRocketPartParams.value)
			return;

		dialogEditRocketPartsManager.value[dialogEditRocketPartParams.value.typeId].signal = false;
	};
	const dialogEditRocketPartPreCompleteOk = async (correlationId, item) => {
		if (!dialogEditRocketPartParams.value)
			return error('useRocketPartsComponent', 'dialogEditRocketPartParams', 'Invalid dialogEditRocketPartParams value.', null, null, null, correlationId);

		dialogEditRocketPartParams.value.item = item;
		if (!props.preCompleteOk)
			return error('useRocketPartsComponent', 'preCompleteOkRocketParts', 'Invalid preCompleteOk method.', null, null, null, correlationId);

		return await props.preCompleteOk(correlationId, dialogEditRocketPartParams.value);
	};
	const editablePart = (item) => {
		const temp = dialogRocketParts.value.find (l => l === item.typeId)
		if (!temp)
			return false;
		return props.editable && !item.fromRocket;
	}
	const isPartType = (item, typeId) => {
		return item && item.typeId === typeId;
	};
	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!props.manufacturers)
			return null;

		const temp = props.manufacturers.find(l => l.id === id);
		return temp ? (props.manufacturerAbbrev ? temp.abbrev : temp.name) : null;
	};
	const partTypeName = (id) => {
		return LibraryClientUtility.$trans.t(`forms.content.parts['${id}'].plural`);
	};
	const panelsKey = () => {
		return props.id + '-parts-' + props.panelTypeId;
	};
	const panelsUpdated = async (value) => {
		if (props.updatePanelsF) 
			await props.updatePanelsF(value);
	};

	onMounted(async () => {
		const temp3 = await serviceStore.getters.getRocketsExpanded();
		const temp4 = temp3[panelsKey()];
		panels.value = temp4 ?? [ 
			AppCommonConstants.Rocketry.ManufacturerTypes.altimeter, 
			AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector, 
			AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease, 
			AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector, 
			AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag, 
			AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
			AppCommonConstants.Rocketry.ManufacturerTypes.streamer,
			AppCommonConstants.Rocketry.ManufacturerTypes.tracker
		];
		
		// if (manufacturersI.value)
		// 	return;

		// const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		// if (hasFailed(response))
		// 	return;

		// let temp2 = response.results.filter(l => l.types.find(j => 
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.altimeter) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteRelease) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.parachute) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.streamer) ||
		// 	(j === AppCommonConstants.Rocketry.ManufacturerTypes.trackers)
		// ));
		// temp2 = temp2.sort((a, b) => a.name.localeCompare(b.name));
		// manufacturersI.value = temp2.map((item) => { return { id: item.id, name: item.name }; });
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		buttonsDialog,
		buttonsForms,
		appCommonConstants,
		dialogEditRocketPartsManager,
		dialogEditRocketPartParams,
		panels,
		partTypes,
		results,
		clickDeleteRocketPart,
		clickEditRocketPart,
		clickSelectRocketPart,
		dialogEditRocketPartCancel,
		dialogEditRocketPartOk,
		dialogEditRocketPartPreCompleteOk,
		editablePart,
		isPartType,
		manufacturer,
		partTypeName,
		panelsUpdated
	};
};
</script>
