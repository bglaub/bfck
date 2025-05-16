import { Position } from "../../utilities/input/Position";

export class SyntacticalError extends Error {
  public readonly symbol: string;
  public readonly position: Position;
  
  constructor(message: string, symbol: string, position: Position) {
    super(message);
    this.symbol = symbol;
    this.position = position;
  }
}