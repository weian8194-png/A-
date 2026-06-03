/**
 * A 股投资看板 — 本地服务器
 * 功能：静态文件服务 + 腾讯行情API代理（解决跨域）
 *
 * 启动: node server.js
 * 访问: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const STATIC_DIR = __dirname;

// MIME 类型映射
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/**
 * 腾讯免费行情 API
 * 格式: https://qt.gtimg.cn/q=sh601899,sz000975
 * 返回: v_sh601899="1~紫金矿业~601899~31.55~..."
 * 字段索引: 0=市场,1=名称,2=代码,3=当前价,4=昨收,5=开盘,...
 */
const GTIM_BASE = 'http://qt.gtimg.cn/q=';

/** 将股票代码转为腾讯API格式 */
function toTencentCode(code) {
  code = code.trim();
  // 6开头的上海, 0/3开头的深圳
  if (code.startsWith('6') || code.startsWith('9')) return 'sh' + code;
  if (code.startsWith('0') || code.startsWith('3') || code.startsWith('2')) return 'sz' + code;
  // 基金/ETF
  if (code.startsWith('159') || code.startsWith('16')) return 'sz' + code;
  return 'sh' + code;
}

/** 解析腾讯API返回的文本行 */
function parseGtimLine(line) {
  // v_sh601899="1~紫金矿业~601899~31.55~31.58~31.20~31.65~..."
  const match = line.match(/^v_(\w+)="([^"]+)"/);
  if (!match) return null;
  const fields = match[2].split('~');
  return {
    code: match[1].replace(/^(sh|sz)/, ''),
    name: fields[1],
    price: parseFloat(fields[3]) || 0,
    yesterdayClose: parseFloat(fields[4]) || 0,
    open: parseFloat(fields[5]) || 0,
    high: parseFloat(fields[33]) || 0,
    low: parseFloat(fields[34]) || 0,
    change: parseFloat(fields[31]) || 0,      // 涨跌额
    changePercent: parseFloat(fields[32]) || 0, // 涨跌幅%
    volume: parseFloat(fields[6]) || 0,        // 成交量(手)
    amount: parseFloat(fields[37]) || 0,       // 成交额(万)
    time: fields[30] || '',                     // 时间
  };
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // ---- API: 获取实时行情 ----
  if (pathname === '/api/quote') {
    const codes = parsed.query.codes || '';
    if (!codes) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing "codes" param, e.g. ?codes=601899,600989' }));
      return;
    }

    try {
      const tcCodes = codes.split(',').map(c => toTencentCode(c.trim())).join(',');
      const apiUrl = GTIM_BASE + tcCodes;

      // 请求腾讯API
      const data = await new Promise((resolve, reject) => {
        http.get(apiUrl, (res) => {
          let raw = '';
          res.on('data', chunk => raw += chunk);
          res.on('end', () => resolve(raw));
        }).on('error', reject);
      });

      // 解析每一行
      const results = {};
      data.split('\n').forEach(line => {
        if (line.trim()) {
          const parsed = parseGtimLine(line.trim());
          if (parsed) {
            results[parsed.code] = parsed;
          }
        }
      });

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      });
      res.end(JSON.stringify({ success: true, data: results }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ---- API: 批量查询（一次查完所有持仓） ----
  if (pathname === '/api/quote/all') {
    // 返回持仓推荐映射的行情
    const defaultCodes = Object.keys(require('./price-map.json'));
    const tcCodes = defaultCodes.map(c => toTencentCode(c)).join(',');
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(GTIM_BASE + tcCodes, (res) => {
          let raw = '';
          res.on('data', chunk => raw += chunk);
          res.on('end', () => resolve(raw));
        }).on('error', reject);
      });

      const results = {};
      data.split('\n').forEach(line => {
        if (line.trim()) {
          const parsed = parseGtimLine(line.trim());
          if (parsed) results[parsed.code] = parsed;
        }
      });

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ success: true, data: results }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ---- 静态文件服务 ----
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(STATIC_DIR, filePath);

  // 安全检查：确保路径在 STATIC_DIR 内
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>文件未找到</p>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 A 股投资看板 → http://localhost:${PORT}`);
  console.log(`📡 行情API: http://localhost:${PORT}/api/quote?codes=601899,600989`);
});
