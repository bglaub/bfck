import fs from 'node:fs';
import path from 'node:path';

/**
 * Responsible for reading files.
 */
export class FileReader {

  /**
   * The allowed extensions by this file reader.
   */
  private readonly allowedExtensions: string[];

  constructor(allowedExtensions: string | string[]) {
    this.allowedExtensions = Array.isArray(allowedExtensions) ? allowedExtensions : [ allowedExtensions ];
  }

  /**
   * Reads a file into a string from a specified file location.
   * 
   * @param fileLocation location of file
   * @returns file as string
   */
  public read(fileLocation: string): string {
    const extension: string = path.extname(fileLocation);

    if (!this.allowedExtensions.includes(extension)) {
      throw new Error(`The extension, ${extension}, is not in the allowed list [${this.allowedExtensions}].`);
    }

    return this.osRead(fileLocation);
  }

  /**
   * Does the actual file reading.
   * 
   * @param fileLocation location of file
   * @returns file as string
   */
  protected osRead(fileLocation: string): string {
    return fs.readFileSync(fileLocation).toString();
  }
}