import { InstructionMetadata } from "./InstructionMetadata";
import { InstructionOperation } from "./InstructionOperation";

/**
 * An instruction represents an operation to execute within a program.
 */
export class Instruction {

  /**
   * The operation that the program should carry out.
   */
  public readonly operation: InstructionOperation;

  /**
   * The underlying metadata that represents the operation from the actual input.
   */
  public readonly metadata: InstructionMetadata | [InstructionMetadata, InstructionMetadata];

  constructor(
    operation: InstructionOperation,
    metadata: InstructionMetadata | [InstructionMetadata, InstructionMetadata]
  ) {
    this.operation = operation;
    this.metadata = metadata;
  }
}