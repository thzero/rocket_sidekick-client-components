<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketStage from 'rocket_sidekick_common/data/rockets/stage';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketComponent(props, context, options) {
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
		setErrors,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		dialogDeleteSecondaryManager,
		dialogDeleteSecondaryMessage,
		dialogDeleteSecondaryParams,
		dialogEditSecondaryManager,
		dialogEditSecondaryParams,
		canAddSecondary,
		canDeleteSecondary,
		canEditSecondary,
		isDeletingSecondary,
		isEditingSecondary,
		dialogDeleteSecondaryCancel,
		dialogDeleteSecondaryError,
		dialogDeleteSecondaryOk,
		dialogDeleteSecondaryOpen,
		dialogEditSecondaryCancel,
		dialogEditSecondaryError,
		dialogEditSecondaryOk,
		dialogEditSecondaryOpen,
		dialogEditSecondaryPreCompleteOk,
		handleAddSecondary
	} = useDetailSecondaryComponent(props, context, {
		dialogDeleteMessage: 'rockets.stage',
		dialogDeleteSecondaryOk: async (correlationId, id) => {
			// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			// LibraryCommonUtility.deleteArrayById(temp.stages, id);

			// temp.stages = temp.stages.sort((a, b) => a.index >= b.index);
			// let index = 0;
			// for (const item of temp.stages)
			// 	item.index = index++;
			// // detailItemData.value.stages = stages;
			
			// const response = await serviceStore.dispatcher.saveRocketStageDelete(correlationId, detailItemData.value);
			const response = await serviceStore.dispatcher.saveRocketStageDelete(correlationId, detailItemData.value, id);
			logger.debug('useRocketComponent', 'dialogDeleteSecondaryOk', 'response', response, correlationId);
			return response;
		},
		dialogEditSecondaryPreCompleteOk : async (correlationId, item) => {
			// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			// temp.stages = LibraryCommonUtility.updateArrayByObject(detailItemData.value.stages, item);
			
			const response = await serviceStore.dispatcher.saveRocketStage(correlationId, detailItemData.value, item);
			logger.debug('useRocketComponent', 'dialogEditSecondaryPreCompleteOk', 'response', response, correlationId);
			
			// detailItem.value.data = response.results;
			return response;
		},
		init: async (correlationId, value) => {
			const temp = manufacturers.value ? manufacturers.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;

			const temp2 = await serviceStore.getters.getRocketsExpanded();
			const temp3 = temp2[stagesPanelsKey(value)];
			stagesPanels.value = temp3 ?? [];

			const temp4 = await serviceStore.getters.getRocketsExpanded();
			const temp5 = temp4[videosPanelsKey(value)];
			videosPanels.value = temp5 ?? [];
			
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			const rocketStage = new RocketStage(detailItemData.value.stages.length);
			rocketStage.rocketId = detailItemData.value.id;

			// Instead of adding immediately, just open the dialog...
			// detailItemData.value.stages.push(rocketStage);
			
			// const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			// logger.debug('rocketComponent', 'initNewSecondary', 'response', response, correlationId);
			// return response;

			// Open the dialog...
			dialogEditSecondaryOpen(rocketStage);
		},
		preCompleteOk : async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			logger.debug('rocketComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const detailItemAlbumLink = ref(null);
	const detailItemAlbumName = ref(null);
	const detailItemAlbumType = ref(null);
	const detailItemDescription = ref(null);3
	const detailItemDocumentLink = ref(null);
	const detailItemDocumentName = ref(null);
	const detailItemDocumentType = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemCoverUrl = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemPublic = ref(false);
	const detailItemRocketType = ref(null);
	const manufacturerDefault = ref(null);
	const stagesPanels = ref([]);
	const videosPanels = ref([]);
	
	const dialogDeleteVideoManager = ref(new DialogSupport());
	const dialogDeleteVideoMessage = ref(LibraryClientUtility.$trans.t(`messages.videos.delete_confirm`));
	const dialogDeleteVideoParams = ref(null);
	const dialogEditVideoManager = ref(new DialogSupport());
	const dialogEditVideoParams = ref(null);

	const coverUrl = computed(() => {
		return detailItemData.value ? detailItemData.value.coverUrl : '';
	});
	const hasAdmin = computed(() => {
		return false;
	});
	const manufacturers = computed(() => {
		return props.manufacturers ? props.manufacturers : [];
	});
	const rocketId = computed(() => {
		return detailItemData.value ? detailItemData.value.id : [];
	});
	const stages = computed(() => {
		return detailItemData.value ? detailItemData.value.stages : [];
	});
	const videos = computed(() => {
		return detailItemData.value ? detailItemData.value.videos : [];
	});
	
	const dialogEditPreCompleteOkRocketPart = async (correlationId, item) => {
		// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
		// const stage = temp.stages.find(l => l.id === item.stageId);
		// if (!stage)
		// 	return error('useRocketComponent', 'dialogEditPreCompleteOkRocket', `Invalid stage for '${item.stageId}'.`, null, null, null, correlationId);

		// if (item.typeId === AppCommonConstants.Rocketry.PartTypes.altimeter)
		// 	stage.altimeters = LibraryCommonUtility.updateArrayByObject(stage.altimeters, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.chuteProtector)
		// 	stage.chuteProtectors = LibraryCommonUtility.updateArrayByObject(stage.chuteProtectors, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.chuteRelease)
		// 	stage.chuteReleases = LibraryCommonUtility.updateArrayByObject(stage.chuteReleases, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.deploymentBag)
		// 	stage.deploymentBags = LibraryCommonUtility.updateArrayByObject(stage.deploymentBags, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.parachute)
		// 	stage.parachutes = LibraryCommonUtility.updateArrayByObject(stage.parachutes, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.streamer)
		// 	stage.streamers = LibraryCommonUtility.updateArrayByObject(stage.streamers, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.tracker)
		// 	stage.trackers = LibraryCommonUtility.updateArrayByObject(stage.trackers, item.item);

		detailItem.value.data = response.results;
		return response;
	};
	const dialogDeleteVideoCancel = async (item) => {
		try {
			dialogDeleteVideoManager.value.cancel();
		}
		finally {
			dialogDeleteVideoParams.value = null;
		}
	};
	const dialogDeleteVideoError = async (err) => {
		try {
			dialogDeleteVideoManager.value.cancel();
		}
		finally {
			dialogDeleteVideoParams.value = null;
		}
	};
	const dialogDeleteVideoOk = async () => {
		try {
			if (!dialogDeleteVideoParams.value)
				return;
			
			const correlationIdI = correlationId();
			const response = await serviceStore.dispatcher.saveRocketVideoDelete(correlationIdI, detailItemData.value, dialogDeleteVideoParams.value);
			logger.debug('useRocketComponent', 'dialogDeleteVideoOk', 'response', response, correlationIdI);
			if (hasFailed(response))
				setNotify(correlationIdI, 'errors.error');

			detailItem.value.data = response.results;
			return response;
		}
		finally {
			dialogDeleteVideoParams.value = null;
			dialogDeleteVideoManager.value.ok();
		}
	};
	const dialogDeleteVideoOpen = (item) => {
		if (!item)
			return;
		if (!canDeleteSecondary.value)
			return;

		dialogDeleteVideoParams.value = item.id;
		dialogDeleteVideoManager.value.open();
	};
	const dialogEditVideoCancel = async (item) => {
		try {
			dialogEditVideoManager.value.cancel();
		}
		finally {
			dialogEditVideoParams.value = null;
		}
	};
	const dialogEditVideoError = async (err) => {
		try {
			dialogEditVideoManager.value.cancel();
		}
		finally {
			dialogEditVideoParams.value = null;
		}
	};
	const dialogEditVideoOk = async () => {
		try {
			if (!dialogEditVideoParams.value)
				return;
			
			const correlationIdI = correlationId();
			const response = await serviceStore.dispatcher.saveRocketVideoEdit(correlationIdI, detailItemData.value, dialogEditVideoParams.value);
			logger.debug('useRocketComponent', 'dialogEditVideoOk', 'response', response, correlationIdI);
			if (hasFailed(response))
				setNotify(correlationIdI, 'errors.error');

			detailItem.value.data = response.results;
			return response;
		}
		finally {
			dialogEditVideoParams.value = null;
			dialogEditVideoManager.value.ok();
		}
	};
	const dialogEditVideoOpen = async (item) => {
		if (!item)
			return;
		if (!canEditSecondary.value)
			return;

		dialogEditVideoParams.value = item;
		dialogEditVideoManager.value.open();
	};
	const dialogEditVideoPreCompleteOk = async (correlationId, item) => {
		const response = await serviceStore.dispatcher.saveRocketVideo(correlationId, detailItemData.value, item);
		logger.debug('useRocketComponent', 'dialogEditVideoPreCompleteOk', 'response', response, correlationId);
		
		detailItem.value.data = response.results;
		return response;
	};
	const handleAddVideo = async () => {
		// detailItemData.value.videos = detailItemData.value.videos ?? [];

		// detailItemData.value.videos.push({
		// 	id: LibraryCommonUtility.generateShortId(),
		// 	link: null,
		// 	name: null,
		// 	type: null
		// });
		
		if (!canEditSecondary.value)
			return;

		const item = {
			id: LibraryCommonUtility.generateShortId(),
			link: null,
			name: null,
			type: null
		};
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
		temp.videos = detailItemData.value.videos ?? [];
		temp.videos.push(item);

		dialogEditVideoParams.value = item;
		dialogEditVideoManager.value.open();
	};
	const isDeletingVideo = (item) => {
		if (!dialogDeleteVideoParams.value || !item)
			return false;

		return item.id === dialogDeleteVideoParams.value;
	};
	const isEditingVideo = (item) => {
		if (!dialogEditVideoParams.value || !item)
			return false;

		return item.id === dialogEditVideoParams.value;
	};
	const resetData = (correlationId, value) => {
		detailItemRocketType.value = value && value.rocketTypes ? value.rocketTypes : null;	

		detailItemAlbumLink.value = null;
		detailItemAlbumName.value = null;
		detailItemAlbumType.value = null;
		if (value && value.albums && value.albums.length > 0) {
			detailItemAlbumLink.value = value.albums[0].link;
			detailItemAlbumName.value = value.albums[0].name;
			detailItemAlbumType.value = value.albums[0].type;
		}

		detailItemCoverUrl.value = value && value.coverUrl ? value.coverUrl : '';

		detailItemDescription.value = value && value.description ? value.description : null;
		
		detailItemDocumentLink.value = null;
		detailItemDocumentName.value = null;
		detailItemDocumentType.value = null;
		if (value && value.documents && value.documents.length > 0) {
			detailItemDocumentLink.value = value.documents[0].link;
			detailItemDocumentName.value = value.documents[0].name;
			detailItemDocumentType.value = value.documents[0].type;
		}
		
		detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value ? value.manufacturerStockId : null;

		detailItemName.value = value ? value.name : null;
		detailItemPublic.value = value ? value.public : false;
	};
	const setData = (correlationId) => {
		detailItemData.value.rocketTypes = detailItemRocketType.value;

		detailItemData.value.albums = [];
		if (detailItemAlbumLink.value) {
			detailItemData.value.albums.push({
				name: detailItemAlbumName.value,
				link: detailItemAlbumLink.value,
				type: detailItemAlbumType.value
			});
		}

		detailItemData.value.coverUrl = detailItemCoverUrl.value;

		detailItemData.value.description = detailItemDescription.value;

		detailItemData.value.documents = [];

		detailItemData.value.documents = [];
		if (detailItemDocumentLink.value) {
			detailItemData.value.documents.push({
				name: detailItemDocumentName.value,
				link: detailItemDocumentLink.value,
				type: detailItemDocumentType.value
			});
		}
		
		detailItemData.value.manufacturerId = detailItemManufacturer.value;
		detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

		detailItemData.value.name = detailItemName.value;
		detailItemData.value.public = detailItemPublic.value;
	};
	const stagesPanelsKey = (value) => {
		const temp = value ? value.id : detailItemData.value ? detailItemData.value.id : null;
		if (temp)
			return temp + '-stages';
		return null;
	};
	const stagesPanelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: stagesPanelsKey(), expanded: value });
	};
	const updateStage = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, stage);

		temp.stages.forEach(element => {
			if (element.primary) {
				element.index = 0;
				return;
			}

			element.index = LibraryCommonUtility.isNotNull(element.index) ? element.index : Number.MAX_SAFE_INTEGER;
		});

		temp.stages = temp.stages.sort((a, b) => a.index >= b.index);
		let index = 0;
		for (const item of temp.stages)
			item.index = index++;
		detailItem.value.stages = stages;

		index = 0;
		temp.stages.forEach(element => {
			element.index = index++;
		});

		const response = await serviceStore.dispatcher.saveRocketStage(correlationId, temp);
		logger.debug('useRocketComponent', 'updateStage', 'response', response, correlationId);
		if (hasFailed(response))
			return response;

		detailItemData.value.stages = response.results.stages;
		return response;
	};
	const updateVideo = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		// temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, stage);

		// temp.stages.forEach(element => {
		// 	if (element.primary) {
		// 		element.index = 0;
		// 		return;
		// 	}

		// 	element.index = LibraryCommonUtility.isNotNull(element.index) ? element.index : Number.MAX_SAFE_INTEGER;
		// });

		// temp.stages = temp.stages.sort((a, b) => a.index >= b.index);
		// let index = 0;
		// for (const item of temp.stages)
		// 	item.index = index++;
		// detailItem.value.stages = stages;

		// index = 0;
		// temp.stages.forEach(element => {
		// 	element.index = index++;
		// });

		// const response = await serviceStore.dispatcher.saveRocketStage(correlationId, temp);
		// logger.debug('useRocketComponent', 'updateVideo', 'response', response, correlationId);
		// if (hasFailed(response))
		// 	return response;

		// detailItemData.value.stages = response.results.stages;
		// return response;
		return null;
	};
	const videosPanelsKey = (value) => {
		const temp = value ? value.id : detailItemData.value ? detailItemData.value.id : null;
		if (temp)
			return temp + '-videos';
		return null;
	};
	const videosPanelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: videosPanelsKey(), expanded: value });
	};
	
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		dialogDeleteSecondaryManager,
		dialogDeleteSecondaryMessage,
		dialogDeleteSecondaryParams,
		dialogEditSecondaryManager,
		dialogEditSecondaryParams,
		canAddSecondary,
		canDeleteSecondary,
		canEditSecondary,
		isDeletingSecondary,
		isEditingSecondary,
		dialogDeleteSecondaryCancel,
		dialogDeleteSecondaryError,
		dialogDeleteSecondaryOk,
		dialogDeleteSecondaryOpen,
		dialogEditSecondaryCancel,
		dialogEditSecondaryError,
		dialogEditSecondaryOk,
		dialogEditSecondaryOpen,
		dialogEditSecondaryPreCompleteOk,
		handleAddSecondary,
		rocketTypes,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		markupHint,
		detailItemAlbumLink,
		detailItemAlbumName,
		detailItemAlbumType,
		detailItemCoverUrl,
		detailItemDescription,
		detailItemDocumentLink,
		detailItemDocumentName,
		detailItemDocumentType,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemPublic,
		detailItemRocketType,
		stagesPanels,
		videosPanels,
		dialogDeleteVideoManager,
		dialogDeleteVideoMessage,
		dialogEditVideoManager,
		dialogEditVideoParams,
		coverUrl,
		hasAdmin,
		manufacturers,
		rocketId,
		stages,
		videos,
		dialogEditPreCompleteOkRocketPart,
		dialogDeleteVideoCancel,
		dialogDeleteVideoError,
		dialogDeleteVideoOk,
		dialogDeleteVideoOpen,
		dialogEditVideoCancel,
		dialogEditVideoError,
		dialogEditVideoOk,
		dialogEditVideoOpen,
		dialogEditVideoPreCompleteOk,
		handleAddVideo,
		isDeletingVideo,
		isEditingVideo,
		stagesPanelsUpdated,
		videosPanelsUpdated,
		updateStage,
		updateVideo,
		scope: 'RocketControl',
		validation: useVuelidate({ $scope: 'RocketControl' })
	};
};
</script>
