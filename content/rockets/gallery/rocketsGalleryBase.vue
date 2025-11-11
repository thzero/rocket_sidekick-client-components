<script>
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketsGalleryBaseComponent(props, context, options) {
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
	} = useRocketsUtilityComponent(props, context, options);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	// console.log(options, 'useRocketSetupsBaseComponent.options');
	// console.log(options ? options.parent : 'unknown', 'useRocketSetupsBaseComponent.options.parent');
	// console.log(props, 'useRocketSetupsBaseComponent.props');
	// console.log(props.type, 'useRocketSetupsBaseComponent.props.type');
	const type = ref(props ? props.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site);
	// console.log(type.value, 'useRocketSetupsBaseComponent.type.value');
	if (!type.value) {
		// console.log(options ? options.type : 'unknown', 'useRocketSetupsBaseComponent.options.type');
		type.value = options ? options.type ?? AppCommonConstants.Rocketry.DisplayTypes.Site : AppCommonConstants.Rocketry.DisplayTypes.Site;
	}
	// console.log(type.value, 'useRocketSetupsBaseComponent.type.value');
	const displayDrawer = ref(false);
	const filterItemRocketName = ref(null);
	const filterItemRocketTypes = ref(null);
	const invalid = ref(false);
	const isSearching = ref(false);
	const manufacturers = ref(null);
	// console.log(props.requestedTag, 'useRocketSetupsBaseComponent.props.requestedTag');
	const requestedTag = ref(props.requestedTag);
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	if (!requestedTag.value) {
		console.log(options ? options.requestedTag : 'unknown', 'useRocketSetupsBaseComponent.options.requestedTag');
		requestedTag.value = options ? options.requestedTag : null;
	}
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	const rockets = ref([]);
	const searchCriteria = ref({});
	const title = ref(
		(type.value === AppCommonConstants.Rocketry.DisplayTypes.User ? LibraryClientUtility.$trans.t('titles.content.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.content.rockets.title') + ' ' + LibraryClientUtility.$trans.t('titles.content.gallery')
	);
	const validation = ref(useVuelidate({ $scope: 'RocketsUserGalleryComponent' }));

	const buttonOkDisabled = computed(() => {
		return (invalid.value);
	});
	const clickSearchClear = async () => {
		const correlationIdI = correlationId();
		isSearching.value = false;
		reset(correlationIdI);
		saveSettings(correlationIdI);
		await submit(correlationIdI);
	};
	const clickSearch = async () => {
		await submit(correlationId());
	};
	const filter = async () => {
		searchCriteria.value.name = filterItemRocketName.value;
		searchCriteria.value.rocketTypes = filterItemRocketTypes.value;
		if (options && options.filter)
			await options.filter(searchCriteria.value);
	};
	const fetch = async (correlationId) => {
		rockets.value = await fetchRocketsFilter(correlationId, await fetchRockets(correlationId));
		saveSettings(correlationId);
	};
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};
	const fetchRockets = async (correlationIdI) => {
		filter(searchCriteria);

		let response;
		// console.log(type.value, 'useRocketSetupsBaseComponent.fetch.type.value');
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRocketsGallery(correlationId(), searchCriteria.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			searchCriteria.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestRocketsGalleryUser(correlationId(), searchCriteria.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			searchCriteria.value.gamerTag = requestedTag.value;
			if (!searchCriteria.value.gamerTag)
				return [];
			response = await serviceStore.dispatcher.requestRocketsGalleryGamerTag(correlationId(), searchCriteria.value);
		}

		if (hasFailed(response))
			return [];

		return response.results;
	};
	const fetchRocketsFilter = async (correlationIdI, results) => {
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
			if (searchCriteria.value.name) {
				let validName = false;
				if (result.name.toLowerCase() === searchCriteria.value.name.toLowerCase())
					validName = true;
				if (result.name.toLowerCase().includes(searchCriteria.value.name.toLowerCase()))
					validName = true;
				valid &= validName;
			}

			if (valid)
				output.push(result);
		}

		return output;
	};
	const reset = (correlationId, settings) => {
		filterItemRocketName.value = settings && settings.filters ? settings.filters.name : null;
		filterItemRocketTypes.value = settings && settings.filters ? settings.filters.rocketTypes : null;
		if (options && options.reset)
			options.reset(correlationId, settings);
		invalid.value = validation.value.$invalid;
	};
	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			return '/rocket/' + item.id;
		// if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User)
		// 	return '/user/rocket/' + item.id;
		return null;
	};
	const saveSettings = (correlationId) => {
		serviceStore.dispatcher.saveRocketsGallerySettings(correlationId, { filters: searchCriteria.value }, requestedTag.value);
	};
	const submit = async () => {
		const correlationIdI = correlationId();
		try {
			isSearching.value = true;

			const result = await validation.value.$validate();
			validation.value.$reset();
			logger.debug('useRocketsUserGalleryComponent', 'submit', 'result', result, correlationIdI);
			if (!result)
				return;

			await fetch(correlationIdI);

			logger.debug('useRocketsUserGalleryComponent', 'submit', 'ok', null, correlationId);
		}
		catch (err) {
			logger.exception('useRocketsUserGalleryComponent', 'submit', err, correlationId);
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
		const settings = serviceStore.getters.getRocketsGallerySettings(correlationIdI, requestedTag.value);
		reset(correlationIdI, settings);
		await fetchManufacturers(correlationIdI);
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
		displayDrawer,
		filterItemRocketName,
		filterItemRocketTypes,
		invalid,
		isSearching,
		manufacturers,
		rockets,
		searchCriteria,
		title,
		type,
		validation,
		buttonOkDisabled,
		clickSearchClear,
		clickSearch,
		fetch,
		reset,
		rocketUrl,
		submit,
		toggleDrawer
	};
};
</script>
