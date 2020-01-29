webpackJsonp([0xed99fc127f3e],{405:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Bryce's Blog",author:"Bryce Dooley"}},markdownRemark:{id:"/Users/brycedooley/Documents/blog/gatsby-blog/src/pages/github-branch-replace/index.md absPath of file >>> MarkdownRemark",html:'<p>If you’re in a situation where you need to completely replace an entire branch’s codebase (as well as commits, history, etc.) on GitHub, this is how you can go about doing it. </p>\n<p>I needed to do this when replacing my github.io branch to launch this blog…not sure if there are many other use cases…? Anyways, here are the steps:</p>\n<ol>\n<li>\n<p>Backup the old branch on a new branch called “archive” and push to the remote for safe keeping</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> old/codebase/path\n<span class="token function">git</span> checkout branch-being-replaced\n<span class="token function">git</span> checkout -b archive <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> push origin -u archive</code></pre>\n      </div>\n</li>\n<li>\n<p>Go into the new project/codebase and set up git (if not done already)</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> new/codebase/path\n<span class="token function">git</span> init</code></pre>\n      </div>\n</li>\n<li>\n<p>Set the origin of the new codebase to point to the repo containing the branch being replaced</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">git</span> remote add origin https://github.com/your-git-username/your-git-repo\n<span class="token punctuation">(</span>OR w/ SSH<span class="token punctuation">)</span> <span class="token function">git</span> remote add origin git@github.com:your-git-username/your-git-repo</code></pre>\n      </div>\n</li>\n<li>\n<p>Force push the new codebase to the branch being replaced (<strong>NOT</strong> the “archive” branch)</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">git</span> push --force origin branch-being-replaced</code></pre>\n      </div>\n</li>\n</ol>\n<p>That’s it! Now the new site will have replaced the old, while the old still exists on the “archive” branch.</p>',frontmatter:{title:"How to replace a git branch with a new codebase",date:"September 14, 2018"}}},pathContext:{slug:"/github-branch-replace/",previous:null,next:{fields:{slug:"/es2019/"},frontmatter:{title:"A quick overview of ES2019"}}}}}});
//# sourceMappingURL=path---github-branch-replace-32e34c75f0dc06831aed.js.map