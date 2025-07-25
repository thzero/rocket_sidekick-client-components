<script>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { firstBy, thenBy } from 'thenby';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
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
		serviceStore,
		sort,
		target
	} = useContentBaseComponent(props, context, options);

	const route = useRoute();

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);

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
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t(`messages.${options.dialogDeleteMessage ? options.dialogDeleteMessage : 'items'}.delete_confirm`));
	const dialogDeleteParams = ref(null);
	const detailDirty = ref(false);
	const detailItem = ref(null);
	const items = ref([]);
	const requestedItemId = ref(route.params.id);
	const user = ref(null);

	const colsEditPanel = computed(() => {
		if (display.lgAndDown.value)
			return showDetailItem.value ? 12 : 0;

		return showDetailItem.value ? 8 : 0;
	});
	const colsSearchResults = computed(() => {
		if (display.lgAndDown.value)
			return showDetailItem.value ? 0 : 12;

		return showDetailItem.value ? 4 : 12;
	});
	const displayEditPanel = computed(() => {
		return showDetailItem.value;
	});
	const displaySearchResults = computed(() => {
		if (display.mdAndDown.value)
			return showDetailItem.value;

		return true;
	});
	const isDetailOpen = computed(() => {
		return LibraryCommonUtility.isNotNull(detailItem.value);
	});
	const showDetailItem = computed(() => {
		return LibraryCommonUtility.isNotNull(detailItem.value);
	});
	const showList = computed(() => {
		return !display.lgAndDown.value;
	});
	
	const canAdd = () => {
		if (options.canAdd)
			return options.canAdd(correlationId());
		return LibraryCommonUtility.isNotNull(user.value);
	};
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
	const clickSearch = async (submit) => {
		requestedItemId.value = null; // reset the requestdItemId if trying to filter.
		await submit(correlationId());
	};
	const clickSearchClear = async (reset, submit) => {
		const correlationIdI = correlationId();
		requestedItemId.value = route.params.id;
		await reset(correlationIdI, true);
		await submit(correlationIdI);
	};
	const detailClose = async () => {
		detailItem.value = null;
		// await fetch(correlationId());
	};
	const detailDirtyCallback = async (value) => {
		detailDirty.value = value;
	};
	const detailError = async () => {
		detailItem.value = null;
	};
	const detailOk = async () => {
		await fetch(correlationId());
	};
	const dialogCopyCancel = async (item) => {dialogDeleteParams.idV
		try {
			dialogCopyManager.value.cancel();
		}
		finally {
			dialogCopyParams.value = null;
		}
	};
	const dialogCopyError = async (err) => {
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
				setNotify(correlationIdI, 'errors.error');
				return;
			}

			const responseNew = await initNew(correlationIdI, response.results);
			if (hasFailed(responseNew))
				return;

			detailItem.value = responseNew.results;

			await fetch(correlationIdI);
		}
		finally {
			dialogCopyParams.value = null;
			dialogCopyManager.value.ok();
		}
	};
	const dialogCopyOpen = (item) => {
		if (!item)
			return;
		if (!canCopy(item)) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		dialogCopyParams.value = { id: item.id, name: item.name };
		dialogCopyManager.value.open();
	};
	const dialogDeleteCancel = async (item) => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.id = null;
		}
	};
	const dialogDeleteError = async (err) => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.id = null;
		}
	};
	const dialogDeleteOk = async () => {
		try {
			if (!dialogDeleteParams.id)
				return;
			if (!options.deleteItem)
				throw Error('No deleteItem function...');

			const correlationIdI = correlationId();
			const response = await options.deleteItem(correlationIdI, dialogDeleteParams.id);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'errors.error');
				return;
			}
			await fetch(correlationIdI, true);
		}
		finally {
			dialogDeleteParams.id = null;
			dialogDeleteManager.value.ok();
		}
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item)) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		dialogDeleteParams.id = item.id;
		dialogDeleteManager.value.open();
	};
	const fetch = async (correlationId, detailItemReset) => {
		if (detailItemReset === true)
			detailItem.value = null; // reset to so that the detail doesn't display

		const response = await options.fetch(correlationId);
		if (hasFailed(response))
			return [];

		response.results = response.results ?? { data: [], sorted: false };
		
		let results = response.results.data;
		if (!response.results.sorted) {
			results = results.sort(
				firstBy('sortName', { ignoreCase: true })
				.thenBy('name', { ignoreCase: true })
			);
		}

		items.value = results;
		return response;
	};
	const handleAdd = async () => {
		if (!canAdd()) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		detailItem.value = await initNew();
	};
	const handleEdit = async (item) => {
		const correlationIdI = correlationId();
		if (!canEdit(item)) {
			setNotify(correlationIdI, 'errors.security');
			return;
		}

		detailItem.value = null;
		const response = await options.fetchItem(correlationIdI, item.id, true);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'errors.error');
			return;
		}
		
		detailItem.value = initEdit(response.results);
	};
	const handleView = async (item) => {
		const correlationIdI = correlationId();
		if (!canView(item)) {
			setNotify(correlationIdI, 'errors.security');
			return;
		}

		detailItem.value = null;
		const response = await options.fetchItem(correlationIdI, item.id, false);
		if (hasFailed(response)) {
			setNotify(correlationIdI, 'errors.error');
			return;
		}
		
		detailItem.value = initView(correlationIdI, response.results);
	};
	const initEdit = (data) => {
		return { data: LibraryCommonUtility.cloneDeep(data), isNew: false, isEditable: true }
	};
	const initNew = async (data) => {
		if (options.initNew) {
			const response = await options.initNew(correlationId(), data);
			if (hasFailed(response))
				throw Error('Invalid data...');
			data = response.results;
		}
		if (!data)
			throw Error('Invalid data...');
		return { data: data, isNew: true, isEditable: true  }
	};
	const initView = (correlationIdI, data) => {
		return { data: data, isNew: false, isEditable: false  }
	};
	const isCopying = (item) => {
		if (!dialogCopyParams.value || !item)
			return false;

		return item.id === dialogCopyParams.value;
	};
	const isDeleting = (item) => {
		if (!dialogDeleteParams.id || !item)
			return false;

		return item.id === dialogDeleteParams.id;
	};
	const search = async () => {
		// TODO: Should probably check and see if things are dirty, and raise a confirmation dialog
		return fetch(correlationId(), true);
	};

	onMounted(async () => {
		user.value = await serviceStore.user;

		const correlationIdI = correlationId();
		if (options.init)
			await options.init(correlationIdI);

		await fetch(correlationIdI, true);
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
		requestedItemId,
		colsEditPanel,
		colsSearchResults,
		displayEditPanel,
		displaySearchResults,
		isDetailOpen,
		showDetailItem,
		showList,
		canAdd,
		canCopy,
		canDelete,
		canEdit,
		canView,
		clickSearch,
		clickSearchClear,
		detailClose,
		detailDirty,
		detailDirtyCallback,
		detailError,
		detailOk,
		dialogCopyCancel,
		dialogCopyError,
		dialogCopyOk,
		dialogCopyOpen,
		dialogCopyParams,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dialogDeleteParams,
		fetch,
		handleAdd,
		handleEdit,
		handleView,
		initEdit,
		initNew,
		initView,
		isCopying,
		isDeleting,
		search,
		display
	};
};
</script>
