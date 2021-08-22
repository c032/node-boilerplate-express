import assert from 'assert';

import { RequestState } from '../src/request';

describe('request', () => {
	describe('RequestState', () => {
		describe('isLoggedIn', () => {
			describe('when userId is null', () => {
				it('returns false', () => {
					const state = new RequestState();
					state.userId = null;

					const actual = state.isLoggedIn();
					const expected = false;

					assert.strictEqual(actual, expected);
				});
			});

			describe('when userId is empty string', () => {
				it('returns false', () => {
					const state = new RequestState();
					state.userId = '';

					const actual = state.isLoggedIn();
					const expected = false;

					assert.strictEqual(actual, expected);
				});
			});

			describe('when userId is non-empty string', () => {
				it('returns true', () => {
					const state = new RequestState();
					state.userId = '1';

					const actual = state.isLoggedIn();
					const expected = true;

					assert.strictEqual(actual, expected);
				});
			});
		});
	});
});
