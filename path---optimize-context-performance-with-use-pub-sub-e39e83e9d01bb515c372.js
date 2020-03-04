webpackJsonp([0x5c741bdda563],{413:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/optimize-Context-performance-with-usePubSub/index.md absPath of file >>> MarkdownRemark",html:'<p>React.Context is a great tool for sharing state across your application. It allows you to avoid “prop drilling”, and doesn’t require an additional library, such as Redux.</p>\n<p>However, it does come at a cost; it can be difficult to manage performance when using Context since every change to its value will cause each component consuming that Context to rerender.</p>\n<p>Recently I was building a feature, and after drilling props down 7+ levels I decided to incorporate Context. It worked very well, but I quickly noticed performance issues when one of the components would update the shared Context value.</p>\n<h2>Sharing setState</h2>\n<p>After some trial and error, I found a solution to the performance problem that involved storing each component’s <code class="language-text">setState</code> function inside of Context. Instead of updating the shared Context value, I called each of the component’s <code class="language-text">setState</code> functions that I wanted to receive the update. That way I had full control over which components rerendered! </p>\n<p>Note: to give yourself control of rerenders, each component will likely need to be nested into <code class="language-text">React.memo</code>. See the codepen below for an example.</p>\n<p>At first I was skeptical of this approach; it didn’t seem right that I was passing <code class="language-text">setState</code> up into a Context value and invoking it from the components’ parent. But I realized it wasn’t much different than passing an <code class="language-text">onChange</code> handler down to a child component — a very common practice. </p>\n<p>It shows what a powerful tool React Hooks are by bringing flexibility and composability into the world of state management!</p>\n<h2>usePubSub</h2>\n<p>The idea of passing a change handler to a parent and allowing that parent to invoke changes may sound familiar; it’s similar to what you see in the publish—subscribe design pattern. I thought it would be an interesting experiment to abstract the sharing of <code class="language-text">setState</code> described above into its own custom hook — <code class="language-text">usePubSub</code>.</p>\n<h4>The API</h4>\n<p>The <code class="language-text">usePubSub</code> API would consist of two things: 1) a <code class="language-text">Provider</code> component to initialize Context &#x26; store state, and 2) a <code class="language-text">usePubSub</code> hook that could be consumed by any component within <code class="language-text">Provider</code>. </p>\n<p><code class="language-text">usePubSub</code> would return three things: <code class="language-text">state</code> and <code class="language-text">setState</code> to manage the components’ state, and <code class="language-text">publish</code> to send state changes off to each component. </p>\n<p>Each component would need an <code class="language-text">id</code> prop as well so that there was a unique identifier for each component’s <code class="language-text">setState</code> function. </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Provider<span class="token punctuation">,</span> usePubSub <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./usePubSub\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">Component</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> id <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> state<span class="token punctuation">,</span> setState<span class="token punctuation">,</span> publish <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">usePubSub</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span>\n\n<span class="token operator">&lt;</span>Provider initialState<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">}</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span>Component <span class="token operator">/</span><span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span></code></pre>\n      </div>\n<h4>The Code</h4>\n<p>Here is the code used to implement this feature, with comments describing what does what.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useContext<span class="token punctuation">,</span> useState<span class="token punctuation">,</span> useRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Holds the single "state" consumed by all components,</span>\n<span class="token comment">// as well as setState and publish.</span>\n<span class="token keyword">const</span> Context <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">usePubSub</span> <span class="token operator">=</span> id <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// These values are set below in Provider.</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> context<span class="token punctuation">,</span> setContext<span class="token punctuation">,</span> publish <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>Context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// These functions will be unique to each component that invokes usePubSub.</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>subscriberState<span class="token punctuation">,</span> setSubscriberState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>state<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// Updates both the component state and the Context state.</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">setState</span> <span class="token operator">=</span> state <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setSubscriberState</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">setContext</span><span class="token punctuation">(</span>context <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token operator">...</span>context<span class="token punctuation">,</span>\n      state<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span>context<span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> state <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// This will add the component\'s setState function into the </span>\n  <span class="token comment">// Context object. As rerenders happen, the setState function</span>\n  <span class="token comment">// may change. This ensures it is re-added if it changes.</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>subscribers<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">!==</span> setSubscriberState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">setContext</span><span class="token punctuation">(</span>context <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token operator">...</span>context<span class="token punctuation">,</span>\n      subscribers<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span>context<span class="token punctuation">.</span>subscribers<span class="token punctuation">,</span> <span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> setState <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> state<span class="token punctuation">:</span> subscriberState<span class="token punctuation">,</span> setState<span class="token punctuation">,</span> publish <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">Provider</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> initialState<span class="token punctuation">,</span> children <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>context<span class="token punctuation">,</span> setContext<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    state<span class="token punctuation">:</span> initialState<span class="token punctuation">,</span>\n    subscribers<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// This is key to avoiding rerenders. It ensures the Provider value always </span>\n  <span class="token comment">// keeps the same reference, and therefore doesn\'t trigger rerenders</span>\n  <span class="token keyword">const</span> memCtx <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">{</span> context<span class="token punctuation">,</span> setContext <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token comment">// This updates the ref with the latest context and setContext.</span>\n  <span class="token comment">// Without doing this, calling "setContext((context) => {...})"</span>\n  <span class="token comment">// in usePubSub would be referencing stale data.</span>\n  memCtx<span class="token punctuation">.</span>current<span class="token punctuation">.</span>context <span class="token operator">=</span> context<span class="token punctuation">;</span>\n  memCtx<span class="token punctuation">.</span>current<span class="token punctuation">.</span>setContext <span class="token operator">=</span> setContext<span class="token punctuation">;</span>\n\n  <span class="token comment">// This publishes the same state to each setState function/component. You </span>\n  <span class="token comment">// could also have function(s) sending updates to only certain setState functions.</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">publish</span> <span class="token operator">=</span> state <span class="token operator">=></span>\n    Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>memCtx<span class="token punctuation">.</span>current<span class="token punctuation">.</span>context<span class="token punctuation">.</span>subscribers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>fn <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  memCtx<span class="token punctuation">.</span>current<span class="token punctuation">.</span>publish <span class="token operator">=</span> publish<span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token operator">&lt;</span>Context<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>memCtx<span class="token punctuation">.</span>current<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span>children<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>Context<span class="token punctuation">.</span>Provider<span class="token operator">></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Check out <a href="https://codesandbox.io/s/quirky-thunder-07z0d">this code sandbox</a> to see <code class="language-text">usePubSub</code> in use.</p>\n<p>In the sandbox you’ll see App and App2 - App2 does the same thing but without <code class="language-text">usePubSub</code>. Check out the different in the Performance tab of React Profiler between the two.</p>\n<h2>Words of Caution</h2>\n<p>A few things I want to point out before ending this post:</p>\n<ol>\n<li>\n<p>Context is not always the best solution for state management. I’ve found it works very well for individual “models”, such as a single customer’s data. But it doesn’t work as well when storing several types of data in a single object. However there are certainly times where this needs to be done; which is a potential use case for something like <code class="language-text">usePubSub</code>.</p>\n</li>\n<li>\n<p>While putting <code class="language-text">setState</code> functions in Context worked well for my use case, I have not seen this pattern elsewhere, so I can’t necessarily say it’s a good one, or the right one. But it did solve my specific problem and I have not seen any resulting bugs or errors in the console, eslint, or elsewhere.</p>\n</li>\n</ol>',frontmatter:{title:"Building a usePubSub Hook to optimize React.Context performance",date:"February 05, 2020"}}},pathContext:{slug:"/optimize-Context-performance-with-usePubSub/",previous:{fields:{slug:"/developer-productivity-habits/"},frontmatter:{title:"Productivity habits for software developers"}},next:{fields:{slug:"/debug-react-rerenders/"},frontmatter:{title:"How to debug unnecessary rerenders in React"}}}}}});
//# sourceMappingURL=path---optimize-context-performance-with-use-pub-sub-e39e83e9d01bb515c372.js.map