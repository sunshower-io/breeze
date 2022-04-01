package io.sunshower.breeze.lang;

import io.sunshower.breeze.lang.parsers.BreezeLexer;
import io.sunshower.breeze.lang.parsers.BreezeParser;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.util.BitSet;
import lombok.val;
import org.antlr.v4.runtime.ANTLRErrorListener;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.RecognitionException;
import org.antlr.v4.runtime.Recognizer;
import org.antlr.v4.runtime.atn.ATNConfigSet;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.tree.Tree;
import org.antlr.v4.runtime.tree.Trees;

final class DefaultBreezeParser implements Parser, ANTLRErrorListener {

  final BreezeParser parser;

  DefaultBreezeParser(String value) {
    parser =
        new BreezeParser(new CommonTokenStream(new BreezeLexer(CharStreams.fromString(value))));
    parser.setBuildParseTree(true);
  }

  DefaultBreezeParser(Charset charset, InputStream inputStream) throws IOException {
    parser =
        new BreezeParser(
            new CommonTokenStream(new BreezeLexer(CharStreams.fromStream(inputStream, charset))));
    parser.setBuildParseTree(true);
  }

  @Override
  public void printTree(PrintStream out) {
    val printWriter = new PrintWriter(out);
    printTree(printWriter, parser.compilationUnit(), 0);
    printWriter.flush();
  }

  private void printTree(PrintWriter out, Tree tree, int indent) {
    val prefix = " ".repeat(indent);
    out.write(prefix);
    out.write(Trees.getNodeText(tree, parser));

    if (tree.getChildCount() != 0) {
      out.append("\n");
      for (int i = 0; i < tree.getChildCount(); i++) {
        printTree(out, tree.getChild(i), indent + 1);
      }
    }

  }

  /**
   * todo: do better than throwing an exception
   *
   * @param recognizer
   * @param offendingSymbol
   * @param line
   * @param charPositionInLine
   * @param msg
   * @param e
   */
  @Override
  public void syntaxError(Recognizer<?, ?> recognizer, Object offendingSymbol, int line,
      int charPositionInLine, String msg, RecognitionException e) {
    throw new RuntimeException("Parse error at (line: %d, character: %d): %s ".formatted(line, charPositionInLine, msg));
  }

  @Override
  public void reportAmbiguity(org.antlr.v4.runtime.Parser recognizer, DFA dfa, int startIndex,
      int stopIndex, boolean exact, BitSet ambigAlts, ATNConfigSet configs) {

  }

  @Override
  public void reportAttemptingFullContext(org.antlr.v4.runtime.Parser recognizer, DFA dfa,
      int startIndex, int stopIndex, BitSet conflictingAlts, ATNConfigSet configs) {

  }

  @Override
  public void reportContextSensitivity(org.antlr.v4.runtime.Parser recognizer, DFA dfa,
      int startIndex, int stopIndex, int prediction, ATNConfigSet configs) {

  }
}
