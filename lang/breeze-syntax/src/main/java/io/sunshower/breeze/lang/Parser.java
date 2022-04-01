package io.sunshower.breeze.lang;

import java.io.PrintStream;

public interface Parser {

  static Parser parse(String s) {
    return new DefaultBreezeParser(s);
  }

  void printTree(PrintStream out);
}
