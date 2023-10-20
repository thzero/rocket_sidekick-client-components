export const useRocketStageComponentProps = {
	debug: {
		type: Boolean,
		value: false
	},
	detailItem: {
		type: Object,
		value: null
	},
	isEditable: {
		type: Boolean,
		value: false
	},
	manufacturers: {
		type: Array,
		value: []
	},
	preCompleteOkRocketPart: {
		type: Function,
		value: null
	},
	updateStage: {
		type: Function,
		value: null
	}
};
