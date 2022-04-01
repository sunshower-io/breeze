package io.sunshower.breeze.lang;

import io.sunshower.breeze.lang.parsers.BreezeLexer;
import io.sunshower.breeze.lang.parsers.BreezeParser;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

public class DefaultBreezeParser {

  private final BreezeParser parser;

  public DefaultBreezeParser(Charset charset, InputStream inputStream) throws IOException {
    parser =
        new BreezeParser(
            new CommonTokenStream(new BreezeLexer(CharStreams.fromStream(inputStream, charset))));
  }
}
