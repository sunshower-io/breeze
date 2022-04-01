package io.sunshower.breeze.lang;

import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DefaultBreezeParserTest {

  DefaultBreezeParser parser;

  @BeforeEach
  void setUp() {}

  @Test
  void ensureIdentifierRuleWorks() {
    parser = (DefaultBreezeParser) Parser.parse("""
        "hello-world"
        """);

    val ctx = parser.parser.enclosedIdentifier();
  }
}
