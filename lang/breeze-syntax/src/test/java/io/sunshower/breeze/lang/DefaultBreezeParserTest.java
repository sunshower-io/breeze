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

  @Test
  void ensureParsingCompleteExtensionPointWorks() {
    val def = """
        module vms 
    requires {Disk} from storage 
    requires {
        Network, 
        SecurityGroup,
        VirtualPrivateCloud as VPC 
    } from networks
    where
    
            declare "test-virtual-machine-ssh-key"
                of type SSHPublicKey
                having required configuration
                    material references sup 
                      having required configuration
                        name as "value";
    /**
        an ExtensionPoint is a collection of properties and constraints
        that will be satisfied by a combination of a Fulfillment (provided by a plugin such as Azure)
        and user-supplied properties
    */
    export declare extension point VirtualMachine 
        /**
          Required constraints that are unsatisfied will
          be reported by the compiler to the user 
         */
        having required constraints
            /**
              we generally need a network.  A cloud provider can supply this with a
              default
             */
            child of type Network
            /**
              we need a boot disk.  A cloud provider can supply a default
             */
            child of type Disk
            /**
              
             */
            parent of type VPC
            /**
              we need a firewall/security group
             */
            sibling of type SecurityGroup
        /**
          
         */
        having optional constraints
            disks of type Disk[]
            subnetworks of type Network[]
        
   /**
     
    */
        having required properties 
            name of type String or StringReference
            image of type String or StringReference
            userName of type String or StringReference;
        """;
    val result = Parser.parse(def);
    result.printTree(System.out);

  }
}
