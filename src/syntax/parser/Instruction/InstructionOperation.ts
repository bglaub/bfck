/**
 * The operation that an instruction should carry out.
 */
export enum InstructionOperation {
  START,
  LOOP,
  INCREMENT_DATA_POINTER,
  DECREMENT_DATA_POINTER,
  INCREMENT_BYTE,
  DECREMENT_BYTE,
  OUTPUT_BYTE,
  INPUT_BYTE
};