webpackJsonp([0x689d1339f58d],{414:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/refactoring-patterns/index.md absPath of file >>> MarkdownRemark",html:'<p>Refactoring code has become one of my absolute favorite things to do. By refactoring code you’re able to:</p>\n<ol>\n<li>Make your code easier to understand (for both others and future you!). </li>\n<li>Better understand other people’s code as well as design patterns at play. </li>\n<li>Catch issues and/or bugs that may have otherwise gone unnoticed. </li>\n</ol>\n<p>When refactoring code, it’s helpful to use existing refactoring patterns. This will make the new design easier to understand for others, and easier to implement yourself. </p>\n<p>(Side note: having good test coverage is also a <em>CRUCIAL</em> part of refactoring, but it outside the scope of this post.) </p>\n<p>In this post I’ll outline my top 6 favorite refactoring patterns, and give examples of when they are useful and how to use them. Many of these are inspired by Martin Fowlers “Refactoring” book, which I highly recommend if you are looking to better understand common refactoring patterns.</p>\n<p>While the examples are in JavaScript, each pattern should be applicable to any programming language.</p>\n<h2>6. Introduce Object Parameter</h2>\n<p>When functions have multiple parameter, you start running into a few issues:</p>\n<ol>\n<li>For the function to work correctly, the order of parameters needs to be maintained.</li>\n<li>The names of the <em>arguments</em> (the actual values) passed to a function might not necessarily be the same as the parameter names, which makes searching for certain types of data/logic hard to do.</li>\n<li>Adding/removing parameters is a chore; each use of the function needs to be examined.</li>\n</ol>\n<p>To make function parameters more manageable, this pattern involves converting a list of parameters into a single object. This forces consistent parameter naming across all functions, and makes the parameter order insignificant. </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>toName<span class="token punctuation">,</span> punctuation<span class="token punctuation">,</span> fromName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>toName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>punctuation<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> From, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>fromName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.`</span></span>\n<span class="token punctuation">}</span> \n\n<span class="token function">sayHello</span><span class="token punctuation">(</span>customerName<span class="token punctuation">,</span> end<span class="token punctuation">,</span> myName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">{</span> toName<span class="token punctuation">,</span> punctuation<span class="token punctuation">,</span> fromName <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>toName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>punctuation<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> From, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>fromName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.`</span></span>\n<span class="token punctuation">}</span> \n\n<span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">{</span> toName<span class="token punctuation">,</span> punctuation<span class="token punctuation">,</span> fromName <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>5. Replace Anonymous Function with Expression</h2>\n<p>In JavaScript it’s a common practice to pass an anonymous function into an array method, such as <code class="language-text">.map</code>, <code class="language-text">.reduce</code>, or <code class="language-text">.filter</code>. One issue that I frequently see is these functions include logic that is not easy to understand, and since there is no name for the function it can be difficult to quickly parse the intent of the array method.</p>\n<p>Instead, I’ve found it helpful to extract these anonymous functions into a function expression, which makes it much easier to understand the intent (this is also known as using “point-free style” or “tacit programming”.).</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">const</span> activeUsers <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>lastPayment <span class="token operator">>=</span> <span class="token function">moment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startOf</span><span class="token punctuation">(</span><span class="token string">\'week\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">const</span> activeUsers <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>hasUserPaidThisWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">hasUserPaidThisWeek</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>lastPayment <span class="token operator">></span> <span class="token function">moment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startOf</span><span class="token punctuation">(</span><span class="token string">\'week\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2>4. Replace Primitive with Object</h2>\n<p>Using a primitive value such as a string, number, or boolean is a common practice in many programming languages. But this can cause problems when these primitive objects become even slightly complex. </p>\n<p>Instead of using an uncontrolled primitive value, a helpful practice is to wrap these primitives in an object, which will give you more control over how the value is consumed and modified. </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">let</span> isLoading <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token comment">// some code...</span>\nloading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> phone <span class="token operator">=</span> <span class="token string">\'1 617 484-4049\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> price <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">class</span> <span class="token class-name">LoadingStatus</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>initialStatus<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>statusSet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>initialStatus<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Invalid status\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> \n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> initialStatus<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  statusSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'loading\'</span><span class="token punctuation">,</span> <span class="token string">\'success\'</span><span class="token punctuation">,</span> <span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token string">\'idle\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n  <span class="token keyword">get</span> <span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">set</span> <span class="token function">status</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>statusSet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Invalid status\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> \n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> status<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_phone <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">parsePhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">parsePhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> trimmedPhone <span class="token operator">=</span> phone<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span><span class="token punctuation">(</span>phone<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Invalid phone format\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">const</span> areaCode <span class="token operator">=</span> trimmedPhone<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> prefix <span class="token operator">=</span> trimmedPhone<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> lineNumber <span class="token operator">=</span> trimmedPhone<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> areaCode<span class="token punctuation">,</span> prefix<span class="token punctuation">,</span> lineNumber <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">get</span> <span class="token function">areaCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_phone<span class="token punctuation">.</span>areaCode<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">get</span> <span class="token function">formatted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> areaCode<span class="token punctuation">,</span> prefix<span class="token punctuation">,</span> lineNumber <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_phone<span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>areaCode<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lineNumber<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span> \n  <span class="token punctuation">}</span>\n\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Price</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> price <span class="token operator">!==</span> <span class="token string">\'string\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Invalid price\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex">/^[0-9]*$/</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Invalid price\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_price <span class="token operator">=</span> price<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">get</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_price<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2>3. Decompose Conditional</h2>\n<p><code class="language-text">if/else</code> statements can be a powerful tool when adding logic to your program. But they can also become unwieldy and confusing very quickly. One way to counteract this is by making the conditional logic easier to understand by extracting it into expressions that describe your intent.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span><span class="token function">hasEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> user<span class="token punctuation">.</span>subscriptions<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">\'email\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">sendEmail</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">const</span> isSubscribed <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">hasEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> user<span class="token punctuation">.</span>subscriptions<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">\'email\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">if</span><span class="token punctuation">(</span>isSubscribed<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">sendEmail</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2>2. Encapsulate Record (Bridge Pattern)</h2>\n<p>A major concern while building software is usually which APIs you’ll be consuming, as well as providing. If your module is coupled with another API and that API changes, you may need to change your module as well; and this can sometimes be very time consuming.</p>\n<p>Instead of coupling various APIs, I find it helpful to give each module an API that makes the most sense given its functionality, and adding a layer in between your module and any other API it is interacting with. </p>\n<p>The Encapsulate Record refactoring pattern provides a great way to do this. This idea is also aligned with the Bridge pattern, which you can learn more about in “Design Patterns: Elements of Reusable Object-Oriented Software”.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'A Name\'</span><span class="token punctuation">,</span> \n  favorites<span class="token punctuation">:</span> <span class="token punctuation">{</span> \n    color<span class="token punctuation">:</span> <span class="token string">\'blue\'</span><span class="token punctuation">,</span>\n    food<span class="token punctuation">:</span> <span class="token string">\'pizza\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">UserComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div<span class="token operator">></span>Name<span class="token punctuation">:</span> <span class="token punctuation">{</span>user<span class="token punctuation">.</span>name<span class="token punctuation">}</span> <span class="token operator">-</span> Food<span class="token punctuation">:</span> <span class="token punctuation">{</span>user<span class="token punctuation">.</span>favorites<span class="token punctuation">.</span>food<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">UserComponent</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'A Name\'</span><span class="token punctuation">,</span> \n  favorites<span class="token punctuation">:</span> <span class="token punctuation">{</span> \n    color<span class="token punctuation">:</span> <span class="token string">\'blue\'</span><span class="token punctuation">,</span>\n    food<span class="token punctuation">:</span> <span class="token string">\'pizza\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_user <span class="token operator">=</span> user<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">get</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_user<span class="token punctuation">.</span>name<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">get</span> <span class="token function">food</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_user<span class="token punctuation">.</span>favorites<span class="token punctuation">.</span>food<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">UserComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">,</span> food <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div<span class="token operator">></span>Name<span class="token punctuation">:</span> <span class="token punctuation">{</span>name<span class="token punctuation">}</span> <span class="token operator">-</span> Food<span class="token punctuation">:</span> <span class="token punctuation">{</span>food<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">UserComponent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>1. Replace Conditional with Polymorphism</h2>\n<p>This is probably my favorite refactoring pattern. Several times it has helped me make confusing conditional logic much more readable and maintainable. And once logic is encapsulated in an object, you then have the ability to use additional design patterns to help achieve your goals.</p>\n<p>The idea is that instead of using a bunch of nested <code class="language-text">if</code> statements in your code, you create objects that represent different “types”, and give each type method(s) that are in charge of performing certain actions. Then, the application can simply call the same method on each type, and it’s up to the type to perform the action in the correct way.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Before</span>\n\n<span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>favorites<span class="token punctuation">.</span>food <span class="token operator">===</span> <span class="token string">\'pizza\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">sendPizzaEmail</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">if</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>favorites<span class="token punctuation">.</span>food <span class="token operator">===</span> <span class="token string">\'ice cream\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">sendIceCreamEmail</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// After</span>\n\n<span class="token keyword">class</span> <span class="token class-name">PizzaUser</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_user <span class="token operator">=</span> user<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">sendEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">sendPizzaEmail</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">class</span> <span class="token class-name">IceCreamUser</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_user <span class="token operator">=</span> user<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">sendEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">sendIceCreamEmail</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// this would create the appropriate user using the above classes</span>\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">getUser</span><span class="token punctuation">(</span>userData<span class="token punctuation">)</span><span class="token punctuation">;</span> \n\nuser<span class="token punctuation">.</span><span class="token function">sendEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>That’s it! Happy refactoring!</p>',
frontmatter:{title:"Refactoring: My 6 favorite patterns",date:"March 04, 2020"}}},pathContext:{slug:"/refactoring-patterns/",previous:{fields:{slug:"/debug-react-rerenders/"},frontmatter:{title:"How to debug unnecessary rerenders in React"}},next:null}}}});
//# sourceMappingURL=path---refactoring-patterns-fea0406beb8673af7330.js.map