import { FileReader } from "./input/FileReader";
import { LexicalAnalyzer } from "./lexical/analyzer/LexicalAnalyzer";
import { Token } from "./lexical/tokenizer/Token";

(() => {
  const fileReader: FileReader = new FileReader('.b');

  const input: string = fileReader.read(process.argv[2]);

  const analyzer: LexicalAnalyzer = new LexicalAnalyzer();

  const tokens: Token[] = analyzer.analyze(input);

  tokens.forEach((token: Token) => {
    console.log('---------------------------------------------');
    console.log(token.toString());
    console.log('---------------------------------------------');
    console.log('');
  });
})();