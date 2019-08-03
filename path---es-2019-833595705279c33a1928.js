webpackJsonp([0x781789dbb969],{517:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/es2019/index.md absPath of file >>> MarkdownRemark",html:'<p>ES2019 gives us several new features. Here I’ll provide an overview of the major ones — along with any gotchas to be aware of — and provide links to some additional minor updates. </p>\n<p>Each of these features are available to use in v8 v7.3 &#x26; Chrome 73. Be sure to check for the support of these features when using them elsewhere.</p>\n<h2>Array.prototype.flat()</h2>\n<p>By default it will flatten one level</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n<span class="token comment">// [1, 2, 3, 4]</span>\n\n<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//  [1, 2, 3, [4, 5]]</span></code></pre>\n      </div>\n<p>You can adjust the number of levels to flatten</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4, 5]</span></code></pre>\n      </div>\n<h3>Gotchas</h3>\n<p>A missing item will result in <code class="language-text">undefined</code>, if it is nested</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4, [undefined, 6]]</span></code></pre>\n      </div>\n<p>A missing item will be removed, if it is not nested</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4, 6]</span></code></pre>\n      </div>\n<h2>Array.prototype.flatMap()</h2>\n<p>The value returned by the callback will be flattened one level, if it’s an array</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4]</span>\n\n<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [[1], [2], [3], [4], [5]]</span></code></pre>\n      </div>\n<p>Otherwise it returns the value as is</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=></span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4]</span>\n\n<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=></span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// [1, 2, 3, 4]</span></code></pre>\n      </div>\n<p>It is extremely useful if you need to filter and map values</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">?</span> a <span class="token operator">+</span> <span class="token string">" is odd"</span> <span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// ["1 is odd", "3 is odd", "5 is odd”]</span></code></pre>\n      </div>\n<h3>Gotchas</h3>\n<p>If the a second argument is provided it becomes <code class="language-text">this</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> stuff <span class="token operator">=</span> <span class="token string">\'stuff\'</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>\n  <span class="token keyword">function</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span> \n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>stuff<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>n<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> stuff<span class="token punctuation">:</span> <span class="token string">\'thing\'</span> <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// ["thing 1", "thing 2", "thing 3", "thing 4", "thing 5"]</span></code></pre>\n      </div>\n<h2>Object.fromEntries()</h2>\n<p>Creates an object from any iterable containing <code class="language-text">[key, value]</code> tuples (Map, Array or custom iterable)</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">\'one\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'two\'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'three\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// { one: 1, three: 3, two: 2 }</span>\n\nObject<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">\'one\'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// { one: 1 }</span>\n\nObject<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">{</span> one<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// { one: 1 }</span></code></pre>\n      </div>\n<h3>Gotchas</h3>\n<p>Will throw an error if used with a Set</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"1"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// TypeError: Iterator value one is not an entry object</span></code></pre>\n      </div>\n<h2>String.prototype.(trimStart, trimEnd}</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token string">\'  hello world  \'</span><span class="token punctuation">.</span><span class="token function">trimStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// “hello world  “</span>\n\n<span class="token string">\'  hello world  \'</span><span class="token punctuation">.</span><span class="token function">trimEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// “  hello world”</span>\n\n<span class="token string">\'  hello world  \'</span><span class="token punctuation">.</span><span class="token function">trimStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trimEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// “hello world”</span></code></pre>\n      </div>\n<h3>Gotchas:</h3>\n<p>trimLeft &#x26; trimRight are now aliases to trimStart &#x26; trimEnd, respectively</p>\n<h2>Optional catch binding</h2>\n<p>Catch no longer requires an error parameter, i.e. <code class="language-text">catch(error) {...}</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">let</span> catchResult <span class="token operator">=</span> <span class="token string">\'uncaught\'</span><span class="token punctuation">;</span>\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>\n  catchResult <span class="token operator">=</span> <span class="token string">\'caught\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>catchResult<span class="token punctuation">)</span><span class="token punctuation">;</span> \n<span class="token comment">// “caught”</span></code></pre>\n      </div>\n<h3>Gotchas</h3>\n<p><code class="language-text">catch()</code> is still not allowed; if <code class="language-text">()</code> is present it must have a parameter</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">try</span> <span class="token punctuation">{</span>\n  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  catchResult <span class="token operator">=</span> <span class="token string">\'caught\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> \n<span class="token comment">// SyntaxError: Unexpected token !</span></code></pre>\n      </div>\n<h2>Other changes</h2>\n<p>The remaining changes are either internal or don’t have many use cases, but are still useful to know about…</p>\n<p>Symbol.prototype.description\n<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description</a></p>\n<p>Stable Array.prototype.sort()\n<a href="https://mathiasbynens.be/demo/sort-stability">https://mathiasbynens.be/demo/sort-stability</a></p>\n<p>Well-formed JSON.stringify()\n<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Well-formed_JSON.stringify(">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global<em>Objects/JSON/stringify#Well-formed</em>JSON.stringify(</a>)</p>\n<p>JSON superset\n<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#JavaScript_and_JSON_differences">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global<em>Objects/JSON#JavaScript</em>and<em>JSON</em>differences</a> (see “Any JSON text is a valid JavaScript expression”)</p>\n<p>Revised/standardized Function.prototype.toString()\n<a href="https://tc39.es/Function-prototype-toString-revision/#sec-introduction">https://tc39.es/Function-prototype-toString-revision/#sec-introduction</a></p>',frontmatter:{title:"A Quick Overview of ES2019",date:"August 03, 2019"}}},pathContext:{slug:"/es2019/",previous:{fields:{slug:"/github-branch-replace/"},frontmatter:{title:"How to replace a git branch with a new codebase"}},next:null}}}});
//# sourceMappingURL=path---es-2019-833595705279c33a1928.js.map