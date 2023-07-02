<template>
	<ContentHeader :value="title" />
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="!hasDetailItem || hasList"
				class="mb-4"
			>
				<v-card-text>
					filters go here
					{{ dialogDeleteMessage }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						v-if="!hasDetailItem"
						color="blue"
						variant="flat"
						@click="handleAdd(item)"
					>
						{{ $t('buttons.add') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col cols="12">
			<v-row dense>
				<v-col cols="6"
					v-for="item in rockets"
					:key="item.name"
				>
					<div
						v-for="item in rockets"
						:key="item.id"
					>
						<RocketPanel
							:item="item"
						/>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import AppCommonConstants from 'rocket_sidekick_common/constants';

import RocketPanel from '@/components/content/rockets/RocketPanel';
import ContentHeader from '@/components/content/Header';

import { useRocketsBaseComponent } from '@/components/content/rockets/rocketsBase';
import { useRocketsBaseProps } from '@/components/content/rockets/rocketsBaseProps';

export default {
	name: 'RocketsGallery',
	components: {
		ContentHeader,
		RocketPanel
	},
	props: {
		...useRocketsBaseProps
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
			sort,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			type,
			rocketUrl,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetForm
		} = useRocketsBaseComponent(props, context, {
			type: AppCommonConstants.Rocketry.DisplayTypes.User
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
			sort,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			type,
			rocketUrl,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetForm
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
