/**
 * Responsible for generating unique ID's across the system.
 */
export class IDGenerator {
  private constructor() {
    // no-op: generator is basic and will contain one exposed function to
    // generate IDs
  }

  /**
   * Gets a new generated ID.
   *
   * @returns ID
   */
  public static get(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}