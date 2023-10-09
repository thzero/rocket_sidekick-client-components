<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useOrganizationsUtilityComponent(props, context, options) {
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

	const organizations = ref(
		['NAR', 'TRP', 'CAR', 'AUS', 'UK'].map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.organizations.' + item) }; })
	);

	const organizationName = (id) => {
		return (organizations.value.find(l => l.id === id) ?? {}).name;
	};

	const organizationNames = (ids) => {
		if (!Array.isArray(ids)) 
			ids = [ ids ];
		let temp = organizations.value.filter(l => ids.includes(l.id));
		temp = temp.map(l => l.name);
		return temp.join(', ');
	};

	return {
		organizations,
		organizationName,
		organizationNames
	};
};
</script>
