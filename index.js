'use strict';
const OPT = {
  "user": "admin",// 你的用户名
  "password": "yourpwd", //你的密码
  "siteDomain": "blog.s3m-soft.cc.cd", // 你的域名
  "siteName": "sam3maker's",// 博客名字
  "siteDescription": "My Tech Blog",//博客简介
  "keyWords": "cloudflare,KV,workers,blog",//关键字
  "cacheZoneId": "cc868e8edce4027ad4a735741111111", //清理缓存用 cf区域 ID
  "cacheToken": "LNxRWH-MPMIGnp8qhyT8FUsjDRN6tdOnmaaaaaaa",//清理缓存用 cf API token
  "pageSize": 5,//每页文章数
  "recentlySize": 6,//最近文章数
  "readMoreLength": 150,//阅读更多截取长度	
  "cacheTime": 43200,//网页缓存时长(秒),建议=文章更新频率
  "themeURL": "https://raw.githubusercontent.com/sam3maker/cloudflare-workers-blog/master/themes/default2.0/",// 模板地址,以 "/"" 结尾
  "html404": "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\"><title>404</title><style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;background-color:#000000;border:none;outline:none;}body{display:flex;align-items:center;justify-content:center;margin:0;padding:0;}.image-container{display:flex;justify-content:center;align-items:center;background-color:#000000;border:none;padding:0;margin:0;line-height:0;}.cat-image{display:block;max-width:95vw;max-height:95vh;width:auto;height:auto;border:none;outline:none;background-color:transparent;box-shadow:none;object-fit:contain;}a,a:link,a:visited,a:hover,a:active{text-decoration:none;border:none;outline:none;}:focus{outline:none;}img{-webkit-tap-highlight-color:transparent;}</style></head><body><div class=\"image-container\"><img class=\"cat-image\" src=\"https://http.cat/404\" alt=\"404 Not Found\"></div></body></html>",//404页面代码
  "codeBeforHead": "",
  "codeBeforBody": "",
  "commentCode": "<div id=\"cf_comment_box\" style=\"margin-top:30px;padding:15px;border:1px solid #eee;border-radius:8px\"><h3>评论</h3><div id=\"cf_main_comment_form\"><input type=\"text\" id=\"cf_main_author\" placeholder=\"昵称\" required style=\"width:100%;margin:5px 0;padding:8px;box-sizing:border-box\"><br><textarea id=\"cf_main_content\" placeholder=\"说点什么...\" required style=\"width:100%;margin:5px 0;padding:8px;box-sizing:border-box;min-height:80px\"></textarea><br><button id=\"cf_main_submit\" style=\"padding:8px 16px;background:#07c;color:white;border:none;border-radius:4px;cursor:pointer\">发布评论</button></div><div id=\"cf_comment_list\" style=\"margin-top:20px\"></div></div><script>!function(){function f(t){var e=document.createElement('div');e.textContent=t;return e.innerHTML}function g(t){if(!t)return'';try{var e=new Date(t);return isNaN(e.getTime())?t:e.toLocaleString('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'})}catch(e){return t}}var articleId=(function(){var t=window.location.pathname.split('/');return t[2]||null})(),commentList=document.getElementById('cf_comment_list');function renderCommentTree(t,e,n){n=n||0;t.forEach(function(t){var r=document.createElement('div');r.className='cf-comment-item';r.style='margin:10px 0;padding:10px;border-radius:4px;background:#fafafa;margin-left:'+(n*20)+'px;border-left:3px solid #'+(0===n?'07c':'ddd');r.dataset.commentId=t.id;var o=document.createElement('div');o.style='display:flex;align-items:center;gap:10px;margin-bottom:8px';o.innerHTML='<span style=\"font-weight:bold;color:#07c\">'+f(t.author)+'</span><span style=\"font-size:12px;color:#999;margin-left:10px;\">'+g(t.time)+'</span><button class=\"cf-reply-btn\" data-comment-id=\"'+t.id+'\" style=\"font-size:12px;background:none;border:none;color:#07c;cursor:pointer;padding:0\">回复</button>';var l=document.createElement('div');l.style='margin-bottom:8px;word-break:break-all';l.innerHTML=f(t.content);var c=document.createElement('div');c.className='cf-reply-form';c.style='display:none;margin:10px 0;padding:10px;background:#fff;border-radius:4px';c.innerHTML='<input type=\"text\" class=\"cf-reply-author\" placeholder=\"昵称\" required style=\"width:100%;margin:5px 0;padding:6px;box-sizing:border-box\"><br><textarea class=\"cf-reply-content\" placeholder=\"回复内容...\" required style=\"width:100%;margin:5px 0;padding:6px;box-sizing:border-box;min-height:60px\"></textarea><br><div style=\"display:flex;gap:10px\"><button class=\"cf-reply-submit\" data-parent-id=\"'+t.id+'\" style=\"padding:6px 12px;background:#07c;color:white;border:none;border-radius:4px;cursor:pointer\">发布回复</button><button class=\"cf-reply-cancel\" style=\"padding:6px 12px;background:#999;color:white;border:none;border-radius:4px;cursor:pointer\">取消</button></div>';var u=document.createElement('div');u.className='cf-comment-children';r.appendChild(o);r.appendChild(l);r.appendChild(c);r.appendChild(u);e.appendChild(r);if(t.replies&&t.replies.length>0){renderCommentTree(t.replies,u,n+1)}});bindReplyEvents()}function bindReplyEvents(){document.querySelectorAll('.cf-reply-btn').forEach(function(t){t.onclick=function(){var e=t.dataset.commentId;var n=document.querySelector('.cf-comment-item[data-comment-id=\"'+e+'\"]');if(!n)return;var r=n.querySelector('.cf-reply-form');document.querySelectorAll('.cf-reply-form').forEach(function(t){t.style.display='none'});r.style.display='block'}});document.querySelectorAll('.cf-reply-cancel').forEach(function(t){t.onclick=function(){var e=t.closest('.cf-reply-form');e.style.display='none';e.querySelector('.cf-reply-author').value='';e.querySelector('.cf-reply-content').value=''}});document.querySelectorAll('.cf-reply-submit').forEach(function(t){t.onclick=async function(){var e=t.dataset.parentId;var n=t.closest('.cf-reply-form');var r=n.querySelector('.cf-reply-author').value.trim();var o=n.querySelector('.cf-reply-content').value.trim();if(!r||!o){alert('请填写昵称和回复内容');return}if(!articleId){alert('文章ID获取失败，请刷新页面重试');return}t.disabled=true;t.textContent='提交中...';try{var l=await fetch('/api/comment/add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({articleId:articleId,author:r,content:o,parentId:e})});var c=await l.json();if(c.ok===1){alert('回复成功！');n.querySelector('.cf-reply-author').value='';n.querySelector('.cf-reply-content').value='';n.style.display='none';loadComments()}else{alert(c.msg||'回复失败，请重试')}}catch(t){alert('提交失败：'+t.message)}finally{t.disabled=false;t.textContent='发布回复'}}})}async function loadComments(){if(!articleId){commentList.innerHTML='<p style=\"color:#999;font-size:14px;padding:10px 0;border-bottom:1px solid #eee;\">非文章页面，无法加载评论</p>';return}try{var t=await fetch('/api/comments/'+articleId);if(!t.ok)throw new Error('服务器错误');var e=await t.json();commentList.innerHTML='';if(e.length===0){commentList.innerHTML='<p style=\"color:#999;font-size:14px;padding:10px 0;border-bottom:1px solid #eee;\">暂无评论</p>';return}renderCommentTree(e,commentList)}catch(t){commentList.innerHTML='<p style=\"color:#999;font-size:14px;padding:10px 0;border-bottom:1px solid #eee;\">评论加载失败：'+t.message+'</p>'}}document.getElementById('cf_main_submit').onclick=async function(){var t=document.getElementById('cf_main_author').value.trim();var e=document.getElementById('cf_main_content').value.trim();if(!t||!e){alert('请填写昵称和评论内容');return}if(!articleId){alert('文章ID获取失败，请刷新页面重试');return}var n=document.getElementById('cf_main_submit');n.disabled=true;n.textContent='提交中...';try{var r=await fetch('/api/comment/add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({articleId:articleId,author:t,content:e,parentId:'root'})});var o=await r.json();if(o.ok===1){alert('评论发布成功！');document.getElementById('cf_main_author').value='';document.getElementById('cf_main_content').value='';loadComments()}else{alert(o.msg||'评论发布失败，请重试')}}catch(t){alert('提交失败：'+t.message)}finally{n.disabled=false;n.textContent='发布评论'}};loadComments();}();<\/script>",//评论区代码
  "widgetOther": "",
  "otherCodeA": "",
  "otherCodeB": "",
  "otherCodeC": "",
  "otherCodeD": "",
  "otherCodeE": "",
  "copyRight" :`Powered by <a href="https://www.cloudflare.com">CF Workers</a> & <a href="https://blog.s3m-soft.cc.cd">CF-Blog </a>`,//自定义版权信息,建议保留大公无私的 Coudflare 和 作者 的链接
  "robots": "User-agent: *\nDisallow: /admin",
  "faviconURL": "https://blog.s3m-soft.cc.cd/favicon.ico"
};

