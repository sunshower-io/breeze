package io.sunshower.breeze.lang;

import static org.junit.jupiter.api.Assertions.assertEquals;

import lombok.val;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class DefaultBreezeParserTest {

  DefaultBreezeParser parser;

  @BeforeEach
  void setUp() {}

  @ParameterizedTest
  @ValueSource(strings = {"hello-world", "hello_world", "helloWorld", "hello-world_howAre_you"})
  void ensureUnenclosedIdentifierRulesWork(String value) {
    parser = (DefaultBreezeParser) Parser.parse(value);

    val text = parser.parser.unenclosedIdentifier().getText();
    assertEquals(value, text);
  }

  @ParameterizedTest
  @ValueSource(strings = {"\"hello-world\"", "\"waddup?this-is-_some*:coolbeans\""})
  void ensureEnclosedIdentifierRulesWork(String value) {
    parser = (DefaultBreezeParser) Parser.parse(value);
    val text = parser.parser.enclosedIdentifier().getText();
    assertEquals(value, text);
  }

  @Test
  void ensureParsingCompleteSimpleDeclarationWorks() {
    val moduleDefinition = """
        module secrets where
            export declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material required as "sup";
        """;

    parser = (DefaultBreezeParser) Parser.parse(moduleDefinition);

    parser.printTree(System.out);


  }

}
