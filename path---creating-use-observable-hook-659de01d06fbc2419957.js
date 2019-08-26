webpackJsonp([0xe32a265f5eaa],{399:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/creating-useObservable-hook/index.md absPath of file >>> MarkdownRemark",html:'<p>Here we’ll take a look at how to create your own <code class="language-text">useObservable</code> Hook in React, utilizing RxJs Observables, allowing you to easily share Observables across your app.</p>\n<h2>But, why?</h2>\n<p>There are many use cases for Observables within web apps, and exposing them via a custom Hooks is a great way to bring Observables into a React app.</p>\n<p>If you aren’t familiar with Observables, you can basically think of them as a way to react to a series of events (either sync or async) in an easy and declarative way. Almost like combining a Promise and an Iterator.</p>\n<p>An example use case would be if you were making a <a href="https://en.wikipedia.org/wiki/Frogger">Frogger</a>-like game you would have “jump” events and “vehicle movement” events. Using an Observable would let you track both events, do something when when the poor frog jumped into a car, and then turn off tracking of events.</p>\n<p>Here I’ll be using the RxJs Observable library. <a href="https://rxjs-dev.firebaseapp.com/">Check out the docs </a> to learn more about Observables. </p>\n<h2>The App</h2>\n<p>The purpose of this app is just to show how <code class="language-text">useObservable</code> is created and used, not an actual use case for Observables (that would require a much longer article). Here it is:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// index.jsx</span>\n\n<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useObservable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../custom-hooks"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// The observable will be used to set local state, so we also</span>\n  <span class="token comment">// need to use useState.</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>appState<span class="token punctuation">,</span> setAppState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> on<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// We\'ll initialize the observable with appState. All subscribers </span>\n  <span class="token comment">// will have this same initial state.</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>observable<span class="token punctuation">,</span> setObservableState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useObservable</span><span class="token punctuation">(</span>appState<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> myObservable <span class="token operator">=</span> observable<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>\n      <span class="token comment">// Here is where we\'d add RxJs operators to make magic happen.</span>\n      <span class="token comment">// https://rxjs-dev.firebaseapp.com/guide/operators</span>\n    <span class="token punctuation">)</span>\n\n    myObservable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      next<span class="token punctuation">:</span> v <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">setAppState</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// When the component unmounts we\'ll unsubscribe from events</span>\n    <span class="token keyword">return</span> observable<span class="token punctuation">.</span>unsubscribe<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>observable<span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"App"</span><span class="token operator">></span>\n       <span class="token punctuation">{</span> <span class="token comment">/* setObservableState() will broadcast changes to all subscribed components */</span> <span class="token punctuation">}</span>\n      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setObservableState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>appState<span class="token punctuation">,</span> on<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>\n        Turn On\n      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setObservableState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>appState<span class="token punctuation">,</span> on<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>\n        Turn Off\n      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2>The Hook</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// custom-hooks.jsx</span>\n\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token comment">// A Subject is a special type of Observable that can </span>\n<span class="token comment">// act as both an observer and observable. In other words it </span>\n<span class="token comment">// can both receive messages AND broadcast changes.</span>\n<span class="token comment">// A BehaviorSubject is a type of Subject that let\'s you </span>\n<span class="token comment">// set an initial value. Check out RxJs docs for more info.</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> BehaviorSubject <span class="token keyword">as</span> Observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rxjs"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> observable<span class="token punctuation">;</span>\n<span class="token keyword">let</span> handleNext<span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useObservable</span> <span class="token operator">=</span> <span class="token punctuation">(</span>initialState <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>observable<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    observable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span>initialState<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function-variable function">handleNext</span> <span class="token operator">=</span> value <span class="token operator">=></span> <span class="token punctuation">{</span>\n      observable<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">[</span>observable<span class="token punctuation">,</span> handleNext<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2></h2>\n<p>That’s it! If you have other thoughts or feedback <a href="https://twitter.com/BryceDooley">let me know!</a></p>',frontmatter:{title:"Creating a useObservable React Hook",date:"August 26, 2019"}}},pathContext:{slug:"/creating-useObservable-hook/",previous:{fields:{slug:"/testing-async-redux-in-jest/"},frontmatter:{title:"Testing async React Redux using Jest"}},next:null}}}});
//# sourceMappingURL=path---creating-use-observable-hook-659de01d06fbc2419957.js.map