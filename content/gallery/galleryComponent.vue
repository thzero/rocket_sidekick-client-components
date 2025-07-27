<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useUserGalleryComponent(props, context, options) {
	const route = useRoute();

	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	const serviceUser = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);

	const requestedTag = ref(route.params.user);
	const showInvalid = ref(false);
	const user = ref(null);

	const title = computed(() => {
		// let name = user.value ? user.value.settings ? user.value.settings.gamerTag : (user.value.external ? user.value.external.name : '') : '';
		if (user.value) {
			let name = user.value && user.value.external ? user.value.external.name : '';
			if (options && options.type === AppCommonConstants.Rocketry.DisplayTypes.User)
				name = LibraryClientUtility.$trans.t('titles.content.yours');
			else
				name = `${name}'s`;
			return `${name} ${LibraryClientUtility.$trans.t('titles.content.gallery')}`;
		}
		return LibraryClientUtility.$trans.t('titles.content.gallery');
	});

	const fetchUser = async () => {
		if (options && options.type === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			if (requestedTag.value) {
				const response = await serviceUser.fetchByGamerTag(correlationId(), requestedTag.value);
				if (hasSucceeded(response)) {
					user.value = response.results;
					return;
				}

				showInvalid.value = true;
				return;
			}

			user.value = await serviceStore.user;
			return;
		}
		
		user.value = serviceStore.user;
	};

	onMounted(async () => {
		if (options && options.user ? options.user : false)
			await fetchUser();
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
		requestedTag,
		showInvalid,
		title,
		user
	};
}
</script>