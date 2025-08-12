<script>
import { computed, onMounted, ref} from 'vue';
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
	const params = ref({});
	// console.log(props.requestedTag, 'useRocketSetupsBaseComponent.props.requestedTag');
	const requestedTag = ref(props.requestedTag);
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	if (!requestedTag.value) {
		console.log(options ? options.requestedTag : 'unknown', 'useRocketSetupsBaseComponent.options.requestedTag');
		requestedTag.value = options ? options.requestedTag : null;
	}
	// console.log(requestedTag.value, 'useRocketSetupsBaseComponent.requestedTag.value');
	const rockets = ref([]);
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
		reset(correlationIdI, true);
		await submit(correlationIdI);
	};
	const clickSearch = async () => {
		await submit(correlationId());
	};
	const filter = async () => {
		params.value.name = filterItemRocketName.value;
		params.value.rocketTypes = filterItemRocketTypes.value;
		if (options && options.filter)
			await options.filter(params.value);
	};
	const fetch = async () => {
		rockets.value = await fetchRocketsFilter(await fetchRockets());
	};
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};
	const fetchRockets = async () => {
		let response;

		filter(params);

		// console.log(type.value, 'useRocketSetupsBaseComponent.fetch.type.value');
		if (type.value === AppCommonConstants.Rocketry.DisplayTypes.Site)
			response = await serviceStore.dispatcher.requestRocketsGallery(correlationId(), params.value);
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.User) {
			params.value.userId = serviceStore.user ? serviceStore.user.id : null;
			response = await serviceStore.dispatcher.requestRocketsGalleryUser(correlationId(), params.value);
		}
		else if (type.value === AppCommonConstants.Rocketry.DisplayTypes.GamerTag) {
			params.value.gamerTag = requestedTag.value;
			if (!params.value.gamerTag)
				return [];
			response = await serviceStore.dispatcher.requestRocketsGalleryGamerTag(correlationId(), params.value);
		}

		if (hasFailed(response))
			return [];

		return response.results;
	};
	const fetchRocketsFilter = async (results) => {
		if (!params.value)
			return results;

		let output = [];
		let valid = false;
		for(let result of results) {
			valid = true;
			if (params.value.rocketTypes) {
				let validType = false;
				for(let rocketType of params.value.rocketTypes) {
					if (result.rocketTypes.includes(rocketType)) {
						validType = true;
						continue;
					}
				}
				valid &= validType;
			}
			if (params.value.name) {
				let validName = false;
				if (result.name.toLowerCase() === params.value.name.toLowerCase())
					validName = true;
				if (result.name.toLowerCase().includes(params.value.name.toLowerCase()))
					validName = true;
				valid &= validName;
			}

			if (valid)
				output.push(result);
		}

		return output;
	};
	const reset = () => {
		filterItemRocketName.value = null;
		filterItemRocketTypes.value = null;
		if (options && options.reset)
			options.reset();
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
	const submit = async () => {
		const correlationIdI = correlationId();
		try {
			isSearching.value = true;

			const result = await validation.value.$validate();
			validation.value.$reset();
			logger.debug('useRocketsUserGalleryComponent', 'submit', 'result', result, correlationIdI);
			if (!result)
				return;

			await fetch();

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
		await fetchManufacturers();
		await fetch();
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
		params,
		rockets,
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
