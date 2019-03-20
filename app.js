(function () {
	'use strict';

	function createTagsField() {

		let tagField = {
			element: {},
			tagsArr: [],
			getTags() {
				return this.tagsArr;
			},
			destroy() {
				this.input.removeEventListener('keypress', this);
				this.input.removeEventListener('input', this);
				this.container.addEventListener('click', this);
				this.element.remove();
			},
			updateField() {
				this.input.focus();
			},
			init() {
				let containerEl = document.createElement('div');
				containerEl.classList.add('container');

				let inputEl = document.createElement('input');
				inputEl.type = 'text';
				inputEl.size = 1;
				inputEl.maxLength = 30;
				inputEl.autofocus = true;
				containerEl.append(inputEl);
				inputEl.addEventListener('keypress', this);
				inputEl.addEventListener('input', this);
				containerEl.addEventListener('click', this);
				this.element = containerEl;
				this.input = inputEl;
				this.container = containerEl;
			},
			inputLength() {
				this.input.size = this.input.value.length ? `${this.input.value.length}` : 1;
			},
			tagsFromInput: keypressInput,
			focusIt() {
				this.input.focus();
			},
			handleEvent(e) {
				if (e.type === 'keypress') {
					this.tagsFromInput(e);
				} else if (e.type === 'click') {
					this.focusIt(e);
				} else if (e.type === 'input') {
					this.inputLength(e);
				}
			},
		};

		tagField.init();
		return tagField;
	}

	function keypressInput(e) {
		if (e.key === ',' || e.key === 'Enter') {
			e.preventDefault();
			let value = e.target.value;

			if (value && (this.tagsArr.indexOf(value) === -1)) {
				this.tagsArr.push(value);
				e.target.value = '';
				createTags(this);
			} else {
				e.target.value = '';
			}
		}
	}

	function createTags(self) {
		let tags = self.element.querySelectorAll('.tag');

		if (tags) {
			tags.forEach((item) => {
				item.remove();
			});
		}
		self.tagsArr.forEach((item, i, arr) => {
			let span = document.createElement('span');
			span.classList.add('tag');
			span.textContent = item;

			span.addEventListener('click', (e) => {
				e.stopPropagation();
				arr.splice(i, 1);
				createTags(self);
			}, {once: true});

			self.element.insertBefore(span, self.element.lastChild);
		});
		self.updateField();
	}

	let tagField = createTagsField();
	document.body.append(tagField.element);
	let tagFieldd = createTagsField();
	document.body.append(tagFieldd.element);
}());