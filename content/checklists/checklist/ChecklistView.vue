<template>
	<div
		class="mt-4"
	>
		<v-row dense>
			<v-col cols="12">
				<VtMarkdown 
					v-if="displayItem.description"
					v-model="displayItem.description" :use-github=false 
				/>
			</v-col>
			<!-- <v-col cols="10">
				<div 
					v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
					class="d-flex"
				>
					<VtTextField 
						v-model="displayItemRocketMame"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<div
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
							class="text-contrast router-link headline"
						>
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
						</router-link>
					</div>
				</div>
			</v-col>
			<v-col cols="2">
				<VtTextField 
					v-if="displayItemDate"
					v-model="displayItemDate"
					:label="$t('forms.date')"
					:readonly="true"
				/>
			</v-col> -->
		</v-row>
		<v-row
			v-if="displayItemRocketCoverUrl"
			dense
		>
			<!-- <v-col
				v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
				cols="12"
			>
				<div 
					class="d-flex"
				>
					<VtTextField 
						v-model="displayItemRocketMame"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<div
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
							class="text-contrast router-link headline"
						>
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
						</router-link>
					</div>
				</div>
			</v-col> -->
			<v-col
				cols="7" lg="10" md="9"
				class="mt-2"
			>
				<v-row
					v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
					dense
				>
					<v-col>
						{{ displayItem.rocketSetup.rocket }}
						<div 
							class="d-flex"
						>
							<VtTextField 
								v-model="displayItemRocketMame"
								:label="$t('forms.content.rockets.name')"
								:readonly="true"
							/>
							<div
								style="display: flex; justify-content: center; align-items: center;"
							>
								<router-link
									:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
									class="text-contrast router-link headline"
								>
									<!-- <h2>{{ $t('buttons.link') }}</h2> -->
									<v-icon color="green darken-2">
										mdi-link
									</v-icon>
								</router-link>
							</div>
						</div>
					</v-col>
				</v-row>
				<v-row 
					v-if="hasRocketSpecs && $vuetify.display.smAndUp"
					dense
				>
					<v-col 
						cols="12"
					>
						<v-sheet
							class="pb-2"
						>
							<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
							<v-divider></v-divider>
						</v-sheet>
					</v-col>
					<v-col diameterMajor
						v-if="displayItemRocketDiameter"
						cols="4" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketDiameter"
							:label="$t('strings.rockets.diameterMajor')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketLength"
						cols="6" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketLength"
							:label="$t('strings.rockets.length')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketWeight"
						cols="6" sm="3" md="2"
					>
						<VtTextField
							v-model="displayItemRocketWeight"
							:label="$t('strings.rockets.weight')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketCg"
						cols="6" sm="4" md="2"
					>
						<VtTextField
							v-model="displayItemRocketCg"
							:label="$t('strings.rockets.cg')"
							:readonly="true"
						/>
					</v-col>
					<v-col 
						v-if="displayItemRocketCp"
						cols="6" sm="4" md="2"
					>
						<VtTextField
							v-model="displayItemRocketCp"
							:label="$t('strings.rockets.cp')"
							:readonly="true"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
				cols="5" lg="2" md="3"
			>
				<router-link
					:to="'/user/locations/' + (displayItem ? displayItem.rocketId: '')"
					class="text-contrast router-link headline"
					style="float: right;display: block;margin-left: auto; margin-right: auto;"
				>
					<img
						style="width: 150px;"
						:src="displayItemRocketCoverUrl"
					/>
				</router-link>
			</v-col>
		</v-row>
		<v-row 
			v-if="(!displayItemRocketCoverUrl || $vuetify.display.xs)"
			dense
		>
			<v-col>
				<div 
					v-if="displayItem && displayItem.rocketSetup && displayItem.rocketSetup.rocket"
					class="d-flex"
				>
					<VtTextField 
						v-model="displayItemRocketMame"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<div
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rockets/' + (displayItem ? displayItem.rocketId: '')"
							class="text-contrast router-link headline"
						>
							<!-- <h2>{{ $t('buttons.link') }}</h2> -->
							<v-icon color="green darken-2">
								mdi-link
							</v-icon>
						</router-link>
					</div>
				</div>
			</v-col>
		</v-row>
		<v-row 
			v-if="(!displayItemRocketCoverUrl || $vuetify.display.xs) && hasRocketSpecs"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pb-2"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
			<v-col diameterMajor
				v-if="displayItemRocketDiameter"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketDiameter"
					:label="$t('strings.rockets.diameterMajor')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketLength"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketLength"
					:label="$t('strings.rockets.length')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketWeight"
				cols="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketWeight"
					:label="$t('strings.rockets.weight')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketCg"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketCg"
					:label="$t('strings.rockets.cg')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItemRocketCp"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="displayItemRocketCp"
					:label="$t('strings.rockets.cp')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row
					v-if="String.isNullOrEmpty(displayItemRocketMotorNames)"
					dense
				>
					<v-col>
						<VtTextArea
							v-model="displayItemRocketMotorNames"
							:label="$t('forms.content.launches.rocketSetup.title')"
							:readonly="true"
							:clearable="false"
							:rows="1"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col 
				cols="12"
			>
				<v-sheet
					v-if="displayItemRocketMotors.length > 0"
				>
					<h3>{{ $t('strings.content.rockets.motors') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
				<v-row 
					v-for="item in displayItemRocketMotors"
					:key="item"
					dense
				>
					<v-col 
						cols="12"
					>
						<v-sheet
							v-if="displayItemRocketMotors.length > 1"
							color="secondary"
							class="ml-4 mt-2 pl-4 pr-4 pt-2 pb-2"
							rounded
						>
							{{ $t('forms.content.rockets.stage.name') }}
							{{ item.index }}
						</v-sheet>
						<v-sheet 
							v-for="(item2, index) in item.motors"
							:key="item2"
							:color="index % 2 === 0 ? 'grey' : 'grey-darken-1'"
							:class="`ml-${(displayItemRocketMotors.length > 1 ? '8' : '4')} mt-2 pl-4 pr-4 pt-2 pb-2`"
							style="width: 100%;"
							rounded
						>
							<!-- <v-row
								dense
								class="pl-8"
							>
								<v-col>
									{{ item2.name }}
								</v-col>
								<v-col>
									{{ item2.caseName }}
								</v-col>
							</v-row> -->
							{{ item2.diameter }} {{ $t('strings.content.rockets.with') }} <a style="color: white" :href="motorUrl(item2)" target="_blank">{{ item2.name }}</a> {{ $t('strings.content.rockets.in') }} {{ item2.caseName }}
						</v-sheet>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useChecklistViewComponent } from '@/components/content/checklists/checklist/checklistViewComponent';
import { useChecklistViewComponentProps } from '@/components/content/checklists/checklist/checklistViewComponentProps';

import ContentHeader from '@/components/content/Header';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'ChecklistView',
	components: {
		ContentHeader,
		VtMarkdown,
		VtSelect,
		VtTextArea,
		VtTextField
	},
	props: {
		...useChecklistViewComponentProps
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
			buttonsForms,
			measurementUnitsIdOutput,
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			motorUrl,
			displayItem,
			displayItemDate,
			displayItemRocketCg,
			displayItemRocketCoverUrl,
			displayItemRocketCp,
			displayItemRocketDiameter,
			displayItemRocketLength,
			displayItemRocketMotorNames,
			displayItemRocketMotors,
			displayItemRocketMame,
			displayItemRocketWeight,
			hasRocketSpecs,
			name,
			// clickViewLocation
		} = useChecklistViewComponent(props, context);

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
			buttonsForms,
			measurementUnitsIdOutput,
			displayItemMeasurement,
			displayItemMeasurementLength,
			measurementUnitsFromUnitId,
			motorUrl,
			displayItem,
			displayItemDate,
			displayItemRocketCg,
			displayItemRocketCoverUrl,
			displayItemRocketCp,
			displayItemRocketDiameter,
			displayItemRocketLength,
			displayItemRocketMotorNames,
			displayItemRocketMotors,
			displayItemRocketMame,
			displayItemRocketWeight,
			hasRocketSpecs,
			name,
			// clickViewLocation
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
tr .specifications {
	padding-right: 12px;
}
</style>
