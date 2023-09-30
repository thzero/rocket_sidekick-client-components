<script>
import { computed, ref, onMounted } from 'vue';
import { firstBy, thenBy } from 'thenby';

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
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t(`messages.${options.dialogDeleteMessage ? options.dialogDeleteMessage : 'items'}.delete_confirm`));
	const dialogDeleteParams = ref(null);
	const detailItem = ref(null);
	const items = ref([]);
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
	const showDetailItem = computed(() => {
		return LibraryCommonUtility.isNotNull(detailItem.value);
	});
	const showList = computed(() => {
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
				setNotify(correlationIdI, 'messages.error');
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

			const response = await options.deleteItem(correlationId(), dialogDeleteParams.id);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'messages.error');
				return;
			}
			await fetch(correlationId());
		}
		finally {
			dialogDeleteParams.id = null;
			dialogDeleteManager.value.ok();
		}
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item))
			return;

		dialogDeleteParams.id = item.id;
		dialogDeleteManager.value.open();
	};
	const fetch = async (correlationId) => {
		const response = await options.fetch(correlationId);
		if (hasFailed(response))
			return [];
		
		// const results = response.results.sort((a, b) => a.sortName.localeCompare(b.sortName));
		const results = response.results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		);
		items.value = results;
		return results;
	};
	const handleAdd = async () => {
		detailItem.value = await initNew();
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
	const isOwner = (correlationId, item) => {
		const ownerId = (user.value ?? {}).id;
		return item ? item.ownerId == ownerId : false; // TODO: allow admin
	};

	onMounted(async () => {
		user.value = await serviceStore.user;

		const correlationIdI = correlationId();
		if (options.init)
			await options.init(correlationIdI);

		await fetch(correlationIdI);
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
		showDetailItem,
		showList,
		canCopy,
		canDelete,
		canEdit,
		canView,
		detailClose,
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
		isOwner,
		display
	};
};
</script>
