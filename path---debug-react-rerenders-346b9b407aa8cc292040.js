webpackJsonp([64545179632660],{405:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/debug-react-rerenders/index.md absPath of file >>> MarkdownRemark",html:'<p>\n  <figure class="gatsby-resp-image-figure">\n  \n  <a\n    class="gatsby-resp-image-link"\n    href="/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-e67f1.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.67558886509636%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAEEBf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/2gAMAwEAAhADEAAAAcOiZlIQj//EABgQAQADAQAAAAAAAAAAAAAAAAEAAxAT/9oACAEBAAEFApbVzMVc/8QAFhEBAQEAAAAAAAAAAAAAAAAAARAR/9oACAEDAQE/ARMn/8QAFhEAAwAAAAAAAAAAAAAAAAAAEBEh/9oACAECAQE/Aax//8QAFxAAAwEAAAAAAAAAAAAAAAAAAAEQIf/aAAgBAQAGPwIV1z//xAAZEAEAAgMAAAAAAAAAAAAAAAABEBEAMVH/2gAIAQEAAT8hC0MRCjc7Qa7H/9oADAMBAAIAAwAAABAIz//EABYRAQEBAAAAAAAAAAAAAAAAAAEQIf/aAAgBAwEBPxACE2f/xAAWEQEBAQAAAAAAAAAAAAAAAAABECH/2gAIAQIBAT8QRBHJ/8QAGRABAAMBAQAAAAAAAAAAAAAAEQEQYQAh/9oACAEBAAE/ENkk7EKbB8EQkr//2Q==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Stop light."\n        title="Photo by Erwan Hesry on Unsplash."\n        src="/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-1697e.jpg"\n        srcset="/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-a2cfd.jpg 148w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-3348f.jpg 295w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-1697e.jpg 590w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-6a00a.jpg 885w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-46304.jpg 1180w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-07574.jpg 1770w,\n/static/stop-light-17dc1cefa23861f3fc8bdb699081cd6b-e67f1.jpg 3736w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n  <figcaption class="gatsby-resp-image-figcaption">Photo by Erwan Hesry on Unsplash.</figcaption>\n  </figure>\n      </p>\n<p>When developing in React, you will likely run into scenarios where components are rerendering more than you would expect; which can have a direct impact on an application’s perceived performance. </p>\n<p>And with the introduction of React Hooks, developers now have even more ways to inadvertently trigger rerenders (looking at you <code class="language-text">useEffect</code>!).</p>\n<p>Thankfully React gives developers several tools to help them find the source of unnecessary rerenders. In this post I’ll discuss three of them: <a href="https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html">DevTools Profiler</a>, <a href="https://reactjs.org/docs/react-api.html#reactmemo">React.memo</a>, and <a href="https://reactjs.org/docs/profiler.html">React.Profiler</a>.</p>\n<h2>DevTools Profiler</h2>\n<p><a href="https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html">DevTools Profiler</a> is a fantastic browser plugin that is currently available in Chrome &#x26; Firefox (there is also a Node version). Check out the docs to learn more about specific features.</p>\n<p>Version 4 of React DevTools — released August 15, 2019 — came with a great new feature called <a href="https://github.com/facebook/react/blob/master/packages/react-devtools/CHANGELOG.md#why-did-this-render">“Why did this render?”</a>.</p>\n<p><img src="/why-did-this-rerender-3b5503aa4b21a4e309ac98562824317d.gif" alt="Animated gif of the Why did this rerender tool"></p>\n<p>To use this tool, simply install Profiler and turn on the <em>“Record why each component rendered while profiling.”</em> option. You can then run Profiler while interacting with your app, focusing on whichever components may be rendering unnecessarily. </p>\n<p>After you end the Profiler session, you’ll be able to drill down into individual components to see their render metrics. Under the <em>“Why did this render?”</em> heading you’ll see a list of reasons the component rendered/rerendered. </p>\n<p>Common reasons for rerendering: </p>\n<ul>\n<li>Hooks changing (ie <code class="language-text">useState</code>’s <code class="language-text">setState</code> methode being called)</li>\n<li>props changing (it will list the exact props!)</li>\n<li>a component’s parent rerendering</li>\n</ul>\n<p>Of all the debugging tools, I’d say this is the easiest and fastest to set up and use. But there is one shortcoming: there is no way to inspect the <strong>value</strong> of the props that changed; and it’s often helpful to be able to inspect prop values to get a better understanding of what is changing, and why. </p>\n<p>To get this data you can use another tool: <code class="language-text">React.memo</code>.</p>\n<h2>React.memo</h2>\n<p>React v16.6.0 gave us a new <a href="https://reactjs.org/docs/react-api.html#reactmemo">React.memo</a> method that can be used with both functional and class-based components to give us more control over rerenders, similar to the <code class="language-text">shouldComponentUpdate</code> class component method. Not only is it a good tool for controlling rerenders, it can also be a helpful tool when trying to find the cause of rerenders.</p>\n<p>The key to debugging rerenders is to use the second optional argument of <code class="language-text">React.memo</code> which is an “isEqual” function that takes two arguments, <code class="language-text">prevProps</code> and <code class="language-text">nextProps</code>, and gives you control over whether a component should change. See the <a href="https://reactjs.org/docs/react-api.html#reactmemo">React docs</a> for <code class="language-text">memo</code> for more details.</p>\n<p>Now with access to <code class="language-text">prevProps</code> and <code class="language-text">nextProps</code>, you can easily view what is changing and determine the root cause of rerenders:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> memoizedComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> \n  <span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> nextProps<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">.</span>thing <span class="token operator">===</span> nextProps<span class="token punctuation">.</span>thing<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">/*\n      When using this function you always need to return\n      a Boolean. For now we\'ll say the props are NOT equal \n      which means the component should rerender.\n    */</span>\n    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Side note: while you can use <code class="language-text">React.memo</code> to manually prevent rerenders once you find the issue, I highly recommend dealing with the root cause — which is more often than not a prop that is being unnecessarily recreated on every render. Otherwise you’ll end up band-aiding every component with <code class="language-text">React.memo</code> which will result in lots equality checks, plus data being stored in memory. </p>\n<h2>React.Profiler</h2>\n<p>Finally, let’s take a look at the <a href="https://reactjs.org/docs/profiler.html">React.Profiler</a> API, which gives developers additional data points that can be used to debug performance issues. </p>\n<p>With <code class="language-text">React.Profiler</code>, developers can wrap their JSX elements with a <code class="language-text">&lt;Profiler&gt;</code> component, which takes two props:</p>\n<ol>\n<li><strong>id</strong> - a unique identifies for the section being profiled.</li>\n<li><strong>onRender</strong> - a callback function to be called on every render. Check out the <a href="https://reactjs.org/docs/profiler.html#onrender-callback">docs</a> for a full list of the callback parameters.</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">return</span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Profiler \n    id<span class="token operator">=</span><span class="token string">"test1"</span> \n    onRender<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span> phase<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">:</span> actualDuraction <span class="token punctuation">}</span> <span class="token operator">=</span> args<span class="token punctuation">;</span>\n\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span> phase<span class="token punctuation">,</span> actualDuration <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token operator">></span>\n    <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Profiler<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Here a few things you can check when debugging rerenders using <code class="language-text">React.Profiler</code>:</p>\n<ul>\n<li>Ensure a component never reverts to the <code class="language-text">mount</code> phase after the initial render; it should always be <code class="language-text">updated</code>.</li>\n<li>The <code class="language-text">actualDuraction</code> should go down after the initial render. If it stays the same or goes up, you are likely not rendering children efficiently.</li>\n<li>To better understand which user action is triggering a rerender, you can track timestamps of multiple actions and see which correlate with the <code class="language-text">startTime</code>.</li>\n<li><code class="language-text">baseDuration</code> will tell you the worst case scenario when a component rerenders. Components with the highest <code class="language-text">baseDuration</code> are the ones you want to pay extra attention to when optimizing rerenders.</li>\n</ul>\n<p> That’s it! Happy debugging!</p>',frontmatter:{title:"How to debug unnecessary rerenders in React",date:"February 09, 2020"}}},pathContext:{slug:"/debug-react-rerenders/",previous:{fields:{slug:"/optimize-Context-performance-with-usePubSub/"},frontmatter:{title:"Building a usePubSub Hook to optimize React.Context performance"}},next:null}}}});
//# sourceMappingURL=path---debug-react-rerenders-346b9b407aa8cc292040.js.map