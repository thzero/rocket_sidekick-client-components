<script>
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { firstBy, thenBy } from 'thenby';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';
import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLaunchesUserGalleryComponent(props, context) {
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
		requestedTag,
		// title,
		user
	} = useUserGalleryComponent(props, context, { 
		user: false 
	});

	const {
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
		rocketManufacturer,
		rocketManufacturerName,
		rocketManufacturerRocketName,
		rocketManufacturerStockId,
		rocketManufacturerUrl,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest
	} = useRocketsUtilityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const type = ref(props.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site);
	const displayDrawer = ref(false);
	const filterItemLaunchName = ref(null);
	const filterItemLocationName = ref(null);
	const filterItemLocations = ref(null);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const invalid = ref(false);
	const isSearching = ref(false);
	const launches = ref([]);
	const launchId = ref(null);
	const launchInfo = ref(null);
	const locations = ref(null);
	const searchCriteria = ref({});
	const validation = ref(useVuelidate({ $scope: 'LaunchesUserGalleryComponent' }));
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.launches.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);

	const buttonOkDisabled = computed(() => {
		return (invalid.value);
	});
	const clickSearchClear = async () => {
		const correlationIdI = correlationId();
		isSearching.value = false;
		reset(correlationIdI, null);
		saveSettings(correlationIdI);
		await submit(correlationIdI);
	};
	const clickSearch = async () => {
		await submit(correlationId());
	};
	const filter = async () => {
		searchCriteria.value.launchName = filterItemLaunchName.value;
		searchCriteria.value.locationName = filterItemLocationName.value;
		searchCriteria.value.locations = filterItemLocations.value;
		searchCriteria.value.rocketName = filterItemRocketName.value;
		searchCriteria.value.rocketTypes = filterItemRocketTypes.value;
	};
	const fetch = async (correlationId) => {
		launches.value = await fetchLaunchesFilter(correlationId, await fetchLaunches(correlationId));
		saveSettings(correlationId);
	};
	const fetchLaunches = async (correlationId) => {
		filter(searchCriteria);

		let response;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestLaunchesGallery(correlationId, searchCriteria.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			searchCriteria.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestLaunchesGalleryUser(correlationId, searchCriteria.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			searchCriteria.value.gamerTag = props.requestedTag;
			if (!searchCriteria.value.gamerTag)
				return [];
			response = await serviceStore.dispatcher.requestLaunchesGalleryGamerTag(correlationId, searchCriteria.value);
		}

		if (hasFailed(response))
			return [];
		return response.results;
	};
	const fetchLaunchesFilter = async (correlationIdI, results) => {
		if (!searchCriteria.value)
			return results;

		let output = [];
		let valid = false;
		for(let result of results) {
			valid = true;
			if (searchCriteria.value.rocketTypes) {
				let validType = false;
				for(let rocketType of searchCriteria.value.rocketTypes) {
					if (result.rocketTypes.includes(rocketType)) {
						validType = true;
						continue;
					}
				}
				valid &= validType;
			}
			if (searchCriteria.value.launchName) {
				let validName = false;
				if (result.name.toLowerCase() === searchCriteria.value.launchName.toLowerCase())
					validName = true;
				if (result.name.toLowerCase().includes(searchCriteria.value.launchName.toLowerCase()))
					validName = true;
				valid &= validName;
			}
			if (searchCriteria.value.locationName) {
				let validName = false;
				if (result.location && result.location.name && result.location.name.toLowerCase() === searchCriteria.value.locationName.toLowerCase())
					validName = true;
				if (result.location && result.location.name && result.location.name.toLowerCase().includes(searchCriteria.value.locationName.toLowerCase()))
					validName = true;
				valid &= validName;
			}
			if (searchCriteria.value.rocketName) {
				let validName = false;
				if (result && result.rocketSetup && result.rocketSetup.rocket && result.rocketSetup.rocket.name && result.rocketSetup.rocket.name.toLowerCase() === searchCriteria.value.rocketName.toLowerCase())
					validName = true;
				if (result && result.rocketSetup && result.rocketSetup.rocket && result.rocketSetup.rocket.name && result.rocketSetup.rocket.name.toLowerCase().includes(searchCriteria.value.rocketName.toLowerCase()))
					validName = true;
				valid &= validName;
			}
			if (searchCriteria.value.locations) {
				let validName = false;
				for (let locationId of searchCriteria.value.locations) {
					if (result.location && result.location.id === locationId) {
						validName = true;
						break;
					}
				}
				valid &= validName;
			}

			if (valid)
				output.push(result);
		}

		return output;
	};
	const fetchLocations = async (correlationId) => {
		const response = await serviceStore.dispatcher.requestLocations(correlationId, {});
		if (hasFailed(response))
			return;

		response.results = response.results.sort(
			firstBy((v1, v2) => { 
				return (v1 && v1.name && v2 && v2.name) && v1.name.localeCompare(v2.name); 
			})
		);
		
		locations.value = LibraryClientVueUtility.selectOptions(response.results, null, null, (l) => l.id, (l) => l.name);
	};
	const handleLaunch = (id) => {
		launchId.value = id;
	};
	const handleLaunchClose = () => {
		launchId.value = null;
	};
	const launchUrl = (item) => {
		if (!item)
			return null;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		// if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User)
		// 	return '/user/rocket/' + item.id;
		return null;
	};
	const locationName = (id) => {
		const temp = locations.value ? locations.value.find(l => l.id === id) : null;
		return temp ? temp.name : null;
	};
	const reset = (correlationId, settings) => {
		filterItemLaunchName.value = settings && settings.filters ? settings.filters.launchName : null;
		filterItemLocationName.value = settings && settings.filters ? settings.filters.locationName : null;
		filterItemLocations.value = settings && settings.filters ? settings.filters.locations : null;
		filterItemRocketName.value = settings && settings.filters ? settings.filters.rocketName : null;
		filterItemRocketTypes.value = settings && settings.filters ? settings.filters.rocketTypes : null;
		invalid.value = validation.value.$invalid;
	};
	const saveSettings = (correlationId) => {
		serviceStore.dispatcher.saveLaunchesGallerySettings(correlationId, { filters: searchCriteria.value }, requestedTag.value);
	};
	const submit = async () => {
		const correlationIdI = correlationId();
		try {
			isSearching.value = true;

			const result = await validation.value.$validate();
			validation.value.$reset();
			logger.debug('useLaunchesUserGalleryComponent', 'submit', 'result', result, correlationIdI);
			if (!result)
				return;

			await fetch(correlationIdI);

			logger.debug('useLaunchesUserGalleryComponent', 'submit', 'ok', null, correlationId);
		}
		catch (err) {
			logger.exception('useLaunchesUserGalleryComponent', 'submit', err, correlationId);
		}
		finally {
			isSearching.value = false;
			displayDrawer.value = false;
		}
	};
	const toggleDrawer = () => {
		displayDrawer.value = !displayDrawer.value;
	};

	onMounted(async () => {
		const correlationIdI = correlationId();
		const settings = serviceStore.getters.getLaunchesGallerySettings(correlationIdI, requestedTag.value);
		reset(correlationIdI, settings);
		await fetch(correlationIdI);
		await fetchLocations(correlationIdI);
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
		user,
		serviceStore,
		sortByOrder,
		target,
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
		rocketManufacturer,
		rocketManufacturerName,
		rocketManufacturerRocketName,
		rocketManufacturerStockId,
		rocketManufacturerUrl,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest,
		buttonsDialog,
		buttonsForms,
		type,
		displayDrawer,
		filterItemLaunchName,
		filterItemLocationName,
		filterItemLocations,
		filterItemRocketName,
		filterItemRocketTypes,
		invalid,
		isSearching,
		launches,
		launchId,
		launchInfo,
		locations,
		searchCriteria,
		validation,
		title,
		buttonOkDisabled,
		clickSearchClear,
		clickSearch,
		filter,
		fetch,
		fetchLaunches,
		fetchLaunchesFilter,
		handleLaunch,
		handleLaunchClose,
		launchUrl,
		locationName,
		reset,
		saveSettings,
		submit,
		toggleDrawer
	};
}
</script>