<script>
import { computed, ref, onMounted } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useDisplayComponent } from '@thzero/library_client_vue3_vuetify3/components/display';
import { useNotify } from '@thzero/library_client_vue3/components/notify';

export function useMasterDetailComponent(props, context, options) {
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

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const display = useDisplayComponent();
	
	const dialogCopyManager = ref(new DialogSupport());
	const dialogCopyParams = ref(null);
	const dialogCopyRef = ref(null);
	const dialogDeleteManager = ref(new DialogSupport());
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t(`messages.${options.dialogDeleteMessage ? options.dialogDeleteMessage : 'items'}.delete_confirm'`));
	const dialogDeleteParams = ref(null);
	const detailItem = ref(null);
	const items = ref([]);

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
		return item && (options.canCopy ? options.canCopy(correlationId(), item) : true);
	};
	const canDelete = (item) => {
		return item && (options.canDelete ? options.canDelete(correlationId(), item) : true);
	};
	const canEdit = (item) => {
		return item && (options.canEdit ? options.canEdit(correlationId(), item) : true);
	};
	const canView = (item) => {
		return item && (options.canView ? options.canView(correlationId(), item) : true);
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
			const correlationIdI = correlationId();
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'messages.error');
				return;
			}

			detailItem.value = initNew(response.results);
			items.value = await fetch(correlationIdI);
		}
		finally {
			dialogCopyParams.value = null;
			dialogCopyManager.value.ok();
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
			if (!dialogDeleteParams.value || !dialogDeleteParams.value.id)
				return;

			const response = await serviceStore.dispatcher.deletePartByIdUser(correlationId(), dialogDeleteParams.value.id);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'messages.error');
				return;
			}
			items.value = await fetch(correlationId());
		}
		finally {
			dialogDeleteParams.value = null;
			dialogDeleteManager.value.ok();
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
	const fetch = async (correlationId) => {
		const response = await options.fetch(correlationId);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const handleAdd = () => {
		detailItem.value = initNew();
	};
	const handleEdit = async (item) => {
		const correlationIdI = correlationId();
		detailItem.value = null;
		const response = await options.fetchItem(correlationIdI, item.id);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'messages.error');
			return;
		}
		
		detailItem.value = initEdit(response.results);
	};
	const handleView = async (item) => {
		const correlationIdI = correlationId();
		detailItem.value = null;
		const response = await options.fetchItem(correlationIdI, item.id);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'messages.error');
			return;
		}
		
		detailItem.value = initView(response.results);
	};
	const initEdit = (data) => {
		return { data: LibraryCommonUtility.cloneDeep(data), isNew: false, isEditable: true }
	};
	const initNew = (data) => {
		if (options.initNew)
			data = options.initNew(correlationId(), data);
		if (!data)
			throw Error('Invalid data...');
		return { data: data, isNew: true, isEditable: true  }
	};
	const initView = (data) => {
		return { data: data, isNew: true, isEditable: false  }
	};
	const isCopying = (item) => {
		if (!dialogCopyParams.value || !dialogCopyParams.value.id || !item)
			return false;

		return item.id === dialogCopyParams.value.id;
	};
	const isDeleting = (item) => {
		if (!dialogDeleteParams.value || !dialogDeleteParams.value.id || !item)
			return false;

		return item.id === dialogDeleteParams.value.id;
	};

	onMounted(async () => {
		items.value = await fetch(correlationId());
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
		dialogCopyManager,
		dialogCopyRef,
		dialogDeleteManager,
		dialogDeleteMessage,
		detailItem,
		items,
		colsEditPanel,
		colsSearchResults,
		displayEditPanel,
		displaySearchResults,
		hasDetailItem,
		hasList,
		canCopy,
		canDelete,
		canEdit,
		canView,
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
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		display
	};
};
</script>
