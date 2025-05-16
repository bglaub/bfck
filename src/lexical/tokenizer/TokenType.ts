/**
 * The type that tokens can be.
 */
export enum TokenType {
   // NOTE: start off at 1 so that any truthy checks on enum values will pass
  INCREMENT_DATA_POINTER = 1,
  DECREMENT_DATA_POINTER = 2,
  INCREMENT_BYTE = 3,
  DECREMENT_BYTE = 4,
  OUTPUT_BYTE = 5,
  INPUT_BYTE = 6,
  MOVE_FORWARD_INSTRUCTION_POINTER = 7,
  MOVE_BACKWARD_INSTRUCTION_POINTER = 8
}