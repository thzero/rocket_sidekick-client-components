<script>
import { computed } from 'vue';
import { firstBy, thenBy } from 'thenby';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useLinksBaseComponent(props, context, options) {
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
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const links = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.links)
			return [];
		return temp.links.filter(l => l.enabled);
	});
	const linksBooks = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'book');
		return links.value.filter(l => l.category === 'book').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksCompetitions = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'competition');
		return links.value.filter(l => l.category === 'competition').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksEvents = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'event');
		return links.value.filter(l => l.category === 'event').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksForums = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'forum');
		return links.value.filter(l => l.category === 'forum').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksGeneral = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => String.isNullOrEmpty(l.category));
		return links.value.filter(l => String.isNullOrEmpty(l.category)).sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksGuidance = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'guidance');
		return links.value.filter(l => l.category === 'guidance').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksManufacturers = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'manufacturer');
		return links.value.filter(l => l.category === 'manufacturer').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksOrganizations = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'organization');
		return links.value.filter(l => l.category === 'organization').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksVendors = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'vendor');
		return links.value.filter(l => l.category === 'vendor').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
	});
	const linksVideos = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'video');
		return links.value.filter(l => l.category === 'video').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.name && v2.name) && (v1.name.localeCompare(v2.name)); })
		);
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
		sortByOrder,
		target,
		links,
		linksBooks,
		linksCompetitions,
		linksEvents,
		linksForums,
		linksGeneral,
		linksGuidance,
		linksManufacturers,
		linksOrganizations,
		linksVendors,
		linksVideos
	};
};
</script>
