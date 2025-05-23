import { Token } from "../../lexical/tokenizer/token/Token";
import { TokenType } from "../../lexical/tokenizer/token/TokenType";
import { Position } from "../../utilities/input/Position";
import { Instruction } from "./Instruction/Instruction";
import { InstructionOperation } from "./Instruction/InstructionOperation";
import { InstructionTreeNode } from "./Instruction/InstructionTreeNode";
import { ParseTreeNode } from "./ParsedInstruction/ParseTreeNode";
import { ParsedInstructionOperation } from "./ParsedInstruction/ParsedInstructionOperation";
import { SyntacticalError } from "./SyntacticalError";

/**
 * Parser is responsible for taking tokens and turning them into a parse tree.
 */
export class Parser {
  
  private static readonly TOKEN_TO_PARSE_INSTRUCTION: Map<TokenType, ParsedInstructionOperation> = new Map([
    [ TokenType.INCREMENT_DATA_POINTER, ParsedInstructionOperation.INCREMENT_DATA_POINTER ],
    [ TokenType.DECREMENT_DATA_POINTER, ParsedInstructionOperation.DECREMENT_DATA_POINTER ],
    [ TokenType.INCREMENT_BYTE, ParsedInstructionOperation.INCREMENT_BYTE ],
    [ TokenType.DECREMENT_BYTE, ParsedInstructionOperation.DECREMENT_BYTE ],
    [ TokenType.OUTPUT_BYTE, ParsedInstructionOperation.OUTPUT_BYTE ],
    [ TokenType.INPUT_BYTE, ParsedInstructionOperation.INPUT_BYTE ],
    [ TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, ParsedInstructionOperation.MOVE_FORWARD_INSTRUCTION_POINTER ],
    [ TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, ParsedInstructionOperation.MOVE_BACKWARD_INSTRUCTION_POINTER ]
  ]);

  private static readonly PARSE_TO_PROGRAM_INSTRUCTION: Map<ParsedInstructionOperation, InstructionOperation> = new Map([
    [ ParsedInstructionOperation.INCREMENT_DATA_POINTER, InstructionOperation.INCREMENT_DATA_POINTER ],
    [ ParsedInstructionOperation.DECREMENT_DATA_POINTER, InstructionOperation.DECREMENT_DATA_POINTER],
    [ ParsedInstructionOperation.INCREMENT_BYTE, InstructionOperation.INCREMENT_BYTE ],
    [ ParsedInstructionOperation.DECREMENT_BYTE, InstructionOperation.DECREMENT_BYTE ],
    [ ParsedInstructionOperation.OUTPUT_BYTE, InstructionOperation.OUTPUT_BYTE ],
    [ ParsedInstructionOperation.INPUT_BYTE, InstructionOperation.INPUT_BYTE ]
  ]);

  public parse(tokens: Token[]): InstructionTreeNode {
    const root: ParseTreeNode = this.getStartNode();
    this.buildParseTree(root, tokens.toReversed());
    return this.buildInstructionTree(root);
  }

  private buildParseTree(currentNode: ParseTreeNode, remainingTokens: Token[]) {
    if(!remainingTokens.length) {
      return;
    }

    let nextNode: ParseTreeNode = currentNode;
    const currentToken: Token = remainingTokens.pop() as Token;

    if(currentToken.type === TokenType.MOVE_FORWARD_INSTRUCTION_POINTER) {
      const operation: ParseTreeNode = this.getLoopNode();
      operation.addChild(this.getTokenNode(currentToken));
      currentNode.addChild(operation);
      nextNode = operation;
    } else if(currentToken.type === TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER) {
      const operator: ParseTreeNode = this.getTokenNode(currentToken);
      currentNode.addChild(operator);
      if (operator?.getParent()?.data.operation !== ParsedInstructionOperation.LOOP) {
        throw new SyntacticalError('A "]" was found without a starting "[".', currentToken.symbol, currentToken.position);
      }
      nextNode = operator?.getParent()?.getParent() as ParseTreeNode;
    } else {
      currentNode.addChild(this.getTokenNode(currentToken));
    }

    this.buildParseTree(nextNode, remainingTokens);
  }

  private buildInstructionTree(root: ParseTreeNode): InstructionTreeNode {
    
    let ast: InstructionTreeNode = new InstructionTreeNode(new Instruction(InstructionOperation.START, {symbol: '', position: {line: 0, column: 0}}));

    root.traverse((currentNode: ParseTreeNode) => {
      if(currentNode.data.operation === ParsedInstructionOperation.START) {
        // do nothing
      } else if(currentNode.data.operation === ParsedInstructionOperation.LOOP) {
        const firstChild: ParseTreeNode | undefined = currentNode.getFirstChild();
        const lastChild: ParseTreeNode | undefined = currentNode.getLastChild();
        if(lastChild?.data.operation !== ParsedInstructionOperation.MOVE_BACKWARD_INSTRUCTION_POINTER) {
          throw new SyntacticalError('A "[" was found without an ending "]".', lastChild?.data?.token?.symbol as string, lastChild?.data?.token?.position as Position)
        }
        const loopNode = new InstructionTreeNode(new Instruction(InstructionOperation.LOOP, [
          {
            symbol: firstChild?.data?.token?.symbol as string,
            position: firstChild?.data?.token?.position as Position
          },
          {
            symbol: lastChild?.data?.token?.symbol as string,
            position: lastChild?.data?.token?.position as Position
          },
        ]));
        ast.addChild(loopNode);
        ast = loopNode;
      } else if(currentNode.data.operation === ParsedInstructionOperation.MOVE_FORWARD_INSTRUCTION_POINTER) {
        currentNode.detach();
      } else if(currentNode.data.operation === ParsedInstructionOperation.MOVE_BACKWARD_INSTRUCTION_POINTER) {
        currentNode.detach();
        ast = ast.getParent()?.getParent() as InstructionTreeNode;
      } else {
        ast.addChild(
          new InstructionTreeNode(
            new Instruction(
              Parser.PARSE_TO_PROGRAM_INSTRUCTION.get(
                currentNode.data.operation
              ) as InstructionOperation, 
              {
                symbol: currentNode.data.token?.symbol as string,
                position: currentNode.data.token?.position as Position
              }
            )
          )
        );
      }
    });

    return ast;
  }

  private getStartNode(): ParseTreeNode {
    return new ParseTreeNode(ParsedInstructionOperation.START);
  }
  
  private getLoopNode(): ParseTreeNode {
    return new ParseTreeNode(ParsedInstructionOperation.LOOP);
  }

  private getTokenNode(token: Token): ParseTreeNode {
    return new ParseTreeNode(
      Parser.TOKEN_TO_PARSE_INSTRUCTION.get(token.type) as ParsedInstructionOperation,
      token
    );
  }
}