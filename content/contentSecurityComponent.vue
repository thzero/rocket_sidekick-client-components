<script>
import { ref, onMounted } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useMasterDetailSecurityComponent(props, context, options) {
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

	const user = ref(null);
	
	const isAdmin = (correlationId) => {
		return false; // TODO: SECURITY: Allow admin
	};
	const isOwner = (correlationId, item) => {
		const ownerId = (user.value ?? {}).id;
		return item ? item.ownerId == ownerId : false;
	};
	const isPublic = (correlationId, item) => {
		return item ? item.public ?? false : false;
	};
	const isPublicDisplay = (item) => {
		return '(' + (item ? LibraryClientUtility.$trans.t('strings.content.public') : '') + ')';
	};

	onMounted(async () => {
		user.value = await serviceStore.user;
	});

	return {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay
	};
};
</script>
