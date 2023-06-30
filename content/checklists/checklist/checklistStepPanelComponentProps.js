export const useChecklistStepsPanelComponentProps = {
	item: {
		type: Object,
		default: { }
	},
	moveDown: {
		type: Boolean,
		default: true
	},
	moveUp: {
		type: Boolean,
		default: true
	},
	parent: {
		type: Object,
		default: null
	},
	readonly: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: null
	},
	// modelValue: {
	// 	type: Array,
	// 	default: []
	// }
};
