webpackJsonp([0xbd36dd3024e],{397:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/debug-rerenders-using-hooks/index.md absPath of file >>> MarkdownRemark",html:'<p>When working with class components in React I frequently utilize the <code class="language-text">shouldComponentUpdate</code> lifecycle method to debug unnecessary rerenders, which have been the root cause of most performance issues that I have come across.</p>\n<p>But, in the world of Hooks we do not have access to <code class="language-text">shouldComponentUpdate</code>. And with Hooks, I’ve found that unnecessary rerenders happen even more often — so it’s important to have good debugging tactics.</p>\n<p>Fortunately, React v16.6.0 gave us a new <code class="language-text">memo</code> method that can be used with functional components to give us more control over rerenders, just like we’re used to with <code class="language-text">shouldComponentUpdate</code>. Since <code class="language-text">React.memo</code> wasn’t part of the “Hooks release”, you might not think to use it for debugging Hooks — but it is the most effective tool I’ve found so far.</p>\n<p>The key to debugging rerenders is to use the second optional argument of <code class="language-text">React.memo</code> which is an “isEqual” function that takes two arguments, <code class="language-text">prevProps</code> and <code class="language-text">nextProps</code>, and gives you control over whether a component should change. See the <a href="https://reactjs.org/docs/react-api.html#reactmemo">React docs</a> for <code class="language-text">memo</code> for more details.</p>\n<p>Now with access to <code class="language-text">prevProps</code> and <code class="language-text">nextProps</code>, you can easily view what is changing and determine the root cause of rerenders:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> memoizedComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> \n  <span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> nextProps<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">.</span>thing <span class="token operator">===</span> nextProps<span class="token punctuation">.</span>thing<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">/*\n      When using this function you always need to return\n      a Boolean. For now we\'ll say the props are NOT equal \n      which means the component should rerender.\n    */</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Side note: while you can use <code class="language-text">React.memo</code> to manually prevent rerenders once you find the issue, I highly recommend dealing with the root cause — which is more often than not a prop that is being unnecessarily recreated on every render. Otherwise you’ll end up band-aiding every component with <code class="language-text">React.memo</code> which will result in lots data being stored in memory. </p>\n<p>If you have other tools or tips for perf debugging with Hooks <a href="https://twitter.com/BryceDooley">let me know!</a> </p>',frontmatter:{title:"How to debug unnecessary rerenders using React Hooks",date:"August 10, 2019"}}},pathContext:{slug:"/debug-rerenders-using-hooks/",previous:{fields:{slug:"/es2019/"},frontmatter:{title:"A Quick Overview of ES2019"}},next:null}}}});
//# sourceMappingURL=path---debug-rerenders-using-hooks-9d6d2004f8fb355ba085.js.map