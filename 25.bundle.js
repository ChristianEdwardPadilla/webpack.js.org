(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{318:function(e,a,o){"use strict";o.r(a),a.default='<p>Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you <code>import</code> or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or inline images as data URLs. Loaders even allow you to do things like <code>import</code> CSS files directly from your JavaScript modules!</p>\n<h2 id="example">Example<a href="#example" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript. To do this, you would start by installing the loaders you need:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev css-loader\n<span class="token function">npm</span> <span class="token function">install</span> --save-dev ts-loader</code></pre>\n<p>And then instruct webpack to use the <a href="/loaders/css-loader"><code>css-loader</code></a> for every <code>.css</code> file and the <a href="https://github.com/TypeStrong/ts-loader"><code>ts-loader</code></a> for all <code>.ts</code> files:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> test<span class="token punctuation">:</span> <span class="token regex">/\\.css$/</span><span class="token punctuation">,</span> use<span class="token punctuation">:</span> <span class="token string">\'css-loader\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span> test<span class="token punctuation">:</span> <span class="token regex">/\\.ts$/</span><span class="token punctuation">,</span> use<span class="token punctuation">:</span> <span class="token string">\'ts-loader\'</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h2 id="using-loaders">Using Loaders<a href="#using-loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>There are three ways to use loaders in your application:</p>\n<ul>\n<li><a href="#configuration">Configuration</a> (recommended): Specify them in your <strong>webpack.config.js</strong> file.</li>\n<li><a href="#inline">Inline</a>: Specify them explicitly in each <code>import</code> statement.</li>\n<li><a href="#cli">CLI</a>: Specify them within a shell command.</li>\n</ul>\n<h3 id="configuration">Configuration<a href="#configuration" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p><a href="/configuration/module/#module-rules"><code>module.rules</code></a> allows you to specify several loaders within your webpack configuration.\nThis is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.</p>\n<p>Loaders are evaluated/executed from right to left. In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader. See <a href="/concepts/loaders/#loader-features">"Loader Features"</a> for more information about loaders order.</p>\n<pre><code class="hljs language-js-with-links-with-details">module.exports = {\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          { loader: [\'style-loader\'](/loaders/style-loader) },\n          {\n            loader: [\'css-loader\'](/loaders/css-loader),\n            options: {\n              modules: true\n            }\n          },\n          { loader: [\'sass-loader\'](/loaders/sass-loader) }\n        ]\n      }\n    ]\n  }\n};\n</code></pre>\n<h3 id="inline">Inline<a href="#inline" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>It\'s possible to specify loaders in an <code>import</code> statement, or any <a href="/api/module-methods">equivalent "importing" method</a>. Separate loaders from the resource with <code>!</code>. Each part is resolved relative to the current directory.</p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> Styles <span class="token keyword">from</span> <span class="token string">\'style-loader!css-loader?modules!./styles.css\'</span><span class="token punctuation">;</span></code></pre>\n<p>It\'s possible to override any loaders in the configuration by prefixing the entire rule with <code>!</code>.</p>\n<p>Options can be passed with a query parameter, e.g. <code>?key=value&#x26;foo=bar</code>, or a JSON object, e.g. <code>?{"key":"value","foo":"bar"}</code>.</p>\n<blockquote class="tip">\n<p>Use <code>module.rules</code> whenever possible, as this will reduce boilerplate in your source code and allow you to debug or locate a loader faster if something goes south.</p>\n</blockquote>\n<h3 id="cli">CLI<a href="#cli" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>You can also use loaders through the CLI:</p>\n<pre><code class="hljs language-bash">webpack --module-bind jade-loader --module-bind <span class="token string">\'css=style-loader!css-loader\'</span></code></pre>\n<p>This uses the <code>jade-loader</code> for <code>.jade</code> files, and the <a href="/loaders/style-loader"><code>style-loader</code></a> and <a href="/loaders/css-loader"><code>css-loader</code></a> for <code>.css</code> files.</p>\n<h2 id="loader-features">Loader Features<a href="#loader-features" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<ul>\n<li>Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain.</li>\n<li>Loaders can be synchronous or asynchronous.</li>\n<li>Loaders run in Node.js and can do everything that’s possible there.</li>\n<li>Loaders can be configured with an <code>options</code> object (using <code>query</code> parameters to set options is still supported but has been deprecated).</li>\n<li>Normal modules can export a loader in addition to the normal <code>main</code> via <code>package.json</code> with the <code>loader</code> field.</li>\n<li>Plugins can give loaders more features.</li>\n<li>Loaders can emit additional arbitrary files.</li>\n</ul>\n<p>Loaders allow more power in the JavaScript ecosystem through preprocessing\nfunctions (loaders). Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and <a href="/loaders">more</a>.</p>\n<h2 id="resolving-loaders">Resolving Loaders<a href="#resolving-loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Loaders follow the standard <a href="/concepts/module-resolution/">module resolution</a>. In most cases it will be loaded from the <a href="/concepts/module-resolution/#module-paths">module path</a> (think <code>npm install</code>, <code>node_modules</code>).</p>\n<p>A loader module is expected to export a function and be written in Node.js compatible JavaScript. They are most commonly managed with npm, but you can also have custom loaders as files within your application. By convention, loaders are usually named <code>xxx-loader</code> (e.g. <code>json-loader</code>). See <a href="/development/how-to-write-a-loader">"How to Write a Loader?"</a> for more information.</p>\n'}}]);