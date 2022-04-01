package io.sunshower.breeze.lang;

public interface Parser {

  static Parser parse(String s) {
    return new DefaultBreezeParser(s);
  }
}
