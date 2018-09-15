---
title: How to replace a git branch with a new codebase
date: "2018-09-14T12:55:58.920Z"
---

If you're in a situation where you need to completely replace an entire branch's codebase (as well as commits, history, etc.) on GitHub, this is how you can go about doing it. 
 

1. Backup the old branch on a new branch called "archive" and push to the remote for safe keeping
```
cd branch/being/replaced/path
git checkout <branch-being-replaced>
git checkout -b archive && git push origin -u archive
```

2.  Go into the new project/codebase and set up git (if not done already)
```
cd new/codebase/path
git init
```

3. Set the origin of the new codebase to point to the repo containing the branch being replaced
```
git remote add origin https://github.com/<your-git-username>/<your-git-repo>
(OR w/ SSH) git remote add origin git@github.com:<your-git-username>/<your-git-repo>
```

4. Force push the new codebase to the branch being replaced (NOT the "archive" branch)
```
git push --force origin <branch-being-replaced>
```

That's it!