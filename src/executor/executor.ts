import { resolveObjectURL } from "buffer";
import { InstructionOperation } from "../syntax/parser/Instruction/InstructionOperation";
import { InstructionTreeNode } from "../syntax/parser/Instruction/InstructionTreeNode";

export class Executor {

  private memory: number[] = [0];
  private pointer: number = 0;

  execute(instructionTree: InstructionTreeNode): void {
    this.memory = [0];
    this.pointer = 0;
    let node = instructionTree.getFirstChild();

    while(node) {
      this.executeNode(node);
      node = node.getRightSibling();
    }
  }

  executeNode(node: InstructionTreeNode): void {
    console.log('---------------------------------------------------------------------')
    console.log('Executing operation:', InstructionOperation[node.data.operation]);
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
    console.log('---------------------------------------------------------------------')
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
      if(this.memory[this.pointer] !== 0) {
        return;
      }
    }
  }

  private incrementDataPointer() {
    console.log('Incrementing data pointer from', this.pointer, 'to', this.pointer + 1);
    this.pointer++;

    if(this.pointer >= this.memory.length) {
      this.memory.push(0);
    }
    console.log('Memory size is now', this.memory.length);
  }

  private decrementDataPointer() {
    console.log('Decrementing data pointer from', this.pointer, 'to', this.pointer - 1);
    this.pointer--;

    if(this.pointer < 0) {
      throw new Error('Data pointer moved to negative position.');
    }
  }

  private incrementDataByte() {
    this.memory[this.pointer] = (this.memory[this.pointer] + 1) % 256;
    console.log('Incrementing data byte at pointer', this.pointer, 'to', this.memory[this.pointer]);
  }

  private decrementDataByte() {
    this.memory[this.pointer] = (this.memory[this.pointer] - 1) % 256;
    console.log('Decrementing data byte at pointer', this.pointer, 'to', this.memory[this.pointer]);
  }

  private outputDataByte() {
    console.log(String.fromCharCode(this.memory[this.pointer]));
  }


}