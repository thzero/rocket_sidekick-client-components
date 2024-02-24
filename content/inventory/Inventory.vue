<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="inventoryListingRef"
		:pre-complete-ok="search"
		:reset-additional="resetAdditional"
		:validation="validation"
		:debug="debug"
		:filter-drawer="true"
	>
		<template #default="{ buttonOkDisabled, filterDrawer, isLoading, reset, submit }">
			<v-card>
				<v-card-text>
					<!-- <v-row dense>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtTextFieldWithValidation
								ref="filterItemNameRef"
								v-model="filterItemName"
								vid="filterItemName"
								:label="$t('forms.name')"
								:validation="validation"
							/>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtSelectWithValidation
								ref="filterItemRocketTypesRef"
								v-model="filterItemRocketTypes"
								vid="filterItemRocketTypes"
								multiple
								:max-values="2"
								:items="rocketTypes"
								:validation="validation"
								:label="$t('forms.content.rockets.level')"
								:hint="$t('forms.content.rockets.level')"
							/>
						</v-col>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtSelectWithValidation
								ref="filterItemOrganizationsRef"
								v-model="filterItemOrganizations"
								vid="filterItemOrganizations"
								multiple
								:max-values="5"
								:items="organizations"
								:validation="validation"
								:label="$t('forms.content.organizations.plural')"
							/>
						</v-col>
					</v-row> -->
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<!-- <v-btn
						v-if="!showDetailItem && !filterDrawer"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="handleAdd(item)"
					>
						{{ $t('buttons.add') }}
					</v-btn>
					<v-btn
						:variant="buttonsForms.variant.clear"
						:color="buttonsForms.color.clear"
						:loading="isLoading"
						@click="clickSearchClear(reset, submit)"
					>
						{{ $t('buttons.clear') }}
					</v-btn>
					<v-btn
						:variant="buttonsForms.variant.ok"
						:color="buttonsForms.color.ok"
						:disabled="buttonOkDisabled"
						:loading="isLoading"
						@click="clickSearch(submit)"
					>
						{{ $t('buttons.search') }}
					</v-btn> -->
				</v-card-actions>
			</v-card>
		</template>
		<template #preActions=" { filterDrawer, isLoading }">
			<v-btn
				class="mr-2"
				color="primary"
			>
				{{ $t('buttons.add') }}
				<v-menu 
					activator="parent"
					location="top"
				>
					<v-list>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="purple"
								block
								@click="clickAltimetersSearch()"
							>
								{{ $t('forms.content.parts.altimeter.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteProtectorsSearch()"
							>
								{{ $t('forms.content.parts.chuteProtector.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteReleasesSearch()"
							>
								{{ $t('forms.content.parts.chuteRelease.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickDeploymentBagsSearch()"
							>
								{{ $t('forms.content.parts.deploymentBag.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickMotorSearch()"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickMotorCaseSearch()"
							>
								{{ $t('forms.content.parts.motorCase.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickParachutesSearch()"
							>
								{{ $t('forms.content.parts.parachute.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickStreamersSearch()"
							>
								{{ $t('forms.content.parts.streamer.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="blue"
								block
								@click="clickTrackersSearch()"
							>
								{{ $t('forms.content.parts.tracker.name') }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>
		</template>
		<template v-slot:listing>
			<v-row dense>
				<v-col cols="12">
					<v-snackbar
						ref="notifyRef"
						v-model="notifySignal"
						:color="notifyColor"
						:timeout="notifyTimeout"
					>
						{{ notifyMessage }}
					</v-snackbar>
					<div
						v-if="debug"
					>
					</div>
				</v-col>
				<v-col
				>
					 <v-row dense>
						<v-col
							cols="12"
						>
							<v-expansion-panels
								v-model="panels"
								class="mt-4"
								multiple
								@update:modelValue="panelsUpdated"
							>
								<v-expansion-panel
									v-for="(type, index) in inventory.types"
									:key="index"
									:value="type.typeId"
								>
									<v-expansion-panel-title
										color="primary"
									>
										<span class="v-card-title pb-0 pl-0 pr-0 pt-0">{{ type.title }}</span>
										<v-spacer></v-spacer>
			<v-btn
				class="mr-2"
				color="primary"
			>
				{{ $t('buttons.add') }}
				<v-menu 
					activator="parent"
					location="top"
				>
					<v-list>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="purple"
								block
								@click="clickAltimetersSearch()"
							>
								{{ $t('forms.content.parts.altimeter.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteProtectorsSearch()"
							>
								{{ $t('forms.content.parts.chuteProtector.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteReleasesSearch()"
							>
								{{ $t('forms.content.parts.chuteRelease.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickDeploymentBagsSearch()"
							>
								{{ $t('forms.content.parts.deploymentBag.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickMotorSearch()"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickMotorCaseSearch()"
							>
								{{ $t('forms.content.parts.motorCase.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickParachutesSearch()"
							>
								{{ $t('forms.content.parts.parachute.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickStreamersSearch()"
							>
								{{ $t('forms.content.parts.streamer.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="blue"
								block
								@click="clickTrackersSearch()"
							>
								{{ $t('forms.content.parts.tracker.name') }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>
									</v-expansion-panel-title>
									<v-expansion-panel-text>
										<div
											v-for="(item2, index2) in type.items"
											:key="index2"
										>
											<v-card
												class="mb-2"
											>
												<v-card-title
													:class="index2 % 2 === 1 ? 'bg-grey-darken-3' : 'bg-grey-darken-1'"
												>
												<!-- <pre>{{ item2 }}</pre> -->
													<AltimeterPanelTitle
														v-if="isPartType(item2.item, partTypes.altimeter)"
														:item="item2.item"
													/>
													<ChuteProtectorPanelTitle
														v-if="isPartType(item2.item, partTypes.chuteProtector)"
														:item="item2.item"
													/>
													<ChuteReleasePanelTitle
														v-if="isPartType(item2.item, partTypes.chuteRelease)"
														:item="item2.item"
													/>
													<DeploymentBagPanelTitle
														v-if="isPartType(item2.item, partTypes.deploymentBag)"
														:item="item2.item"
													/>
													<MotorPanelTitle
														v-if="isPartType(item2.item, partTypes.motor)"
														:item="item2.item"
														:displayCaseInfo="true"
													/>
													<MotorCasePanelTitle
														v-if="isPartType(item2.item, partTypes.motorCase)"
														:item="item2.item"
													/>
													<ParachutePanelTitle
														v-if="isPartType(item2.item, partTypes.parachute)"
														:item="item2.item"
													/>
													<StreamerPanelTitle
														v-if="isPartType(item2.item, partTypes.streamer)"
														:item="item2.item"
													/>
													<TrackerPanelTitle
														v-if="isPartType(item2.item, partTypes.tracker)"
														:item="item2.item"
													/>
													<!-- <br
														v-if="$vuetify.display.smAndDown"
													>
														{{ item2.item.manufacturer }}
													 -->
													<v-chip
														v-if="(item2.typeId !== 'motor' && item2.typeId !== 'motorCase') && item2.item && item2.item.weight"
														class="ml-2"
													>
														{{ weightDisplay(item2.item) }}
													</v-chip>
													<div class="float-right">
														<div class="float-right ml-4 mb-2 mt-2">
															<v-btn
																v-if="$vuetify.display.smAndDown"
																:variant="buttonsForms.variant.delete"
																:color="buttonsForms.color.delete"
																block
																@click="handleDelete(item2)"
																icon="mdi-delete"
															>
															</v-btn>
															<v-btn
																v-if="$vuetify.display.mdAndUp"
																:variant="buttonsForms.variant.delete"
																:color="buttonsForms.color.delete"
																block
																@click="handleDelete(item2)"
															>
																{{ $t('buttons.delete') }}
															</v-btn>
														</div>
														<div class="float-right mb-2 mt-2">
															<table>
																<tr>
																	<!-- <td
																		v-if="item2.item.typeId=='motor'"
																	>
																		<VtSelectWithValidation
																			ref="detailItemDelayRef"
																			vid="detailItemDelayRef"
																			v-model="item2.delay"
																			:items="motorDelays(item2.item)"
																			:validation="validation"
																			:label="$t('forms.content.parts.motor.delay')"
																			class="mr-2"
																			style="width: 90px;"
																		/>
																	</td> -->
																	<td
																		v-if="item2.item && item2.item.typeId=='motor'"
																	>
																		<VtNumberField
																			ref="detailItemDelayOverrideRef"
																			v-model="item2.delay"
																			vid="detailItemDelayOverrideRef"
																			:min="0"
																			:max="1000"
																			type="integer"
																			:validation="validation"
																			:label="$t('forms.content.parts.motor.delay')"
																			style="width: 90px;"
																		/>
																	</td>
																	<td
																		v-if="item2.item && item2.item.typeId=='motor'"
																	>
																		<v-menu>
																			<template v-slot:activator="{ props }">
																				<v-btn
																					icon="mdi-menu-down"
																					density="comfortable"
																					color="black"
																					class="mr-2"
																					v-bind="props"
																					></v-btn>
																			</template>
																			<v-list density="compact">
																				<v-list-item
																					v-for="(item3, index) in motorDelays(item2.item)"
																					:key="index"
																					:value="index"
																				>
																					<v-list-item-title
																						@click="selectMotorDelay(item2, item3.value)"
																					>
																						{{ item3.name }}
																					</v-list-item-title>
																				</v-list-item>
																			</v-list>
																		</v-menu>
																	</td>
																	<td>
																		<VtNumberField
																			ref="detailItemQuantityRef"
																			v-model="item2.quantity"
																			vid="detailItemQuantity"
																			:min="0"
																			:max="1000"
																			type="integer"
																			:validation="validation"
																			:label="$t('forms.content.inventory.quantity')"
																			style="width: 90px;"
																		/>
																	</td>
																</tr>
															</table>
														</div>
													</div>
													<div
														class="float-right mr-2"
														v-if="$vuetify.display.mdAndUp"
													>
														{{ item2.item ? item2.item.manufacturer : '' }}
													</div>
												</v-card-title>
												<v-card-text
													v-if="$vuetify.display.smAndDown"
												>
													{{ item2.item ? item2.item.manufacturer : '' }}
												</v-card-text>
												<!-- <v-card-text>
													<div class="float-right ml-4 mb-2 mt-2">
														<v-btn
															v-if="$vuetify.display.smAndDown"
															:variant="buttonsForms.variant.delete"
															:color="buttonsForms.color.delete"
															block
															@click="handleDelete(item2)"
															icon="mdi-delete"
														>
														</v-btn>
														<v-btn
															v-if="$vuetify.display.mdAndUp"
															:variant="buttonsForms.variant.delete"
															:color="buttonsForms.color.delete"
															block
															@click="handleDelete(item2)"
														>
															{{ $t('buttons.delete') }}
														</v-btn>
													</div>
													<div class="float-right mb-2 mt-2">
														<VtNumberField
															ref="detailItemQuantityRef"
															v-model="item2.quantity"
															vid="detailItemQuantity"
															:min="0"
															:max="1000"
															type="integer"
															:validation="validation"
															:label="$t('forms.content.inventory.quantity')"
														/>
													</div>
												</v-card-text> -->
											</v-card>
										</div>
									</v-expansion-panel-text>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchAltimetersRef"
		:signal="dialogPartsSearchAltimetersManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeAltimeter"
		@close="dialogPartsSearchAltimetersManager.cancel()"
		@select="selectAltimeter"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteProtectorsRef"
		:signal="dialogPartsSearchChuteProtectorsManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeChuteProtector"
		@close="dialogPartsSearchChuteProtectorsManager.cancel()"
		@select="selectChuteProtector"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteReleasesRef"
		:signal="dialogPartsSearchChuteReleasesManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogPartsSearchChuteReleasesManager.cancel()"
		@select="selectChuteRelease"
	/>
	<RocketPartsLookupDialog
		ref="dialoSearchgDeploymentBagsRef"
		:signal="dialogPartsSearchDeploymentBagsManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeDeploymentBag"
		@close="dialogPartsSearchDeploymentBagsManager.cancel()"
		@select="selectDeploymentBag"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchMotorsRef"
		:signal="dialogPartsSearchMotorsManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeMotor"
		@close="dialogPartsSearchMotorsManager.cancel()"
		@select="selectMotor"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchMotorCasesRef"
		:signal="dialogPartsSearchMotorCasesManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeMotorCase"
		@close="dialogPartsSearchMotorCasesManager.cancel()"
		@select="selectMotorCase"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchParachutesRef"
		:signal="dialogPartsSearchParachutesManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeParachute"
		@close="dialogPartsSearchParachutesManager.cancel()"
		@select="selectParachute"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchStreamersRef"
		:signal="dialogPartsSearchStreamersManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeStreamer"
		@close="dialogPartsSearchStreamersManager.cancel()"
		@select="selectStreamer"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchTrackersRef"
		:signal="dialogPartsSearchTrackersManager.signal"
		:multiple="true"
		:part-types="manufacturerTypeTracker"
		@close="dialogPartsSearchTrackersManager.cancel()"
		@select="selectTracker"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useInventoryBaseComponent } from '@/components/content/inventory/inventoryComponent';
import { useInventoryBaseComponentProps } from '@/components/content/inventory/inventoryComponentProps';
import { useInventoryFilterValidation } from '@/components/content/inventory/inventoryFilterValidation';

import AltimeterPanelTitle from '@/components/content/parts/altimeters/AltimeterPanelTitle';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import ChuteReleasePanelTitle from '@/components/content/parts/chuteReleases/ChuteReleasePanelTitle';
import ContentHeader from '@/components/content/Header';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import MotorPanelTitle from '@/components/content/parts/motors/MotorPanelTitle';
import MotorCasePanelTitle from '@/components/content/parts/motorCases/MotorCasePanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';
import TrackerPanelTitle from '@/components/content/parts/trackers/TrackerPanelTitle';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';
import VtNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberField';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

export default {
	name: 'InventoryUserControl',
	components: {
		AltimeterPanelTitle,
		ChuteProtectorPanelTitle,
		ChuteReleasePanelTitle,
		ContentHeader,
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		MotorPanelTitle,
		MotorCasePanelTitle,
		ParachutePanelTitle,
		RocketPartsLookupDialog,
		StreamerPanelTitle,
		TrackerPanelTitle,
		VtConfirmationDialog,
		VtFormListing,
		VtNumberField,
		VtSelectWithValidation
	},
	props: {
		...useInventoryBaseComponentProps
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
			serviceStore,
			sortByOrder,
			target,
			buttonsDialog,
			buttonsForms,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			debug,
			inventory,
			inventoryListingRef,
			// filterItemName,
			// filterItemOrganizations,
			// filterItemRocketTypes,
			panels,
			partTypes,
			title,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickMotorSearch,
			clickMotorCaseSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			handleDelete,
			isPartType,
			panelsUpdated,
			resetAdditional,
			search,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectMotor,
			selectMotorCase,
			selectMotorDelay,
			selectParachute,
			selectStreamer,
			selectTracker,
			weightDisplay,
			motorDelays,
			scope,
			validation
		} = useInventoryBaseComponent(props, context);

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
			buttonsDialog,
			buttonsForms,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			debug,
			inventory,
			inventoryListingRef,
			// filterItemName,
			// filterItemOrganizations,
			// filterItemRocketTypes,
			panels,
			partTypes,
			title,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickMotorSearch,
			clickMotorCaseSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			handleDelete,
			isPartType,
			panelsUpdated,
			resetAdditional,
			search,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectMotor,
			selectMotorCase,
			selectMotorDelay,
			selectParachute,
			selectStreamer,
			selectTracker,
			weightDisplay,
			motorDelays,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useInventoryFilterValidation), {
		});
	}
};
</script>

<style scoped>
</style>
