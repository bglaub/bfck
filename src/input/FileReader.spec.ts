import { FileReader } from './FileReader';

/**
 * Mock file reader that allows the OS level file read to return mock data.
 * 
 * NOTE: Care needs to be taken so that mocking does not lead to false positive.
 */
class MockFileReader extends FileReader {
  public mockFileData: string = '';

  /**
   * Overridden to return mock file data.
   */
  protected override osRead(fileLocation: string): string {
    return this.mockFileData;
  }
}

describe('FileReader', () => {
  let fileReader: MockFileReader;

  beforeEach(() => {
    fileReader = new MockFileReader(['.b']);
    fileReader.mockFileData = '';
  });

  describe('readFile()', () => {
    it('should read file data', () => {
      fileReader.mockFileData = 'Testing File Data!';
      expect(fileReader.read('helloworld.b')).toEqual('Testing File Data!');
    });

    it('should error when extension is not allowed', () => {
      expect(() => {
        fileReader.read('C:\\dev\\helloworld.c');
      }).toThrow('The extension, .c, is not in the allowed list [.b].');
    });
  });
});