// TiDB Cloud Serverless HTTP连接函数
async function tidbQuery(sql, args) {
  const TIDB_URL = typeof TIDB_DATABASE_URL !== 'undefined' ? TIDB_DATABASE_URL : '';
  if (!TIDB_URL) throw new Error('TiDB未配置');
  const urlObj = new URL(TIDB_URL.replace('mysql://','http://'));
  const host = urlObj.hostname;
  const username = decodeURIComponent(urlObj.username);
  const password = decodeURIComponent(urlObj.password);
  const database = decodeURIComponent(urlObj.pathname.slice(1)) || 'test';
  let finalSql = sql;
  if (args && args.length > 0) {
    args.forEach(arg => {
      const val = typeof arg === 'string' ? "'" + arg.replace(/'/g, "\\'") + "'" : String(arg);
      finalSql = finalSql.replace('?', val);
    });
  }
  const endpoint = 'https://http-' + host + '/v1beta/sql';
  const auth = btoa(username + ':' + password);
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth,
      'TiDB-Database': database
    },
    body: JSON.stringify({ query: finalSql })
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: resp.statusText }));
    throw new Error('TiDB错误: ' + (err.message || resp.status));
  }
  const data = await resp.json();
  if (data.types && data.rows) {
    var fields = data.types.map(function(t) { return t.name; });
    data.rows = data.rows.map(function(row) {
      var obj = {};
      fields.forEach(function(f, i) { obj[f] = row[i]; });
      return obj;
    });
  }
  return data;
}

// 统一CORS响应头
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};

// 评论KV操作函数
async function commentGet(key, parseJson = false) {
  try {
    let value = await CFCOMMENT.get(key);
    if (!parseJson) return value ?? "[]";
    try { return value ? JSON.parse(value) : []; } catch { return []; }
  } catch (err) {
    console.error("KV读取失败:", err);
    throw new Error("评论数据读取失败");
  }
}
async function commentPut(key, value) {
  try {
    if (typeof value === "object") value = JSON.stringify(value);
    await CFCOMMENT.put(key, value);
    return true;
  } catch (err) {
    console.error("KV写入失败:", err);
    throw new Error("评论数据保存失败");
  }
}

// 生成唯一评论ID
function generateCommentId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// 递归补全评论ID（兼容旧数据核心逻辑）
function fillCommentIds(commentList) {
  let hasNewId = false;
  function recursiveFill(list) {
    list.forEach(comment => {
      if (!comment.id) {
        comment.id = generateCommentId();
        hasNewId = true;
      }
      if (comment.replies && comment.replies.length > 0) {
        recursiveFill(comment.replies);
      }
    });
  }
  recursiveFill(commentList);
  return { commentList, hasNewId };
}

// 递归查找父评论
function findCommentById(commentTree, commentId) {
  for (const comment of commentTree) {
    if (comment.id === commentId) return comment;
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentById(comment.replies, commentId);
      if (found) return found;
    }
  }
  return null;
}

// 获取文章评论（自动兼容旧数据，补全ID）
async function getComments(articleId) {
  const key = "COMMENT_" + articleId;
  let commentList = await commentGet(key, true);
  // 自动给旧数据补全ID，并回写KV
  const { commentList: newList, hasNewId } = fillCommentIds(commentList);
  if (hasNewId) await commentPut(key, newList);
  return newList;
}

