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
	isEditable: {
		type: Boolean,
		default: false
	},
	isLoading: {
		type: Boolean,
		default: false
	},
	isInProgress: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default: { }
	},
	parent: {
		type: Object,
		default: null
	},
	root: {
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
	updateStatus: {
		type: Function,
		default: null
	}
	// modelValue: {
	// 	type: Array,
	// 	default: []
	// }
};
