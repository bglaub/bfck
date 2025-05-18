import { TreeNode } from "../../../structures/tree/TreeNode";
import { Instruction } from "./Instruction";

/**
 * Tree node in an instruction tree.
 */
export class InstructionTreeNode extends TreeNode<Instruction> {
  constructor(instruction: Instruction) {
    super(instruction);
  }
}