<template>
	<v-navigation-drawer
		v-model="displayDrawer"
		temporary
		:style="displayDrawer ? ($vuetify.display.xs ? 'width: 100%;' : 'min-width: 450px;') : ''"
	>
		<v-card>
			<v-card-text>
				<v-row dense>
					<v-col cols="12">
						<VtTextFieldWithValidation
							ref="filterItemRocketNameRef"
							v-model="filterItemRocketName"
							vid="filterItemRocketName"
							:validation="validation"
							:label="$t('forms.content.rockets.name') + ' ' + $t('forms.name')"
							:maxcount="30"
						/>
					</v-col>
					<v-col cols="12">
						<VtSelectWithValidation
							ref="filterItemRocketTypesRef"
							v-model="filterItemRocketTypes"
							vid="filterItemRocketTypes"
							multiple
							:max-values="2"
							:items="rocketTypes"
							:validation="validation"
							:label="$t('forms.content.rockets.name') + ' ' + $t('forms.content.rockets.level')"
							:hint="$t('forms.content.rockets.level')"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					:variant="buttonsForms.variant.clear"
					:color="buttonsForms.color.clear"
					@click="clickSearchClear()"
				>{{ $t('buttons.clear') }}</v-btn>
				<v-btn
					:variant="buttonsForms.variant.ok"
					:color="buttonsForms.color.ok"
					:disabled="buttonOkDisabled"
					@click="clickSearch()"
				>{{ $t('buttons.search') }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-navigation-drawer>
	<v-row
		v-if="!rocketId"
		dense
		class="mt-2"
	>
		<v-col 
			cols="2" md="1"
		>
			<v-btn
				v-if="$vuetify.display.lgAndUp"
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				@click="toggleDrawer"
				:disabled="displayDrawer"
			>
				{{ $t('buttons.search') }}
			</v-btn>
		</v-col>
		<v-col 
			cols="9" md="10"
		>
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="6" v-if="searchCriteria.name">
							<b>{{ $t('forms.name')}}:</b>
							{{ searchCriteria.name }}
						</v-col>
						<v-col cols="6" v-if="searchCriteria.rocketTypes">
							<b>{{ $t('forms.content.rockets.level')}}:</b>
							<v-chip
								v-for="item in searchCriteria.rocketTypes"
								:key="item"
							>{{ rocketTypeName(item) }}</v-chip>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col 
			cols="2" md="1"
			class="text-right"
		>
			<v-btn
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				@click="toggleDrawer"
				:disabled="displayDrawer"
			>
				{{ $t('buttons.search') }}
			</v-btn>
		</v-col>
	</v-row>
	<v-row
		v-if="!rocketId"
		dense
		class="mt-2"
	>
		<v-col 
			cols="12" md="6"
			v-for="item in rockets"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<RocketPanel
				:item="item"
				clickType="click"
				:displayExtras="true"
				:type="type"
				:requestedTag="requestedTag"
				:manufacturers="manufacturers"
				@display="handleRocket"
			/>
		</v-col>
	</v-row>
	<div
		v-if="rocketId"
	>
		<RocketInfo
			ref="rocketInfo"
			backType="close"
			:type="type"
			:id="rocketId"
			:requestedTag="requestedTag"
			:showUserName="false"
			:manufacturers="manufacturers"
			@close="handleRocketClose"
		/>
	</div>
</template>

<script>
import { useExternalRocketsGalleryBaseProps } from '@/components/content/gallery/rockets/rocketsGalleryComponentProps';
import { useRocketsUserGalleryComponent } from '@/components/content/gallery/rockets/rocketsGalleryComponent';
import { useRocketsGalleryFilterValidation } from '@/components/content/rockets/gallery/rocketsGalleryFilterValidation';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';
import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'UserGalleryRockets',
	components: {
		RocketInfo,
		RocketPanel,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		 ...useExternalRocketsGalleryBaseProps
	},
	setup(props, context) {
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
			user,
			serviceStore,
			sortByOrder,
			target,
			rocketTypes,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocketTypeName,
			rockets,
			searchCriteria,
			title,
			type,
			manufacturers,
			rocketUrl,
			buttonsDialog,
			buttonsForms,
			displayDrawer,
			filterItemRocketName,
			filterItemRocketTypes,
			rocketId,
			rocketInfo,
			invalid,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			handleRocket,
			handleRocketClose,
			toggleDrawer,
			scope,
			validation
		} = useRocketsUserGalleryComponent(props, context);

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
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocketTypeName,
			rockets,
			searchCriteria,
			title,
			type,
			manufacturers,
			rocketUrl,
			buttonsDialog,
			buttonsForms,
			displayDrawer,
			filterItemRocketName,
			filterItemRocketTypes,
			rocketId,
			rocketInfo,
			invalid,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			handleRocket,
			handleRocketClose,
			toggleDrawer,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketsGalleryFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