// 添加评论/追评
async function addComment(articleId, author, content, parentId) {
  if (!articleId || !author || !content) throw new Error("评论参数不全");
  const key = "COMMENT_" + articleId;
  let commentTree = await getComments(articleId); // 先读取并补全ID
  const newComment = {
    id: generateCommentId(),
    author: author,
    content: content,
    time: new Date().toISOString(), // 【核心修复1】存标准ISO时间（UTC），前端自动转本地
    replies: []
  };

  // 根评论
  if (parentId === "root") {
    commentTree.unshift(newComment);
  } 
  // 子追评
  else {
    const parentComment = findCommentById(commentTree, parentId);
    if (!parentComment) throw new Error("目标评论不存在，无法回复");
    if (!parentComment.replies) parentComment.replies = [];
    parentComment.replies.unshift(newComment);
  }

  await commentPut(key, commentTree);
  return true;
}

// 博客核心逻辑
!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";const n=r(2);async function a(t,e,r){e=decodeURI(e);let a=await g("index"),s=await l("SYSTEM_VALUE_WidgetMenu",!0),o=await l("SYSTEM_VALUE_WidgetCategory",!0),c=await l("SYSTEM_VALUE_WidgetTags",!0),u=await l("SYSTEM_VALUE_WidgetLink",!0),p=(await l("SYSTEM_INDEX_LIST",!0)).slice(0,OPT.recentlySize);for(var h=0;h<p.length;h++)p[h].createDate10=p[h].createDate.substr(0,10),p[h].url="/article/"+p[h].id+"/"+p[h].link+".html";let f=await i(e,r),d=f[0],w=f[1];for(h=0;h<d.length;h++)d[h].createDate10=d[h].createDate.substr(0,10),d[h].createDateYear=d[h].createDate.substr(0,4),d[h].createDateMonth=d[h].createDate.substr(5,7),d[h].createDateDay=d[h].createDate.substr(8,10),d[h].contentLength=d[h].contentText.length,d[h].url="/article/"+d[h].id+"/"+d[h].link+".html";let y=[{title:"上一页",url:"/"+t+"/"+e+"/"+(r-1)}];1==r&&(y=[]);let m=[{title:"下一页",url:"/"+t+"/"+e+"/"+(r+1)}];w&&(m=[]);let S=e+" - "+OPT.siteName,T=e,v={};v.widgetMenuList=s,v.widgetCategoryList=o,v.widgetTagsList=c,v.widgetLinkList=u,v.widgetRecentlyList=p,v.articleList=d,v.pageNewer=y,v.pageOlder=m,v.title=S,v.keyWords=T;let O=Object.assign({},OPT);return O.password="",O.user="",O.cacheToken="",O.cacheZoneId="",v.OPT=O,n.render(a,v)}async function i(t,e,r=OPT.pageSize){t=decodeURI(t),console.log("进入函数: getKVArticleCategory",t,e,r),e=e<=1?1:e;let n=await l("SYSTEM_INDEX_LIST",!0),a=[];for(var i=0,s=n.length;i<s;i++)(n[i].tags.indexOf(t)>-1||n[i].category.indexOf(t)>-1)&&a.push(n[i]);a=p(a,"id");let o=!(a.length>r*e),c=[];for(i=(e-1)*r,s=Math.min(e*r,a.length);i<s;i++)c.push(a[i]);return c=p(c,"id"),[c,o]}async function s(t){t=("00000"+parseInt(t)).substr(-6);let e=await l("SYSTEM_INDEX_LIST",!0),r=-1;for(var n=0,a=e.length;n<a;n++)if(e[n].id==t){r=n;break}let i=await l(t,!0);return null==i||0===i.length?[void 0,void 0,void 0]:[e[r-1],i,e[r+1]]}async function o(t,e=OPT.pageSize){t=t<=1?1:t;let r=await l("SYSTEM_INDEX_LIST",!0),n=!(r.length>e*t),a=[];for(var i=(t-1)*e,s=Math.min(t*e,r.length);i<s;i++)a.push(r[i]);return a=p(a,"id"),[a,n]}async function l(t,e=!1){console.log("------------KV读取---------------------:",t,e);let r=await CFBLOG.get(t);if(!e)return null==r?"[]":r;try{return null==r?[]:JSON.parse(r)}catch(t){return[]}}async function c(t,e){return null!=e&&null!=e&&("object"==typeof e&&(e=JSON.stringify(e)),await CFBLOG.put(t,e))}function u(t){return t>=0&&t<=9?"0"+t:t}async function g(t){return t=t.replace(".html",""),(await fetch(OPT.themeURL+t+".html",{cf:{cacheTtl:600}})).text()}function p(t,e,r=!0){return t.sort((function(t,n){var a=t[e],i=n[e];return r?a>i?-1:a<i?1:0:a<i?-1:a>i?1:0}))}function h(t){if("string"==typeof t)try{var e=JSON.parse(t);return!("object"!=typeof e||!e)}catch(t){return!1}return!("object"!=typeof t||!t)}async function f(t){const{headers:e}=t,r=e.get("content-type")||"";if(r.includes("application/json")){let e=JSON.stringify(await t.json()),r=JSON.parse(e),a={category:[]};for(var n=0;n<r.length;n++)"tags"==r[n].name?a[r[n].name]=r[n].value.split(","):r[n].name.includes("category")?a.category.push(r[n].value):a[r[n].name]=r[n].value;return a}if(r.includes("application/text"))return await t.text();if(r.includes("text/html"))return await t.text();if(r.includes("form")){const e=await t.formData(),r={};for(const t of e.entries())r[t[0]]=t[1];return JSON.stringify(r)}{const e=await t.blob();return URL.createObjectURL(e)}}

