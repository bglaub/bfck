import { InstructionOperation } from "../syntax/parser/Instruction/InstructionOperation";
import { InstructionTreeNode } from "../syntax/parser/Instruction/InstructionTreeNode";

export class Executor {

  private printBuffer: string = '';
  private memory: number[] = [0];
  private pointer: number = 0;

  execute(instructionTree: InstructionTreeNode): void {

    this.printBuffer = '';
    this.memory = [0];
    this.pointer = 0;

    let node = instructionTree.getFirstChild();

    while(node) {
      this.executeNode(node);
      node = node.getRightSibling();
    }
    
    if (this.printBuffer.length > 0) {
      console.log(this.printBuffer);
    }
  }

  executeNode(node: InstructionTreeNode): void {
    switch(node.data.operation) {
      case InstructionOperation.INCREMENT_DATA_POINTER:
        this.incrementDataPointer();
        break;
      case InstructionOperation.DECREMENT_DATA_POINTER:
        this.decrementDataPointer();
        break;
      case InstructionOperation.INCREMENT_BYTE:
        this.incrementDataByte();
        break;
      case InstructionOperation.DECREMENT_BYTE:
        this.decrementDataByte();
        break;
      case InstructionOperation.OUTPUT_BYTE:
        this.outputDataByte();
        break;
      case InstructionOperation.LOOP:
        this.executeLoop(node);
        break;
      default:
        throw new Error(`Unknown operation: ${node.data.operation}`);
    }
  }

  private executeLoop(loopNode: InstructionTreeNode): void {
    if(this.memory[this.pointer] === 0) {
      return;
    }
    let node;
    while(true) {
      node = loopNode.getFirstChild();
      while(node) {
        this.executeNode(node);
        node = node.getRightSibling();
      }
      if(this.memory[this.pointer] === 0) {
        return;
      }
    }
  }

  private incrementDataPointer() {
    this.pointer++;

    if(this.pointer >= this.memory.length) {
      this.memory.push(0);
    }
  }

  private decrementDataPointer() {
    this.pointer--;

    if(this.pointer < 0) {
      throw new Error('Data pointer moved to negative position.');
    }
  }

  private incrementDataByte() {
    this.memory[this.pointer] = (this.memory[this.pointer] + 1) % 256;
  }

  private decrementDataByte() {
    this.memory[this.pointer] = (this.memory[this.pointer] - 1) % 256;
  }

  private outputDataByte() {
    this.printBuffer += String.fromCharCode(this.memory[this.pointer]);
  }
}