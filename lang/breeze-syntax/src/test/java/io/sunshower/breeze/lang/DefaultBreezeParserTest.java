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
    val moduleDefinition =
        """
        module secrets where
            export declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material as "sup";
        """;

    parser = (DefaultBreezeParser) Parser.parse(moduleDefinition);

    parser.printTree(System.out);
  }

  @Test
  void ensureParsingModuleWithReferenceWorks() {
    val moduleDefinition =
        """
        module secrets where
            export declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material references sup;
        """;

    parser = (DefaultBreezeParser) Parser.parse(moduleDefinition);

    parser.printTree(System.out);
  }

  @Test
  void ensureParsingModuleWithMultipleDefinitionsWorks() {
    val moduleDefinition =
        """
        module secrets.dont.make.friends
          requires {cool as bean} from whatever
          requires {bean as superbean} from coolbean
        where
            export declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material references sup 
                      having required configuration
                        name as "value";
            export declare whatever of type unit
              having optional configuration sup
                material as "coolbeans";            
        """;

    parser = (DefaultBreezeParser) Parser.parse(moduleDefinition);

    parser.printTree(System.out);
  }

  @Test
  void ensureParsingModuleWithReferenceWorksWithSubConfiguration() {
    val moduleDefinition =
        """
        module secrets where
            export declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material references sup 
                      having required configuration
                        name as "value";
        """;

    parser = (DefaultBreezeParser) Parser.parse(moduleDefinition);

    parser.printTree(System.out);
  }
}
