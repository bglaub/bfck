import { Executor } from "./executor/executor";
import { FileReader } from "./input/FileReader";
import { LexicalAnalyzer } from "./lexical/analyzer/LexicalAnalyzer";
import { Token } from "./lexical/tokenizer/token/Token";
import { InstructionTreeNode } from "./syntax/parser/Instruction/InstructionTreeNode";
import { Parser } from "./syntax/parser/Parser";

(() => {
  const fileReader: FileReader = new FileReader('.b');

  const input: string = fileReader.read(process.argv[2]);

  const analyzer: LexicalAnalyzer = new LexicalAnalyzer();

  const tokens: Token[] = analyzer.analyze(input);

  const ast: InstructionTreeNode = (new Parser()).parse(tokens);

  (new Executor()).execute(ast);
})();