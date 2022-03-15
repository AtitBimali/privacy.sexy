import 'mocha';
import { expect } from 'chai';
import type { DocumentableData } from '@/application/collections/';
import { parseDocs } from '@/application/Parser/DocumentationParser';
import { itEachAbsentObjectValue } from '@tests/unit/shared/TestCases/AbsentTests';

describe('DocumentationParser', () => {
  describe('parseDocs', () => {
    describe('throws when absent', () => {
      itEachAbsentObjectValue((absentValue) => {
        // arrange
        const expectedError = 'missing documentable';
        // act
        const act = () => parseDocs(absentValue);
        // assert
        expect(act).to.throw(expectedError);
      });
    });
    it('returns empty when empty', () => {
      // arrange
      const empty: DocumentableData = { };
      // act
      const actual = parseDocs(empty);
      // assert
      expect(actual).to.have.lengthOf(0);
    });
    it('returns single item when string', () => {
      // arrange
      const url = 'https://privacy.sexy';
      const expected = [url];
      const sut: DocumentableData = { docs: url };
      // act
      const actual = parseDocs(sut);
      // assert
      expect(actual).to.deep.equal(expected);
    });
    it('returns all when array', () => {
      // arrange
      const expected = ['https://privacy.sexy', 'https://github.com/undergroundwires/privacy.sexy'];
      const sut: DocumentableData = { docs: expected };
      // act
      const actual = parseDocs(sut);
      // assert
      expect(actual).to.deep.equal(expected);
    });
  });
});
