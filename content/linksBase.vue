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
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksCompetitions = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'competition');
		return links.value.filter(l => l.category === 'competition').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksEvents = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'event');
		return links.value.filter(l => l.category === 'event').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksForums = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'forum');
		return links.value.filter(l => l.category === 'forum').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksGeneral = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => String.isNullOrEmpty(l.category));
		return links.value.filter(l => String.isNullOrEmpty(l.category)).sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksGuidance = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'guidance');
		return links.value.filter(l => l.category === 'guidance').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksManufacturers = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'manufacturer');
		const results = links.value.filter(l => l.category === 'manufacturer' || l.category === 'vendor');
		return results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksOrganizations = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'organization');
		return links.value.filter(l => l.category === 'organization').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksVendors = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'vendor');
		return links.value.filter(l => l.category === 'vendor').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
		);
	});
	const linksVideos = computed(() => {
		if (!links.value)
			return [];
		// return links.value.filter(l => l.category === 'video');
		return links.value.filter(l => l.category === 'video').sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return (v1.title && v2.title) && (v1.title.localeCompare(v2.title)); })
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
