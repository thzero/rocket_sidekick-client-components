<script>
import { computed, onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLocationEditDialogComponent(props, context, options) {
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

	const {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const {
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);
	
	const detailItemAddressCity = ref(null);
	const detailItemAddressCountry = ref(null);
	const detailItemAddressPostalCode = ref(null);
	const detailItemAddressStateProvince = ref(null);
	const detailItemCoordsLat = ref(null);
	const detailItemCoordsLong = ref(null);
	const detailItemDates = ref(null);
	const detailItemExperimental = ref(false);
	const detailItemName = ref(null);
	const detailItemNumber = ref(null);
	const detailItemOrganizations = ref([]);
	const detailItemRocketTypes = ref([]);
	const detailItemYear = ref(null);
	
	let countryWatcher = null;
	
	const countries = computed(() => {
		let temp = [];
		if (props.countriesAndStateProvinces)
			temp = props.countriesAndStateProvinces.map(l => { return { id: l.id, name: l.name }; });
		return LibraryClientVueUtility.selectBlank(temp, '');
	});
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.locations.iterations.name') + ' ' + 
		numberOrYearOrName.value;
	});
	const numberOrYearOrName = computed(() => {
		if (detailItemNumber.value)
			return detailItemNumber.value;
		if (detailItemYear.value)
			return detailItemYear.value;
		if (detailItemName.value)detailItemName
			return detailItemName.value;
		return '';
	});
	const stateProvinces = computed(() => {
		if (!props.countriesAndStateProvinces)
			return [];
		const id = detailItemAddressCountry.value;
		if (String.isNullOrEmpty(id))
			return [];
		const temp = props.countriesAndStateProvinces.find(l => l.id === id);
		if (!temp)
			return [];
		return temp.stateProvinces.map(l => { return { id: l.state_code, name: l.name }; });
	});

	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useLocationDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);
			
		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};
	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
	};
	const resetEditData = (correlationId, value) => {
		try {
			if (countryWatcher)
				countryWatcher();
			countryWatcher = null;

			detailItemAddressCity.value = value && value.address ? value.address.city : null;
			detailItemAddressCountry.value = value && value.address ? value.address.country : null;
			detailItemAddressPostalCode.value = value && value.address ? value.address.postalCode : null;
			detailItemAddressStateProvince.value = value && value.address ? value.address.stateProvince : null;

			detailItemCoordsLat.value = value ? value.coordsLat : null;
			detailItemCoordsLong.value = value ? value.coordsLong : null;

			detailItemDates.value = value ? value.dates : null;
			detailItemExperimental.value = value ? value.experimental : null;
			detailItemNumber.value = value ? value.number : null;
			detailItemOrganizations.value = value ? value.organizations : null;
			detailItemRocketTypes.value = value ? value.rocketTypes : null;
			detailItemYear.value = value ? value.year : null;
		}
		finally {
			countryWatcher = watch(() => detailItemAddressCountry.value,
				(value, prev) => {
					if (value === prev)
						return;

					detailItemAddressStateProvince.value = null;
				}
			);
		}
	};
	const setAdditional = async (correlationId) => {
		setEditData(correlationId, detailItem.value);
	};
	const setEditData = (correlationId, value) => {
		value.address = value.address ?? {};
		value.address.city = detailItemAddressCity.value;
		value.address.country = detailItemAddressCountry.value;
		value.address.postalCode = detailItemAddressPostalCode.value;
		value.address.stateProvince = detailItemAddressStateProvince.value;

		value.coordsLat = detailItemCoordsLat.value;
		value.coordsLong = detailItemCoordsLong.value;

		value.dates = LibraryCommonUtility.removeNulls(detailItemDates.value);
		value.experimental = detailItemExperimental.value;
		value.number = detailItemNumber.value;
		value.organizations = detailItemOrganizations.value;
		value.organizations = value.organizations && value.organizations.length > 0 ? value.organizations : null;
		value.rocketTypes = detailItemRocketTypes.value;
		value.rocketTypes = value.rocketTypes && value.rocketTypes.length > 0 ? value.rocketTypes : null;
		value.year = detailItemYear.value;
	};

	// watch(() => detailItemAddressCountry.value,
	// 	(value, prev) => {
	// 		if (value === prev)
	// 			return;

	// 		detailItemAddressStateProvince.value = null;
	// 	}
	// );

	return {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable,
		rocketTypes,
		organizations,
		organizationName,
		organizationNames,
		detailItemAddressCity,
		detailItemAddressCountry,
		detailItemAddressPostalCode,
		detailItemAddressStateProvince,
		detailItemCoordsLat,
		detailItemCoordsLong,
		detailItemDates,
		detailItemExperimental,
		detailItemName,
		detailItemNumber,
		detailItemOrganizations,
		detailItemRocketTypes,
		detailItemYear,
		resetEditData,
		setEditData,
		countries,
		displayName,
		numberOrYearOrName,
		stateProvinces,
		preCompleteOk,
		resetAdditional,
		setAdditional,
		scope: 'LocationEditDialog',
		validation: useVuelidate({ $scope: 'LocationEditDialog' })
	};
};
</script>
