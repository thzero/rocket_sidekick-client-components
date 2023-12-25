export const useChecklistStepsPanelComponentProps = {
	debug: {
		type: Boolean,
		default: false
	},
	depth: {
		type: Number,
		default: null
	},
	index: {
		type: Number,
		default: null
	},
	item: {
		type: Object,
		default: { }
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
	total: {
		type: Number,
		default: null
	},
	// modelValue: {
	// 	type: Array,
	// 	default: []
	// }
};