// 主请求入口
addEventListener("fetch",t=>{t.respondWith(async function(t){
  const e=t.request,r=new URL(t.request.url);
  const path=r.pathname;
  const method=e.method;

  // 处理OPTIONS预检请求（解决跨域问题）
  if(method==="OPTIONS"){
    return new Response(null,{headers:CORS_HEADERS,status:204});
  }

  // 评论接口：获取评论列表
  if(method==="GET" && path.startsWith("/api/comments/")){
    try{
      const articleId=path.split("/")[3];
      if(!articleId) throw new Error("文章ID不存在");
      const list=await getComments(articleId);
      return new Response(JSON.stringify(list),{headers:CORS_HEADERS,status:200});
    }catch(err){
      console.error("获取评论失败:",err);
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:400});
    }
  }

  // 评论接口：添加评论/回复
  if(method==="POST" && path==="/api/comment/add"){
    try{
      const body=await e.json();
      const{articleId,author,content,parentId}=body;
      await addComment(articleId,author,content,parentId);
      return new Response(JSON.stringify({ok:1}),{headers:CORS_HEADERS,status:200});
    }catch(err){
      console.error("添加评论失败:",err);
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:400});
    }
  }

  // 搜索接口：全文关键词搜索
  if(method==="GET" && path.startsWith("/api/search")){
    try{
      const keyword=(r.searchParams.get("q")||"").trim().toLowerCase();
      if(!keyword) return new Response(JSON.stringify([]),{headers:CORS_HEADERS,status:200});
      const indexList=await(async()=>{let r=await CFBLOG.get("SYSTEM_INDEX_LIST");try{return r?JSON.parse(r):[]}catch{return[]}})();
      const results=[];
      for(const item of indexList){
        const titleMatch=(item.title||"").toLowerCase().includes(keyword);
        const textMatch=(item.contentText||"").toLowerCase().includes(keyword);
        const tagMatch=(item.tags||[]).some(t=>t.toLowerCase().includes(keyword));
        const catMatch=(item.category||[]).some(c=>c.toLowerCase().includes(keyword));
        if(titleMatch||textMatch||tagMatch||catMatch){
          results.push({
            id:item.id,
            title:item.title,
            contentText:(item.contentText||"").substring(0,200),
            createDate:item.createDate,
            url:"/article/"+item.id+"/"+item.link+".html",
            img:item.img||""
          });
        }
      }
      return new Response(JSON.stringify(results),{headers:CORS_HEADERS,status:200});
    }catch(err){
      console.error("搜索失败:",err);
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:500});
    }
  }

  // 文章密码验证接口
  if(method==="POST" && path==="/api/article/verify-password"){
    try{
      const body=await e.json();
      const{articleId,password:inputPwd}=body;
      if(!articleId||!inputPwd) throw new Error("参数不全");
      const article=await(async()=>{let r=await CFBLOG.get(("00000"+parseInt(articleId)).substr(-6));try{return r?JSON.parse(r):null}catch{return null}})();
      if(!article) throw new Error("文章不存在");
      if(!article.articlePassword) throw new Error("该文章未设置密码保护");
      if(inputPwd!==article.articlePassword) throw new Error("密码错误");
      return new Response(JSON.stringify({ok:1}),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:200});
    }
  }

  // 获取单篇文章数据API（admin用）
  if(method==="GET" && path.startsWith("/api/article/")){
    try{
      const aid=path.split("/")[3];
      if(!aid) return new Response(JSON.stringify(null),{headers:CORS_HEADERS,status:400});
      let raw=await CFBLOG.get(aid);
      if(!raw) return new Response(JSON.stringify(null),{headers:CORS_HEADERS,status:404});
      let article=JSON.parse(raw);
      return new Response(JSON.stringify(article),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify(null),{headers:CORS_HEADERS,status:500});
    }
  }

  // 获取分类列表API（admin用）
  if(method==="GET" && path==="/api/categories"){
    try{
      let raw=await CFBLOG.get("SYSTEM_VALUE_WidgetCategory");
      let data=raw?JSON.parse(raw):[];
      return new Response(JSON.stringify(data),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify([]),{headers:CORS_HEADERS,status:500});
    }
  }

  // 查询文章附件列表（公开API）
  if(method==="GET" && path.startsWith("/api/attachments/")){
    try{
      const articleId=path.split("/")[3];
      if(!articleId) return new Response(JSON.stringify([]),{headers:CORS_HEADERS,status:200});
      const result=await tidbQuery("SELECT id,filename,content_type,created_at FROM uploads WHERE article_id=?",[articleId]);
      const files=(result.rows||[]).map(function(r){return{id:r.id,filename:r.filename,type:r.content_type,url:"/admin/file/FILE_"+r.id}});
      return new Response(JSON.stringify(files),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify([]),{headers:CORS_HEADERS,status:200});
    }
  }

  // TiDB附件下载路由（公开访问，无需鉴权）
  if(method==="GET" && path.startsWith("/admin/file/")){
    try{
      const fileParam=path.replace("/admin/file/","");
      const fileId=parseInt(fileParam.replace("FILE_",""));
      if(isNaN(fileId)) return new Response("Not Found",{status:404});
      const result=await tidbQuery("SELECT filename,content_type,data FROM uploads WHERE id=?",[String(fileId)]);
      if(!result.rows||result.rows.length===0) return new Response("Not Found",{status:404});
      const row=result.rows[0];
      const hexStr=row.data;
      const bytes=new Uint8Array(hexStr.length/2);
      for(let j=0;j<hexStr.length;j+=2) bytes[j/2]=parseInt(hexStr.substr(j,2),16);
      const headers=new Headers();
      headers.set("Content-Type",row.content_type||"application/octet-stream");
      headers.set("Cache-Control","public, max-age=86400");
      return new Response(bytes,{headers,status:200});
    }catch(err){
      return new Response("Error",{status:500});
    }
  }

  // 原有博客鉴权逻辑
  null==OPT.privateBlog&&(OPT.privateBlog=!1);
  let i=r.pathname.trim("/").split("/");
  if(("admin"===i[0]||!0===OPT.privateBlog)&&!function(t){const e=t.headers.get("Authorization");if(!e||!/^Basic [A-Za-z0-9._~+/-]+=*$/i.test(e))return!1;const[r,n]=function(t){try{return atob(t.split(" ").pop()).split(":")}catch(t){return[]}}(e);return console.log("-----parseBasicAuth----- ",r,n),r===OPT.user&&n===OPT.password}(t.request))return new Response("Unauthorized",{headers:{"WWW-Authenticate":'Basic realm="cfblog"',"Access-Control-Allow-Origin":"*"},status:401});
  
  // TiDB附件上传接口（已通过admin鉴权）
  if(method==="POST" && path==="/admin/upload"){
    try{
      const formData=await e.formData();
      const file=formData.get("file");
      const articleId=formData.get("articleId")||"";
      if(!file) throw new Error("未选择文件");
      if(file.size>20*1024*1024) throw new Error("文件不能超过20MB");
      const arrayBuf=await file.arrayBuffer();
      const uint8=new Uint8Array(arrayBuf);
      const hexData=Array.from(uint8).map(b=>('0'+b.toString(16)).slice(-2)).join('');
      const result=await tidbQuery("INSERT INTO uploads (filename,content_type,data,article_id) VALUES (?,?,UNHEX(?),?)",[file.name,file.type||"application/octet-stream",hexData,articleId]);
      const insertId=result.sLastInsertID||result.lastInsertId;
      const publicURL="/admin/file/FILE_"+insertId;
      return new Response(JSON.stringify({ok:1,url:publicURL,key:"FILE_"+insertId,name:file.name}),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:400});
    }
  }

  // TiDB附件删除接口（已通过admin鉴权）
  if(method==="POST" && path==="/admin/upload/delete"){
    try{
      const body=await e.json();
      const fileId=body.id;
      if(!fileId) throw new Error("缺少文件id");
      await tidbQuery("DELETE FROM uploads WHERE id=?",[String(fileId)]);
      return new Response(JSON.stringify({ok:1}),{headers:CORS_HEADERS,status:200});
    }catch(err){
      return new Response(JSON.stringify({ok:0,msg:err.message}),{headers:CORS_HEADERS,status:400});
    }
  }
  
  // 原有博客导出逻辑
  if("admin"===i[0]&&"export"===i[1]){console.log("开始导出");let t=await async function t(e=[],r="",n=1){const a=await CFBLOG.list({limit:n,cursor:r});if(!1 in a)return{};if(e=e.concat(a.keys),console.log("导出: ",typeof a,JSON.stringify(a)),a.list_complete){let t={OPT:OPT};for(let r=0;r<e.length;++r){const n=await CFBLOG.get(e[r].name);null!=n&&(t[e[r].name]=h(n)?JSON.parse(n):n)}return t}return await t(e,a.cursor,n)}();return new Response(JSON.stringify(t),{headers:{"content-type":"application/octet-stream;charset=utf-8","Content-Disposition":"attachment; filename=cfblog-"+(d=new Date,w=u(d.getMonth()+1),y=u(d.getDate()),m=u(d.getHours()),S=u(d.getMinutes()),T=u(d.getSeconds()),v=d.getFullYear()+"-"+w+"-"+y+"T"+m+":"+S+":"+T,v+".json")}})}var d,w,y,m,S,T,v;console.log(r.pathname);let O=r.searchParams.get("theme"),E=r.searchParams.get("pageSize");O&&(OPT.themeURL="https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/"+O+"/");E&&(OPT.pageSize=parseInt(E));"https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/default/"==OPT.themeURL&&(OPT.themeURL="https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/default2.0/");if(console.log("theme pageSize",OPT.pageSize,OPT.themeURL),"/robots.txt"==r.pathname)return new Response(OPT.robots+"\nSitemap: https://"+OPT.siteDomain+"/sitemap.xml",{headers:{"content-type":"text/plain;charset=UTF-8"},status:200});if("/favicon.ico"==r.pathname){if(OPT.faviconURL&&OPT.faviconURL.length>5){try{const faviconResp=await fetch(OPT.faviconURL,{cf:{cacheTtl:86400}});return new Response(faviconResp.body,{headers:{"content-type":faviconResp.headers.get("content-type")||"image/x-icon","Cache-Control":"public, max-age=86400"},status:200})}catch{return new Response("404",{headers:{"content-type":"text/plain"},status:404})}}return new Response("404",{headers:{"content-type":"text/plain;charset=UTF-8"},status:404});}let _="",b="",L="";0==i.length||""==i[0]?(_="page",b="1"):(_=i[0],b=void 0===i[1]?1:i[1],L=void 0===i[2]?1:i[2]);const D=caches.default,M="https://"+OPT.siteDomain+"/"+_+"/"+b+"/"+L,x=new Request(M,e);console.log("cacheFullPath:",M);let k=await D.match(x);if(k)return k;if("sitemap.xml"==_)k=new Response(await async function(){console.log("进入函数 getSiteMap");let t=await l("SYSTEM_INDEX_LIST",!0),e='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';for(var r=0,n=t.length;r<n;r++)e+="\n\t<url>",e+="\n\t\t<loc>https://"+OPT.siteDomain+"/article/"+t[r].id+"/"+t[r].link+".html</loc>",e+="\n\t\t<lastmod>"+t[r].createDate.substr(0,10)+"</lastmod>",e+="\n\t\t<changefreq>"+(void 0===t[r].changefreq?"daily":t[r].changefreq)+"</changefreq>",e+="\n\t\t<priority>"+(void 0===t[r].priority?"0.5":t[r].priority)+"</priority>",e+="\n\t</url>";return e+="\n</urlset>",e}(),{headers:{"content-type":"text/xml;charset=UTF-8"},status:200});else{let e=await async function(t){let e=new URL(t.url).pathname.trim("/").split("/"),r="",i="",u="";0==e.length||""==e[0]?(r="page",i="1"):(r=e[0],i=void 0===e[1]?1:e[1],u=void 0===e[2]?1:e[2]);if("page"==r&&parseInt(i)>0)return await async function(t,e){let r=await g("index"),a=await l("SYSTEM_VALUE_WidgetMenu",!0),i=await l("SYSTEM_VALUE_WidgetCategory",!0),s=await l("SYSTEM_VALUE_WidgetTags",!0),o=await l("SYSTEM_VALUE_WidgetLink",!0),c=await l("SYSTEM_INDEX_LIST",!0),u=c.slice(0,OPT.recentlySize);for(var p=0;p<u.length;p++)u[p].createDate10=u[p].createDate.substr(0,10),u[p].url="/article/"+u[p].id+"/"+u[p].link+".html";let h=c.slice((e-1)*OPT.pageSize,e*OPT.pageSize);for(p=0;p<h.length;p++)h[p].createDate10=h[p].createDate.substr(0,10),h[p].createDateYear=h[p].createDate.substr(0,4),h[p].createDateMonth=h[p].createDate.substr(5,7),h[p].createDateDay=h[p].createDate.substr(8,10),h[p].contentLength=h[p].contentText.length,h[p].url="/article/"+h[p].id+"/"+h[p].link+".html";let f=[{title:"上一页",url:"/page/"+(e-1)}];1==e&&(f=[]);let d=[{title:"下一页",url:"/page/"+(e+1)}];e*OPT.pageSize>=c.length&&(d=[]);let w=(e>1?"page "+e+" - ":"")+OPT.siteName,y=OPT.keyWords,m={};m.widgetMenuList=a,m.widgetCategoryList=i,m.widgetTagsList=s,m.widgetLinkList=o,m.widgetRecentlyList=u,m.articleList=h,m.pageNewer=f,m.pageOlder=d,m.title=w,m.keyWords=y;let S=Object.assign({},OPT);return S.password="",S.user="",S.cacheToken="",S.cacheZoneId="",m.OPT=S,n.render(r,m)}(0,parseInt(i));if("category"==r&&i.length>0)return await a(r,i,parseInt(u));if("tags"==r&&i.length>0)return await a(r,i,parseInt(u));if("article"==r&&i.length>0)return await async function(t,e,r){let a=await g("article"),i=await l("SYSTEM_VALUE_WidgetMenu",!0),o=await l("SYSTEM_VALUE_WidgetCategory",!0),c=await l("SYSTEM_VALUE_WidgetTags",!0),u=await l("SYSTEM_VALUE_WidgetLink",!0),p=(await l("SYSTEM_INDEX_LIST",!0)).slice(0,OPT.recentlySize);for(var h=0;h<p.length;h++)p[h].createDate10=p[h].createDate.substr(0,10),p[h].url="/article/"+p[h].id+"/"+(void 0===p[h].link?"detail":p[h].link)+".html";let f=await s(e);for(h=0;h<f.length;h++)f[h]&&(f[h].createDate10=f[h].createDate.substr(0,10),f[h].contentLength=f[h].contentText.length,f[h].url="/article/"+f[h].id+"/"+(void 0===f[h].link?"detail":f[h].link)+".html");let d=f[1];if(d){d.createDate10=d.createDate.substr(0,10),d.createDateYear=d.createDate.substr(0,4),d.createDateMonth=d.createDate.substr(5,7),d.createDateDay=d.createDate.substr(8,10),d.contentLength=d.contentText.length;}let w=[],y=[];f[0]&&w.push(f[0]);f[2]&&y.push(f[2]);let m=d.title+" - "+OPT.siteName,S=d.tags.concat(d.category).join(","),T={};T.widgetMenuList=i,T.widgetCategoryList=o,T.widgetTagsList=c,T.widgetLinkList=u,T.widgetRecentlyList=p,T.articleSingle=d,T.articleNewer=w,T.articleOlder=y,T.title=m,T.keyWords=S;let v=Object.assign({},OPT);return v.password="",v.user="",v.cacheToken="",v.cacheZoneId="",T.OPT=v,n.render(a,T)}(0,i);if("search"==r)return await async function(t,e){let r=await g("search"),a=await l("SYSTEM_VALUE_WidgetMenu",!0),i=await l("SYSTEM_VALUE_WidgetCategory",!0),s=await l("SYSTEM_VALUE_WidgetTags",!0),o=await l("SYSTEM_VALUE_WidgetLink",!0),c=(await l("SYSTEM_INDEX_LIST",!0)).slice(0,OPT.recentlySize);for(var u=0;u<c.length;u++)c[u].createDate10=c[u].createDate.substr(0,10),c[u].url="/article/"+c[u].id+"/"+c[u].link+".html";let p={title:"搜索 - "+OPT.siteName,keyWords:OPT.keyWords,widgetMenuList:a,widgetCategoryList:i,widgetTagsList:s,widgetLinkList:o,widgetRecentlyList:c,articleList:[]},h=Object.assign({},OPT);return h.password="",h.user="",h.cacheToken="",h.cacheZoneId="",p.OPT=h,n.render(r,p)}(0,i);return"admin"!=r?OPT.html404:await async function(t,e){new URL(t.url);if(1==e.length||"list"==e[1]){let t=await g("admin/index"),e=await l("SYSTEM_VALUE_WidgetCategory",!0),r=await l("SYSTEM_VALUE_WidgetMenu",!0),n=await l("SYSTEM_VALUE_WidgetLink",!0);return t.r("categoryJson",JSON.stringify(e)).r("menuJson",JSON.stringify(r)).r("linkJson",JSON.stringify(n))}if("publish"==e[1]){let t=await l("SYSTEM_INDEX_LIST",!0),e=[];for(var r=0;r<t.length;r++)if("object"==typeof t[r].tags)for(var n=0;n<t[r].tags.length;n++)-1==e.indexOf(t[r].tags[n])&&e.push(t[r].tags[n]);return await c("SYSTEM_VALUE_WidgetTags",JSON.stringify(e)),await async function(t=OPT.cacheZoneId,e=OPT.cacheToken){if(null==t||null==e||t.length<5||e.length<5)return!1;let r=await fetch(`https://api.cloudflare.com/client/v4/zones/${t}/purge_cache`,{method:"POST",headers:{Authorization:"Bearer "+e,"Content-Type":"application/json"},body:'{"purge_everything":true}'});return(await r.json()).success}()?'{"msg":"published ,purge Cache true","rst":true}':'{"msg":"published ,buuuuuuuuuuuut purge Cache false !!!!!!","rst":true}'}if("getList"==e[1]){let t=void 0===e[2]?1:parseInt(e[2]),r=await o(t,20);return JSON.stringify(r[0])}if("edit"==e[1]){let t=e[2],r=await g("admin/edit"),n=await l("SYSTEM_VALUE_WidgetCategory"),a=await l(t);return r.r("categoryJson",n).r("articleJson",a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replaceAll("script>","script＞"))}if("saveConfig"==e[1]){const e=await f(t);let r=e.WidgetCategory,n=e.WidgetMenu,a=e.WidgetLink;return h(r)&&h(n)?(await c("SYSTEM_VALUE_WidgetCategory",r),await c("SYSTEM_VALUE_WidgetMenu",n),await c("SYSTEM_VALUE_WidgetLink",a),'{"msg":"saved","rst":true}'):'{"msg":"Not a JSON object","rst":false}'}if("import"==e[1]){let e=(await f(t)).importJson;if(console.log("开始导入",typeof e),h(e)){let t=JSON.parse(e),r=Object.keys(t);for(let e=0;e<r.length;++e)console.log(r[e],t[r[e]]),await c(r[e],t[r[e]]);return'{"msg":"import success!","rst":true}'}return'{"msg":" importJson Not a JSON object","rst":false}'}if("saveAddNew"==e[1]){const e=await f(t);let r=e.title,n=e.img,a=e.link,i=e.createDate,s=e.category,o=e.tags,u=void 0===e.priority?"0.5":e.priority,g=void 0===e.changefreq?"daily":e.changefreq,h=e["content-markdown-doc"],d=e["content-html-code"],w="",y="";if(r.length>0&&i.length>0&&s.length>0&&h.length>0&&d.length>0){y=await async function(){let t=await l("SYSTEM_INDEX_NUM");return""===t||null===t||"[]"===t||void 0===t?(await c("SYSTEM_INDEX_NUM",1),"000001"):(await c("SYSTEM_INDEX_NUM",parseInt(t)+1),("00000"+(parseInt(t)+1)).substr(-6))}(),w=d.replace(/<\/?[^>]*>/g,"").trim().substring(0,OPT.readMoreLength);let t={id:y,title:r,img:n,link:a,createDate:i,category:s,tags:o,contentMD:h,contentHtml:d,contentText:w,priority:u,changefreq:g,articlePassword:e.articlePassword||""};await c(y,JSON.stringify(t));let E={id:y,title:r,img:n,link:a,createDate:i,category:s,tags:o,contentText:w,priority:u,changefreq:g},f=await l("SYSTEM_INDEX_LIST",!0),m=[];return m.push(E),m=m.concat(f),m=p(m,"id"),await c("SYSTEM_INDEX_LIST",JSON.stringify(m)),'{"msg":"added OK","rst":true,"id":"'+y+'"}'}return'{"msg":"信息不全","rst":false}'}if("delete"==e[1]){let t=e[2];if(6==t.length){await CFBLOG.delete(t);try { await CFCOMMENT.delete("COMMENT_" + t); } catch (_) {}let e=await l("SYSTEM_INDEX_LIST",!0);for(r=0;r<e.length;r++)t==e[r].id&&e.splice(r,1);return await c("SYSTEM_INDEX_LIST",JSON.stringify(e)),'{"msg":"Delete ('+t+')  OK","rst":true,"id":"'+t+'"}'}return'{"msg":"Delete  false ","rst":false,"id":"'+t+'"}'}if("saveEdit"==e[1]){const e=await f(t);let n=e.title,a=e.img,i=e.link,s=e.createDate,o=e.category,u=e.tags,g=e["content-markdown-doc"],h=e["content-html-code"],d=void 0===e.priority?"0.5":e.priority,w=void 0===e.changefreq?"daily":e.changefreq,y="",m=e.id;if(n.length>0&&s.length>0&&o.length>0&&g.length>0&&h.length>0){y=h.replace(/<\/?[^>]*>/g,"").trim().substring(0,OPT.readMoreLength);let t={id:m,title:n,img:a,link:i,createDate:s,category:o,tags:u,contentMD:g,contentHtml:h,contentText:y,priority:d,changefreq:w,articlePassword:e.articlePassword||""};await c(m,JSON.stringify(t));let E={id:m,title:n,img:a,link:i,createDate:s,category:o,tags:u,contentText:y,priority:d,changefreq:w},f=await l("SYSTEM_INDEX_LIST",!0);for(r=0;r<f.length;r++)m==f[r].id&&f.splice(r,1);return f.push(E),f=p(f,"id"),await c("SYSTEM_INDEX_LIST",JSON.stringify(f)),'{"msg":"Edit OK","rst":true,"id":"'+m+'"}'}return'{"msg":"信息不全","rst":false}'}return'{"msg":"some errors","rst":false}'}(t,e);return OPT.html404}(t.request);k=new Response(e,{headers:{"content-type":"text/html;charset=UTF-8"},status:200})}"admin"==_?k.headers.set("Cache-Control","no-store"):(k.headers.set("Cache-Control","public, max-age="+OPT.cacheTime),t.waitUntil(D.put(M,k.clone())));return k}(t))}),String.prototype.trim=function(t){return t?this.replace(new RegExp("^\\"+t+"+|\\"+t+"+$","g"),""):this.replace(/^\s+|\s+$/g,"")},String.prototype.r=function(t,e){return null!=e&&(e=e.replace(new RegExp("[$]","g"),"$$$$")),this.replace(new RegExp("\x3c!--{"+t+"}--\x3e","g"),e)},String.prototype.replaceAll=function(t,e){return this.replace(new RegExp(t,"g"),e)}},function(t,e,r){t.exports=function(){"use strict";var t=Object.prototype.toString,e=Array.isArray||function(e){return"[object Array]"===t.call(e)};function r(t){return"function"==typeof t}function n(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function a(t,e){return null!=t&&"object"==typeof t&&e in t}var i=RegExp.prototype.test,s=/\S/;function o(t){return!function(t,e){return i.call(t,e)}(s,t)}var l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},c=/\s*/,u=/\s+/,g=/\s*=/,p=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function f(t){this.string=t,this.tail=t,this.pos=0}function d(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function w(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}f.prototype.eos=function(){return""===this.tail},f.prototype.scan=function(t){var e=this.tail.match(t);if(!e||0!==e.index)return"";var r=e[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r},f.prototype.scanUntil=function(t){var e,r=this.tail.search(t);switch(r){case-1:e=this.tail,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=e.length,e},d.prototype.push=function(t){return new d(t,this)},d.prototype.lookup=function(t){var e,n,i,s=this.cache;if(s.hasOwnProperty(t))e=s[t];else{for(var o,l,c,u=this,g=!1;u;){if(t.indexOf(".")>0)for(o=u.view,l=t.split("."),c=0;null!=o&&c<l.length;)c===l.length-1&&(g=a(o,l[c])||(n=o,i=l[c],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(i))),o=o[l[c++]];else o=u.view[t],g=a(u.view,t);if(g){e=o;break}u=u.parent}s[t]=e}return r(e)&&(e=e.call(this.view)),e},w.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},w.prototype.parse=function(t,r){var a=this.templateCache,i=t+":"+(r||y.tags).join(":"),s=void 0!==a,l=s?a.get(i):void 0;return null==l&&(l=function(t,r){if(!t)return[];var a,i,s,l=!1,d=[],w=[],m=[],S=!1,T=!1,v="",O=0;function E(){if(S&&!T)for(;m.length;)delete w[m.pop()];else m=[];S=!1,T=!1}function _(t){if("string"==typeof t&&(t=t.split(u,2)),!e(t)||2!==t.length)throw new Error("Invalid tags: "+t);a=new RegExp(n(t[0])+"\\s*"),i=new RegExp("\\s*"+n(t[1])),s=new RegExp("\\s*"+n("}"+t[1]))}_(r||y.tags);for(var b,L,D,M,x,k,P=new f(t);!P.eos();){if(b=P.pos,D=P.scanUntil(a))for(var U=0,N=D.length;U<N;++U)o(M=D.charAt(U))?(m.push(w.length),v+=M):(T=!0,l=!0,v+=" "),w.push(["text",M,b,b+1]),b+=1,"\n"===M&&(E(),v="",O=0,l=!1);if(!P.scan(a))break;if(S=!0,L=P.scan(h)||"name",P.scan(c),"="===L?(D=P.scanUntil(g),P.scan(g),P.scanUntil(i)):"{"===L?(D=P.scanUntil(s),P.scan(p),P.scanUntil(i),L="&"):D=P.scanUntil(i),!P.scan(i))throw new Error("Unclosed tag at "+P.pos);if(x=">"===L?[L,D,b,P.pos,v,O,l]:[L,D,b,P.pos],O++,w.push(x),"#"===L||"^"===L)d.push(x);else if("/"===L){if(!(k=d.pop()))throw new Error('Unopened section "'+D+'" at '+b);if(k[1]!==D)throw new Error('Unclosed section "'+k[1]+'" at '+b)}else"name"===L||"{"===L||"&"===L?T=!0:"="===L&&_(D)}if(E(),k=d.pop())throw new Error('Unclosed section "'+k[1]+'" at '+P.pos);return function(t){for(var e,r=[],n=r,a=[],i=0,s=t.length;i<s;++i)switch((e=t[i])[0]){case"#":case"^":n.push(e),a.push(e),n=e[4]=[];break;case"/":a.pop()[5]=e[2],n=a.length>0?a[a.length-1][4]:r;break;default:n.push(e)}return r}(function(t){for(var e,r,n=[],a=0,i=t.length;a<i;++a)(e=t[a])&&("text"===e[0]&&r&&"text"===r[0]?(r[1]+=e[1],r[3]=e[3]):(n.push(e),r=e));return n}(w))}(t,r),s&&a.set(i,l)),l},w.prototype.render=function(t,e,r,n){var a=this.getConfigTags(n),i=this.parse(t,a),s=e instanceof d?e:new d(e,void 0);return this.renderTokens(i,s,r,t,n)},w.prototype.renderTokens=function(t,e,r,n,a){for(var i,s,o,l="",c=0,u=t.length;c<u;++c)o=void 0,"#"===(s=(i=t[c])[0])?o=this.renderSection(i,e,r,n,a):"^"===s?o=this.renderInverted(i,e,r,n,a):">"===s?o=this.renderPartial(i,e,r,a):"&"===s?o=this.unescapedValue(i,e):"name"===s?o=this.escapedValue(i,e,a):"text"===s&&(o=this.rawValue(i)),void 0!==o&&(l+=o);return l},w.prototype.renderSection=function(t,n,a,i,s){var o=this,l="",c=n.lookup(t[1]);if(c){if(e(c))for(var u=0,g=c.length;u<g;u++)l+=this.renderTokens(t[4],n.push(c[u]),a,i,s);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)l+=this.renderTokens(t[4],n.push(c),a,i,s);else if(r(c)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(n.view,i.slice(t[3],t[5]),function(t){return o.render(t,n,a,s)}))&&(l+=c)}else l+=this.renderTokens(t[4],n,a,i,s);return l}},w.prototype.renderInverted=function(t,r,n,a,i){var s=r.lookup(t[1]);if(!s||e(s)&&0===s.length)return this.renderTokens(t[4],r,n,a,i)},w.prototype.indentPartial=function(t,e,r){for(var n=e.replace(/[^ \t]/g,""),a=t.split("\n"),i=0;i<a.length;i++)a[i].length&&(i>0||!r)&&(a[i]=n+a[i]);return a.join("\n")},w.prototype.renderPartial=function(t,e,n,a){if(n){var i=this.getConfigTags(a),s=r(n)?n(t[1]):n[t[1]];if(null!=s){var o=t[6],l=t[5],c=t[4],u=s;0==l&&c&&(u=this.indentPartial(s,c,o));var g=this.parse(u,i);return this.renderTokens(g,e,n,u,a)}}},w.prototype.unescapedValue=function(t,e){var r=e.lookup(t[1]);if(null!=r)return r},w.prototype.escapedValue=function(t,e,r){var n=this.getConfigEscape(r)||y.escape,a=e.lookup(t[1]);if(null!=a)return"number"==typeof a&&n===y.escape?String(a):n(a)},w.prototype.rawValue=function(t){return t[1]},w.prototype.getConfigTags=function(t){return e(t)?t:t&&"object"==typeof t?t.tags:void 0},w.prototype.getConfigEscape=function(t){return t&&"object"==typeof t&&!e(t)?t.escape:void 0};var y={name:"mustache.js",version:"4.1.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){m.templateCache=t},get templateCache(){return m.templateCache}},m=new w;return y.clearCache=function(){return m.clearCache()},y.parse=function(t,e){return m.parse(t,e)},y.render=function(t,e,r,n){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+("function"==typeof(i=t)?"function":typeof i)+'" was given as first argument for mustache#render(template, view, partials)');var i;return m.render(t,e,r,n)},y.escape=function(t){return String(t).replace(/[&<>"'`=\/]/g,function(t){return l[t]})},y.Scanner=f,y.Context=d,y.Writer=w,y}()}]);
