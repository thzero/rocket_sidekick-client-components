<script>
import { computed, onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';
import { useNotify } from '@thzero/library_client_vue3/components/notify';

import ChecklistData from 'rocket_sidekick_common/data/checklists/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export function useChecklistsBaseComponent(props, context, options) {
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
	} = useContentBaseComponent(props, context, options);

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const display = useDisplayComponent();

	const checklists = ref([]);
	const dialogCopyManager = ref(new DialogSupport());
	const dialogCopyParams = ref(null);
	const dialogCopyRef = ref(null);
	const dialogDeleteManager = ref(new DialogSupport());
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.delete_confirm'));
	const dialogDeleteParams = ref(null);
	const dialogStartManager = ref(new DialogSupport());
	const dialogStartMessage = ref(LibraryClientUtility.$trans.t('messages.checklists.start_confirm'));
	const dialogStartParams = ref(null);
	const detailItem = ref(null);
	const params = ref({});
	const title = ref(
		(props.type === AppCommonConstants.Checklists.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.checklists.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.checklists.title')
	);

	const colsEditPanel = computed(() => {
		if (display.lgAndDown.value)
			return hasDetailItem.value ? 12 : 0;

		return hasDetailItem.value ? 8 : 0;
	});
	const colsSearchResults = computed(() => {
		if (display.lgAndDown.value)
			return hasDetailItem.value ? 0 : 12;

		return hasDetailItem.value ? 4 : 12;
	});
	const displayEditPanel = computed(() => {
		return hasDetailItem.value;
	});
	const displaySearchResults = computed(() => {
		if (display.mdAndDown.value)
			return hasDetailItem.value;

		return true;
	});
	const hasDetailItem = computed(() => {
		return LibraryCommonUtility.isNotNull(detailItem.value);
	});
	const hasList = computed(() => {
		return !display.lgAndDown.value;
	});

	const canCopy = (item) => {
		return item && isDefault(item) || isShared(item) || !isInProgress(item);
	};
	const canDelete = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item);
	};
	const canEdit = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canStart = (item) => {
		return item && !isDefault(item) && !isShared(item) && !isInProgress(item) && !isCompleted(item);
	};
	const canView = (item) => {
		return item && isDefault(item) || isShared(item);
	};
	const checklistTypeIcon = (item) => {
		const icon = checklistTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const checklistTypeIconDetermine = (item) => {
		if (!item)
			return null;
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highone)
			return 'rocket_level1.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.low)
			return 'rocket_low.png';
		if (item.launchTypeId === AppCommonConstants.Rocketry.RocketTypes.mid)
			return 'rocket_mid.png';
		return null;
	};
	const checklistUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Site)
			return '/checklist/' + item.id;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Personal)
			return '/user/checklist/' + item.id;
		return null;
	};
	const detailClose = async () => {
		detailItem.value = null;
	};
	const detailOk = async () => {
	};
	const dialogCopyCancel = async (item) => {
		try {
			dialogCopyManager.value.cancel();
		}
		finally {
			dialogCopyParams.value = null;
		}
	};
	const dialogCopyOk = async (response) => {
		try {
			dialogCopyManager.value.ok();
			if (hasFailed(response)) {
				alert(response.results);
				return;
			}

			detailItem.value = initNew(response.results);
			checklists.value = await fetch();
		}
		finally {
			dialogCopyParams.value = null;
		}
	};
	const dialogCopyOpen = (item) => {
		if (!item)
			return;
		// if (!canCopy(item))
		// 	return;

		dialogCopyParams.value = { id: item.id, name: item.name };
		dialogCopyManager.value.open();
	};
	const dialogDeleteCancel = async (item) => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.value = null;
		}
	};
	const dialogDeleteOk = async (item) => {
		try {
			dialogDeleteManager.value.ok();

			if (!dialogDeleteParams.value || !dialogDeleteParams.value.id)
				return;

			await serviceStore.dispatcher.deleteChecklistByIdUser(correlationId(), dialogDeleteParams.value.id);
			checklists.value = await fetch();
		}
		finally {
			dialogDeleteParams.value = null;
		}
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item))
			return;

		dialogDeleteParams.value = { id: item.id };
		dialogDeleteManager.value.open();
	};
	const dialogStartCancel = async (item) => {
		try {
			dialogStartManager.value.cancel();
		}
		finally {
			dialogStartParams.value = null;
		}
	};
	const dialogStartOk = async (item) => {
		try {
			dialogStartManager.value.ok();

			if (!dialogStartParams.value || !dialogStartParams.value.id)
				return;

			// const response = await serviceStore.dispatcher.startChecklist(correlationId(), dialogDeleteParams.value.id);
			// TODO
			alert('start');
		}
		finally {
			dialogStartParams.value = null;
		}
	};
	const dialogStartOpen = (item) => {
		if (!item)
			return;
		if (!canStart(item))
			return;

		dialogStartParams.value = { id: item.id };
		dialogStartManager.value.open();
	};
	const fetch = async () => {
		let response;
		if (props.type === AppCommonConstants.Checklists.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestChecklists(correlationId(), params.value);
		else if (props.type === AppCommonConstants.Checklists.DisplayTypes.User)
			response = await serviceStore.dispatcher.requestChecklistsUser(correlationId(), params.value);

		if (hasFailed(response))
			return [];
		return response.results;
	};
	const handleAdd = () => {
		detailItem.value = initNew();
	};
	const handleEdit = (item) => {
		detailItem.value = initEdit(item);
	};
	const handleView = async (item) => {
		const correlationIdI = correlationId();
		detailItem.value = null;
		const response = await serviceStore.dispatcher.requestChecklistByIdUser(correlationIdI, item.id);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'messages.saved_failed');
			return;
		}
		
		detailItem.value = initView(response.results);
	};
	const initEdit = (data) => {
		return { data: LibraryCommonUtility.cloneDeep(data), isNew: false, isEditable: true }
	};
	const initNew = (defData) => {
		const data = defData ? defData : new ChecklistData();
		data.typeId = AppCommonConstants.Checklists.ChecklistTypes.launch;
		return { data: data, isNew: true, isEditable: true  }
	};
	const initView = (data) => {
		return { data: data, isNew: true, isEditable: false  }
	};
	const isCompleted = (item) => {
		return item ? item.completed  ?? false : false;
	};
	const isCopying = (item) => {
		if (!dialogCopyParams.value || !dialogCopyParams.value.id || !item)
			return false;

		return item.id === dialogCopyParams.value.id;
	};
	const isDefault = (item) => {
		return item ? item.isDefault ?? false : false;
	};
	const isDeleting = (item) => {
		if (!dialogDeleteParams.value || !dialogDeleteParams.value.id || !item)
			return false;

		return item.id === dialogDeleteParams.value.id;
	};
	const isInProgress = (item) => {
		return item ? item.type === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
	};
	const isShared = (item) => {
		return item ? item.isShared ?? false : false;
	};
	const isStarting = (item) => {
		if (!dialogStartParams.value || !dialogStartParams.value.id || !item)
			return false;

		return item.id === dialogStartParams.value.id;
	};

	onMounted(async () => {
		checklists.value = await fetch();
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		checklists,
		dialogCopyManager,
		dialogCopyRef,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogStartManager,
		dialogStartMessage,
		detailItem,
		title,
		colsEditPanel,
		colsSearchResults,
		displayEditPanel,
		displaySearchResults,
		hasDetailItem,
		hasList,
		canCopy,
		canDelete,
		canEdit,
		canStart,
		canView,
		checklistTypeIcon,
		checklistTypeIconDetermine,
		checklistUrl,
		detailClose,
		detailOk,
		dialogCopyCancel,
		dialogCopyParams,
		dialogCopyOk,
		dialogCopyOpen,
		dialogDeleteCancel,
		dialogDeleteParams,
		dialogDeleteOk,
		dialogDeleteOpen,
		dialogStartCancel,
		dialogStartParams,
		dialogStartOk,
		dialogStartOpen,
		params,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCompleted,
		isCopying,
		isDefault,
		isDeleting,
		isInProgress,
		isShared,
		isStarting,
		display
	};
};
</script>
