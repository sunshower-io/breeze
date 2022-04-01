package io.sunshower.breeze.lang;

import static org.junit.jupiter.api.Assertions.fail;

import java.util.BitSet;
import org.antlr.v4.runtime.Parser;
import org.antlr.v4.runtime.RecognitionException;
import org.antlr.v4.runtime.Recognizer;
import org.antlr.v4.runtime.atn.ATNConfigSet;
import org.antlr.v4.runtime.dfa.DFA;

public class FailureErrorListener implements
    org.antlr.v4.runtime.ANTLRErrorListener {

  @Override
  public void syntaxError(Recognizer<?, ?> recognizer, Object offendingSymbol, int line,
      int charPositionInLine, String msg, RecognitionException e) {
    fail("Parse error at (line: %d, character: %d): %s ".formatted(line, charPositionInLine, msg));

  }

  @Override
  public void reportAmbiguity(Parser recognizer, DFA dfa, int startIndex, int stopIndex,
      boolean exact, BitSet ambigAlts, ATNConfigSet configs) {

    fail("Ambiguity detected");
  }

  @Override
  public void reportAttemptingFullContext(Parser recognizer, DFA dfa, int startIndex, int stopIndex,
      BitSet conflictingAlts, ATNConfigSet configs) {

  }

  @Override
  public void reportContextSensitivity(Parser recognizer, DFA dfa, int startIndex, int stopIndex,
      int prediction, ATNConfigSet configs) {

  }
}
