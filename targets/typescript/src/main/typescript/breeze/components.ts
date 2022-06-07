import {parser} from "@breeze/parser/breeze-parser";
import {
  foldInside,
  foldNodeProp,
  HighlightStyle,
  indentNodeProp,
  LanguageSupport,
  LRLanguage,
  syntaxHighlighting
} from "@codemirror/language"
import {EditorView, lineNumbers} from "@codemirror/view";
import {styleTags, Tag, tags as t} from "@lezer/highlight"
import {EditorState} from "@codemirror/state";
import {basicSetup} from "@codemirror/basic-setup";
import {completeFromList} from '@codemirror/autocomplete'


type mapping = { [selector: string]: Tag | Tag[] }

const configureSet = (cfg: mapping, es: string[], t: Tag): mapping => {
  for (let e of es) {
    cfg[e] = t;
  }
  return cfg;
}


const cfg = configureSet({
  Boolean: t.bool,
  String: t.string,
  Number: t.number,
  "{ }": t.paren
}, [
  'provider',
  'module',
  'resource',
], t.keyword);

configureSet(cfg, ['var'], t.controlKeyword)


export const parserWithMetadata = parser.configure({
  props: [
    styleTags(cfg),
    indentNodeProp.add({
      Block: context => {
        // context.node.
        let count = 0;
        for (let node = context.node; !!node; node = node.parent) {
          count++;
        }
        return 2 * count;
      }
    }),
    foldNodeProp.add({
      // block: foldInside
      Block: foldInside,
      Function: foldInside
    })
  ]
});


const highlightStyle = HighlightStyle.define([
  {tag: t.keyword, color: 'orange'},
  {tag: t.controlKeyword, color: 'green'},
  {tag: t.string, color: "blue", fontStyle: 'italic'},
])


export const terraformLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: "//", block: {start: '/*', end: '*/'}}
  }
});
export const terraformCompletion = terraformLanguage.data.of({
  autocomplete: completeFromList([
    {label: "module", type: "keyword"},
    {label: "resource", type: "definition"},
    {label: "provider", type: "keyword"},
    {label: "variable", type: "keyword"},
    {label: "output", type: "keyword"},
    {label: "average", type: "function"},
    {label: "var", type: "keyword"},
    {label: "max", type: "function"},
    {label: "min", type: "function"}
  ])
});

export function terraformLanguageSupport(): LanguageSupport {
  return new LanguageSupport(terraformLanguage, [terraformCompletion]);
}

export function terraform(root: ShadowRoot): EditorView {
  const state = EditorState.create({
    extensions: [
      basicSetup,
      lineNumbers(),
      terraformLanguageSupport(),
      syntaxHighlighting(highlightStyle)
    ]
  });
  return new EditorView({
    state: state,
    parent: root,
  });
}






