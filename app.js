/* ====================================
   A 股投资看板 — Interactive JS v2.0
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==================================================================
  // 0. DATA: 海内外资讯 & 事件日历
  // ==================================================================
  const NEWS_DATA = {
    domestic: [
      {
        title: '5月A股新开户276.53万户，同比大增78%',
        body: '上交所公布数据，A股投资者总数逼近2.6亿。新股民加速入场，市场活跃度持续提升。',
        source: '上交所 / 财联社',
        impact: 'bullish',
        tags: ['📈 市场情绪', '💧 增量资金']
      },
      {
        title: '上海推动科创50股指期货期权上市',
        body: '上海资管新政明确支持科创50期货期权产品落地，有望为科创板引入增量配置资金。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🏛️ 政策', '📊 科创50']
      },
      {
        title: '电子行业成交额连续15个月霸榜',
        body: '电子板块主力净流入超109亿，半导体/光通信全面爆发，科技成长风格确立。',
        source: '财联社星矿数据',
        impact: 'bullish',
        tags: ['💻 科技', '💰 资金流向']
      },
      {
        title: '腾讯云下调DeepSeek-V4模型价格',
        body: '腾讯云宣布大幅下调DeepSeek-V4系列模型API调用价格，推动AI应用普及加速。',
        source: '财联社投资日历',
        impact: 'bullish',
        tags: ['🤖 AI', '☁️ 云计算']
      },
      {
        title: '字节跳动AI Agent平台3.0上线',
        body: 'AI智能体商业化进入新拐点。字节AI Agent平台全新版本发布，支持更复杂任务编排。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🤖 AI', '🔄 Agent']
      },
      {
        title: '宇树科技"闪电"提交IPO注册',
        body: '英伟达联手加持，宇树科技预计下半年上市。机器人赛道迎来标志性事件。',
        source: '财联社 / 新浪财经',
        impact: 'bullish',
        tags: ['🤖 机器人', '🏢 IPO']
      },
      {
        title: '财联社将可控核聚变列为No.1潜力题材',
        body: 'AI"抢电"催化核能产业复苏，美国唯一在运商业浓缩铀工厂大幅扩建。',
        source: '财联社题材推荐',
        impact: 'bullish',
        tags: ['⚛️ 核能', '🔋 电力']
      },
      {
        title: '上海资管新政：鼓励长期资金入市',
        body: '新政推动社保、保险、理财等长期资金加大权益类资产配置，利好A股中长期流动性。',
        source: '东方财富',
        impact: 'bullish',
        tags: ['🏛️ 政策', '💰 资金']
      },
      {
        title: '电网设备板块主力资金净流出',
        body: '市场风格明显偏向科技成长，传统基建板块承压。电网设备资金持续流出。',
        source: '财联社星矿数据',
        impact: 'bearish',
        tags: ['⚡ 电网', '📉 资金流出']
      },
      {
        title: '第八届中欧中医药论坛6月5日举办',
        body: '中欧中医药国际合作与发展论坛即将举办，创新药出海预期升温。',
        source: '东方财富',
        impact: 'neutral',
        tags: ['💊 医药', '🌍 国际合作']
      }
    ],
    global: [
      {
        title: 'OpenAI发布"AI上岗"发布会',
        body: 'OpenAI展示AI在股票研究、投行路演等金融场景的应用，AI Agent商业化加速。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🤖 AI', '🏦 金融']
      },
      {
        title: '微软全面押注智能体时代',
        body: '微软发布新模型、展示新终端、重塑应用生态，全力推动AI Agent落地。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🤖 AI', '💻 微软']
      },
      {
        title: '特朗普签署人工智能行政令',
        body: '美国加速AI监管框架建设，同时鼓励AI研发投入，全球AI军备竞赛升级。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🤖 AI', '🏛️ 政策']
      },
      {
        title: '欧洲央行：黄金超越美债成全球最大储备资产',
        body: '里程碑事件！全球央行增持黄金趋势确认，贵金属中长期上行逻辑强化。',
        source: '财联社 / 东方财富',
        impact: 'bullish',
        tags: ['🥇 黄金', '🏦 央行']
      },
      {
        title: '中信证券：铜价有望冲击15000美元/吨',
        body: '报告称"关税交易再起"，铜价在供给偏紧+AI需求驱动下进入超级周期。',
        source: '新浪财经 / 东方财富',
        impact: 'bullish',
        tags: ['🟤 铜', '📈 大宗商品']
      },
      {
        title: '中东局势急剧升级！美军空袭+伊朗反击',
        body: '美军发动空袭，伊朗袭击美第五舰队总部，多国机场运营暂停。全球风险偏好承压。',
        source: '财联社 / 东方财富',
        impact: 'bearish',
        tags: ['🌍 地缘', '🛢️ 原油']
      },
      {
        title: 'SpaceX最快6月12日上市',
        body: '估值或达1.75万亿美元。A股供应链名单曝光，6月4日启动路演。',
        source: '新浪财经 / 财联社',
        impact: 'bullish',
        tags: ['🚀 航天', '🏢 IPO']
      },
      {
        title: '高盛：MLCC已成AI服务器第三大成本项',
        body: '仅次于GPU和存储芯片。AI服务器MLCC需求量或暴增4倍，国产替代空间大。',
        source: '高盛 / 东方财富',
        impact: 'bullish',
        tags: ['🔧 MLCC', '💻 AI服务器']
      },
      {
        title: '黄仁勋"钦点"光通信：下一家万亿美元公司',
        body: '英伟达CEO强调光互联是AI算力瓶颈的终极解决方案，光模块需求预期加速明朗。',
        source: '财联社',
        impact: 'bullish',
        tags: ['🔦 光通信', '💻 AI算力']
      },
      {
        title: 'NYMEX原油维持94.78美元高位',
        body: '中东冲突+OPEC+减产支撑油价。高油价环境下，煤化工成本优势显现。',
        source: '同花顺',
        impact: 'neutral',
        tags: ['🛢️ 原油', '📊 商品']
      }
    ],
    calendar: [
      { date: '6月3日', day: '3', month: '6月', title: '腾讯云下调DeepSeek-V4价格', tag: '今日', tagType: 'green' },
      { date: '6月4日', day: '4', month: '6月', title: 'SpaceX启动路演，MLCC供应链关注度升温', tag: '明日', tagType: 'blue' },
      { date: '6月5日', day: '5', month: '6月', title: '第十六届中国国际机器人高峰论坛', tag: '催化', tagType: 'green' },
      { date: '6月5日', day: '5', month: '6月', title: '第八届中欧中医药国际合作与发展论坛', tag: '催化', tagType: 'neutral' },
      { date: '6月10-14日', day: '10', month: '6月', title: '柏林航空航天展览会', tag: '催化', tagType: 'green' },
      { date: '6月12日', day: '12', month: '6月', title: 'SpaceX纳斯达克挂牌上市', tag: '重磅', tagType: 'red' },
      { date: '6月18日', day: '18', month: '6月', title: '美联储FOMC利率决议', tag: '关注', tagType: 'yellow' },
      { date: '6月27-29日', day: '27', month: '6月', title: '亚洲机器人大会暨展览会', tag: '催化', tagType: 'green' }
    ]
  };

  // 报告中的固定价格（API 不可用时的降级方案）
  const FALLBACK_PRICES = {
    '601899': { price: 31.55, change: -0.09 },
    '603993': { price: 19.89, change: 0.76 },
    '000975': { price: 23.04, change: 0.00 },
    '601872': { price: 15.24, change: -1.61 },
    '600989': { price: 24.35, change: -0.81 },
    '159842': { price: 0.990, change: 0.41 },
    '601179': { price: 16.30, change: -1.45 },
    '000636': { price: 8.50, change: 1.87 },
    '300394': { price: 55.60, change: 13.32 },
    '588000': { price: 1.050, change: 0.00 }
  };

  // 实时行情缓存（由 API 动态填充）
  let priceCache = {};
  let lastFetchTime = 0;
  let isFetching = false;

  /**
   * 从本地API代理获取实时行情
   * @param {string[]} codes - 股票代码数组
   */
  async function fetchQuotes(codes) {
    if (!codes || codes.length === 0) return;
    const unique = [...new Set(codes.filter(c => c))];
    if (unique.length === 0) return;
    try {
      isFetching = true;

      // 先试本地代理
      try {
        const resp = await fetch(`/api/quote?codes=${unique.join(',')}&t=${Date.now()}`);
        const json = await resp.json();
        if (json.success && json.data && Object.keys(json.data).length > 0) {
          Object.entries(json.data).forEach(([code, info]) => {
            priceCache[code] = { price: info.price, change: info.changePercent, name: info.name, time: info.time };
          });
          lastFetchTime = Date.now();
          return;
        }
      } catch {}

      // 降级: CORS代理直连腾讯API
      const tcCodes = unique.map(c => {
        if (c.startsWith('6') || c.startsWith('9')) return 'sh' + c;
        return 'sz' + c;
      }).join(',');
      const url = `http://qt.gtimg.cn/q=${tcCodes}`;
      const resp = await fetch(CORS_PROXY + encodeURIComponent(url));
      const raw = await resp.text();
      raw.split('\n').forEach(line => {
        const m = line.match(/v_\w+="([^"]+)"/);
        if (!m) return;
        const f = m[1].split('~');
        const isIdx = f.length < 20;
        const code = f[2];
        if (code && f[3]) {
          priceCache[code] = {
            price: parseFloat(f[3]) || 0,
            change: parseFloat(f[isIdx ? 5 : 32]) || 0,
            name: f[1],
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
          };
        }
      });
      lastFetchTime = Date.now();
    } catch (err) {
      console.warn('行情API请求失败，使用静态数据');
    } finally {
      isFetching = false;
    }
  }

  /** 刷新所有持仓的实时行情 */
  async function refreshAllQuotes() {
    const codes = portfolio.map(s => s.code).filter(Boolean);
    if (codes.length > 0) {
      await fetchQuotes(codes);
      renderPortfolio();
      drawSectorPie();
    }
  }

  /** 获取单只股票的当前价（API → 静态降级） */
  function getCurrentPrice(code) {
    if (priceCache[code]) return priceCache[code].price;
    if (FALLBACK_PRICES[code]) return FALLBACK_PRICES[code].price;
    return 0;
  }

  /** 获取单只股票的涨跌幅（API → 静态降级） */
  function getStockChange(code) {
    if (priceCache[code]) return priceCache[code].change || 0;
    if (FALLBACK_PRICES[code]) return FALLBACK_PRICES[code].change;
    return 0;
  }

  // ==================================================================
  // 1. SECTION NAV (导航高亮 + 滚动监听)
  // ==================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('#dashboard, #news, #portfolio, #analysis');

  function updateNav() {
    const scrollPos = window.scrollY + 160;
    let currentSection = 'dashboard';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentSection = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });

  // ==================================================================
  // 2. NEWS RENDERING (资讯渲染 + Tab切换)
  // ==================================================================
  function renderNews(category, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    const items = NEWS_DATA[category];
    if (!items) return;

    grid.innerHTML = items.map(item => `
      <div class="news-card">
        <div class="news-card-header">
          <span class="news-card-title">${item.title}</span>
          <span class="news-card-source">${item.source}</span>
        </div>
        <div class="news-card-body">${item.body}</div>
        <div class="news-card-tags">
          <span class="news-tag ${item.impact}">
            ${item.impact === 'bullish' ? '📈 利好' : item.impact === 'bearish' ? '📉 利空' : '⚖️ 中性'}
          </span>
          ${item.tags.map(t => `<span class="news-tag analysis">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    grid.innerHTML = NEWS_DATA.calendar.map(ev => `
      <div class="cal-item">
        <div class="cal-date">
          <span class="cal-day">${ev.day}</span>
          <span class="cal-month">${ev.month}</span>
        </div>
        <div class="cal-body">
          <span class="cal-tag tag-${ev.tagType}">${ev.tag}</span>
          ${ev.title}
        </div>
      </div>
    `).join('');
  }

  // News tab switching
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.news-panel').forEach(p => p.classList.remove('active'));
      const targetMap = { domestic: 'newsDomestic', global: 'newsGlobal', calendar: 'newsCalendar' };
      const target = document.getElementById(targetMap[tab.dataset.tab]);
      if (target) target.classList.add('active');
    });
  });

  // Render all news
  renderNews('domestic', 'domesticNewsGrid');
  renderNews('global', 'globalNewsGrid');
  renderCalendar();

  // ==================================================================
  // 3. PORTFOLIO (持股收益追踪 — localStorage持久化)
  // ==================================================================
  let portfolio = JSON.parse(localStorage.getItem('aStockPortfolio') || '[]');

  function savePortfolio() {
    localStorage.setItem('aStockPortfolio', JSON.stringify(portfolio));
  }

  function renderPortfolio() {
    const tbody = document.getElementById('portfolioBody');
    const countEl = document.getElementById('portfolioCount');
    if (!tbody) return;

    if (portfolio.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" class="empty-msg">暂无持仓，请添加</td></tr>';
      if (countEl) countEl.textContent = '持仓数：0';
      updatePortfolioSummary();
      return;
    }

    let totalMv = 0, totalPL = 0, totalDailyPL = 0, totalCost = 0;
    let winners = 0, losers = 0;

    tbody.innerHTML = portfolio.map((stock, idx) => {
      const curPrice = getCurrentPrice(stock.code);
      const dailyChg = getStockChange(stock.code);

      // 日盈亏 = 当前持仓市值 × 日涨跌幅
      const curValue = stock.qty * curPrice;
      const costValue = stock.qty * stock.price;
      const pl = curValue - costValue;
      const plPct = costValue > 0 ? (pl / costValue * 100) : 0;
      const dailyPL = dailyChg !== 0 ? curValue * dailyChg / 100 : 0;

      totalMv += curValue;
      totalPL += pl;
      totalDailyPL += dailyPL;
      totalCost += costValue;
      if (pl > 0) winners++; else if (pl < 0) losers++;

      const plClass = pl >= 0 ? 'up' : 'down';
      const dailyClass = dailyChg >= 0 ? 'up' : 'down';

      return `<tr>
        <td>${stock.code}</td>
        <td><strong>${stock.name}</strong></td>
        <td>${stock.qty.toLocaleString()}</td>
        <td>¥${stock.price.toFixed(2)}</td>
        <td>¥${curPrice.toFixed(2)}</td>
        <td class="${dailyClass}">${dailyChg >= 0 ? '+' : ''}${dailyChg.toFixed(2)}%</td>
        <td class="${dailyClass}">¥${dailyPL.toFixed(2)}</td>
        <td class="${plClass}">${pl >= 0 ? '+' : ''}¥${pl.toFixed(2)}</td>
        <td class="${plClass}">${plPct >= 0 ? '+' : ''}${plPct.toFixed(2)}%</td>
        <td><button class="delete-btn" data-idx="${idx}">删除</button></td>
      </tr>`;
    }).join('');

    savePortfolio();

    if (countEl) countEl.textContent = `持仓数：${portfolio.length}`;
    updatePortfolioSummary(totalMv, totalPL, totalDailyPL, totalCost);
    updateAnalysis(totalMv, totalPL, winners, losers);
  }

  function updatePortfolioSummary(totalMv, totalPL, totalDailyPL, totalCost) {
    const mvEl = document.getElementById('totalMarketValue');
    const plEl = document.getElementById('totalPL');
    const dplEl = document.getElementById('dailyPL');
    const retEl = document.getElementById('totalReturn');

    if (!mvEl) return;

    if (portfolio.length === 0) {
      mvEl.textContent = '¥0.00'; mvEl.className = 'p-value';
      plEl.textContent = '¥0.00'; plEl.className = 'p-value';
      dplEl.textContent = '¥0.00'; dplEl.className = 'p-value';
      retEl.textContent = '0.00%'; retEl.className = 'p-value';
      return;
    }

    mvEl.textContent = `¥${totalMv.toFixed(2)}`;
    mvEl.className = 'p-value';

    const plClass = totalPL >= 0 ? 'up' : 'down';
    plEl.textContent = `${totalPL >= 0 ? '+' : ''}¥${totalPL.toFixed(2)}`;
    plEl.className = `p-value ${plClass}`;

    dplEl.textContent = `${totalDailyPL >= 0 ? '+' : ''}¥${totalDailyPL.toFixed(2)}`;
    dplEl.className = `p-value ${totalDailyPL >= 0 ? 'up' : 'down'}`;

    const retPct = totalCost > 0 ? (totalPL / totalCost * 100) : 0;
    retEl.textContent = `${retPct >= 0 ? '+' : ''}${retPct.toFixed(2)}%`;
    retEl.className = `p-value ${retPct >= 0 ? 'up' : 'down'}`;
  }

  // Add stock
  document.getElementById('addStockBtn')?.addEventListener('click', () => {
    const code = document.getElementById('stockCode').value.trim();
    const name = document.getElementById('stockName').value.trim();
    const qty = parseInt(document.getElementById('stockQty').value);
    const price = parseFloat(document.getElementById('stockPrice').value);
    const date = document.getElementById('stockDate').value;

    if (!code || !name || !qty || !price) {
      alert('请填写完整信息（代码、名称、数量、单价）');
      return;
    }

    portfolio.push({
      code,
      name,
      qty,
      price,
      date: date || new Date().toISOString().slice(0, 10),
      addedAt: Date.now()
    });

    savePortfolio();
    renderPortfolio();

    // Clear form
    document.getElementById('stockCode').value = '';
    document.getElementById('stockName').value = '';
    document.getElementById('stockQty').value = '';
    document.getElementById('stockPrice').value = '';
    document.getElementById('stockDate').value = '';
  });

  // Delete stock (event delegation)
  document.getElementById('portfolioBody')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    if (confirm(`确认删除 ${portfolio[idx]?.name || '该持仓'}？`)) {
      portfolio.splice(idx, 1);
      savePortfolio();
      renderPortfolio();
      syncHoldingCards();
    }
  });

  // Clear all
  document.getElementById('clearPortfolioBtn')?.addEventListener('click', () => {
    if (portfolio.length === 0) return;
    if (confirm('确认清空所有持仓数据？此操作不可撤销。')) {
      portfolio = [];
      savePortfolio();
      renderPortfolio();
      syncHoldingCards();
    }
  });

  // ---- 持仓赛道联动 ----
  function syncHoldingCards() {
    const holdingGrid = document.getElementById('holdingGrid');
    if (!holdingGrid) return;

    const heldCodes = new Set(portfolio.map(s => s.code));
    const heldMap = {};
    portfolio.forEach(s => {
      heldMap[s.code] = { name: s.name, qty: s.qty, code: s.code };
    });

    holdingGrid.querySelectorAll('.holding-card').forEach(card => {
      // Remove existing badge
      const oldBadge = card.querySelector('.held-badge');
      if (oldBadge) oldBadge.remove();

      // Check if any item in this card matches portfolio
      const itemCodes = card.querySelectorAll('.item-code');
      let hasHold = false;
      itemCodes.forEach(el => {
        const code = el.textContent.trim();
        if (heldCodes.has(code)) hasHold = true;
      });

      if (hasHold) {
        const badge = document.createElement('span');
        badge.className = 'held-badge';
        badge.textContent = '已持仓';
        card.querySelector('.holding-header')?.appendChild(badge);
      }
    });
  }

  // ==================================================================
  // 4. ANALYSIS: Canvas 饼图 (板块配置)
  // ==================================================================
  const COLORS = [
    '#448aff', '#00c853', '#ff1744', '#ffc107', '#7c4dff',
    '#00bcd4', '#ff9100', '#e040fb', '#69f0ae', '#536dfe'
  ];

  function drawSectorPie() {
    const canvas = document.getElementById('sectorPieChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 20;

    ctx.clearRect(0, 0, w, h);

    // Collect sectors from portfolio
    const sectorMap = {};
    portfolio.forEach(s => {
      const sector = s.name || '未知';
      sectorMap[sector] = (sectorMap[sector] || 0) + (s.qty * (CURRENT_PRICES[s.code] || 0));
    });

    const entries = Object.entries(sectorMap);
    const total = entries.reduce((sum, [, v]) => sum + v, 0);

    document.getElementById('pieSectorCount').textContent = entries.length;

    if (total === 0) {
      ctx.fillStyle = '#2a3040';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a6478';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无持仓数据', cx, cy + 5);
      document.getElementById('pieLegend').innerHTML = '<span style="color:#5a6478;font-size:12px;">添加持仓后查看配置</span>';
      return;
    }

    let startAngle = -Math.PI / 2;

    // Sort by value desc for better visual
    entries.sort((a, b) => b[1] - a[1]);

    entries.forEach(([name, value], i) => {
      const sliceAngle = (value / total) * Math.PI * 2;
      const color = COLORS[i % COLORS.length];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Border
      ctx.strokeStyle = '#0a0e17';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label line + text for larger slices
      if (sliceAngle > 0.3) {
        const midAngle = startAngle + sliceAngle / 2;
        const lx = cx + Math.cos(midAngle) * (r * 0.65);
        const ly = cy + Math.sin(midAngle) * (r * 0.65);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${(value / total * 100).toFixed(1)}%`, lx, ly);
      }

      startAngle += sliceAngle;
    });

    // Center hole (donut)
    ctx.fillStyle = '#1a1f2e';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Legend
    const legend = document.getElementById('pieLegend');
    legend.innerHTML = entries.map(([name, value], i) => {
      const pct = ((value / total) * 100).toFixed(1);
      return `<div class="legend-item">
        <span class="legend-dot" style="background:${COLORS[i % COLORS.length]}"></span>
        ${name} <span class="legend-pct">${pct}%</span>
      </div>`;
    }).join('');
  }

  // ==================================================================
  // 5. ANALYSIS: Canvas 风险仪表 (Gauge)
  // ==================================================================
  function drawRiskGauge() {
    const canvas = document.getElementById('riskGauge');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h - 20, r = 90;

    ctx.clearRect(0, 0, w, h);

    if (portfolio.length === 0) {
      document.getElementById('riskLevel').textContent = '--';
      document.getElementById('riskLevel').style.color = '#5a6478';
      ctx.fillStyle = '#2a3040';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无数据', cx, cy - 10);
      return;
    }

    // Calculate risk score based on portfolio signals
    let greenCount = 0, yellowCount = 0, redCount = 0;
    const sectorKeywords = {
      green: ['AI', '云计算', '科创', '机器人', '航天', '核能', '券商', '科技', '创新药'],
      red: ['招商轮船', '中国西电', '宝丰能源']
    };

    portfolio.forEach(s => {
      const name = s.name || '';
      if (sectorKeywords.red.some(k => name.includes(k))) redCount++;
      else if (sectorKeywords.green.some(k => name.includes(k))) greenCount++;
      else yellowCount++;
    });

    const total = portfolio.length;
    const riskScore = total > 0 ? Math.min(100, ((redCount * 80 + yellowCount * 45) / total)) : 50;

    // Draw gauge arc
    const startA = Math.PI * 0.75;
    const endA = Math.PI * 2.25;
    const range = endA - startA;
    const valueA = startA + (riskScore / 100) * range;

    // Background arc
    ctx.strokeStyle = '#2a3040';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, startA, endA);
    ctx.stroke();

    // Colored arc
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#00c853');
    gradient.addColorStop(0.4, '#ffc107');
    gradient.addColorStop(0.7, '#ff9100');
    gradient.addColorStop(1, '#ff1744');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startA, valueA);
    ctx.stroke();

    // Pointer
    const pointerLen = r - 10;
    const px = cx + Math.cos(valueA) * pointerLen;
    const py = cy + Math.sin(valueA) * pointerLen;

    ctx.fillStyle = '#e8edf5';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#e8edf5';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    ctx.fillStyle = '#e8edf5';
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();

    // Risk level label
    const levelEl = document.getElementById('riskLevel');
    let level, color;
    if (riskScore < 30) { level = '低风险 🟢'; color = '#00c853'; }
    else if (riskScore < 55) { level = '中等风险 🟡'; color = '#ffc107'; }
    else if (riskScore < 75) { level = '较高风险 🟠'; color = '#ff9100'; }
    else { level = '高风险 🔴'; color = '#ff1744'; }

    levelEl.textContent = level;
    levelEl.style.color = color;
  }

  // ==================================================================
  // 6. ANALYSIS: 更新统计 + 事件时间线
  // ==================================================================
  function updateAnalysis(totalMv, totalPL, winners, losers) {
    document.getElementById('statHoldings').textContent = portfolio.length;
    document.getElementById('statWinners').textContent = winners || 0;
    document.getElementById('statLosers').textContent = losers || 0;
    const rate = portfolio.length > 0 ? ((winners || 0) / portfolio.length * 100).toFixed(0) : 0;
    document.getElementById('statWinRate').textContent = rate + '%';

    drawSectorPie();
    drawRiskGauge();
  }

  // Render event timeline
  function renderEventTimeline() {
    const timeline = document.getElementById('eventTimeline');
    if (!timeline || !NEWS_DATA.calendar) return;

    timeline.innerHTML = NEWS_DATA.calendar.map(ev => {
      const dotClass = ev.tagType === 'green' ? 'green' : ev.tagType === 'red' ? 'red' : 'yellow';
      return `<div class="event-item">
        <div class="event-date">${ev.date}</div>
        <div class="event-dot ${dotClass}"></div>
        <div class="event-content">
          <span class="event-tag tag-${ev.tagType}">${ev.tag}</span>
          ${ev.title}
        </div>
      </div>`;
    }).join('');
  }

  // ==================================================================
  // 7. INDEX CARDS LIVE UPDATE (开盘/午盘/收盘 刷新)
  // ==================================================================
  const INDEX_CODES = ['sh000001', 'sz399001', 'sz399006', 'sh000688', 'sh000016'];
  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  let lastIndexRefresh = null;

  /** 直接调用腾讯API（带CORS代理降级） */
  async function fetchIndexRaw() {
    const tcCodes = 's_sh000001,s_sz399001,s_sz399006,s_sh000688,s_sh000016';
    const url = `http://qt.gtimg.cn/q=${tcCodes}`;

    // 先试本地代理
    try {
      const resp = await fetch(`/api/quote?codes=000001,399001,399006,000688,000016&t=${Date.now()}`);
      const json = await resp.json();
      if (json.success && Object.keys(json.data).length > 0) return json.data;
    } catch {}

    // 降级: CORS代理直连腾讯API
    try {
      const resp = await fetch(CORS_PROXY + encodeURIComponent(url));
      const raw = await resp.text();
      const result = {};
      raw.split('\n').forEach(line => {
        const m = line.match(/v_s_\w+="([^"]+)"/);
        if (!m) return;
        const f = m[1].split('~');
        const code = f[2];
        if (code) {
          result[code] = {
            code, name: f[1],
            price: parseFloat(f[3]) || 0,
            change: parseFloat(f[4]) || 0,
            changePercent: parseFloat(f[5]) || 0,
          };
        }
      });
      return result;
    } catch {
      return null;
    }
  }

  async function fetchAndRenderIndexes() {
    const data = await fetchIndexRaw();
    if (!data) {
      document.getElementById('lastUpdateBadge').textContent = '离线';
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('indexTime').textContent = timeStr;
    document.getElementById('lastUpdateBadge').textContent = '已刷新';
    lastIndexRefresh = now;

    document.querySelectorAll('.index-gloss').forEach(card => {
      const idx = card.dataset.index;
      if (!idx) return;
      const code = idx.replace(/^(sh|sz)/, '');
      const item = data[code];
      if (!item) return;

      const price = item.price;
      const chg = item.changePercent || 0;
      const isUp = chg >= 0;
      card.dataset.movement = isUp ? 'up' : 'down';

      const priceEl = card.querySelector('.gloss-price');
      const pointsEl = card.querySelector('.gloss-points');
      const pctEl = card.querySelector('.gloss-pct');

      if (priceEl) {
        priceEl.textContent = price.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        priceEl.className = `gloss-price ${isUp ? 'up' : 'down'}`;
      }
      if (pointsEl) {
        pointsEl.textContent = `${isUp ? '+' : ''}${(item.change || chg).toFixed(2)}`;
        pointsEl.className = `gloss-points ${isUp ? 'up' : 'down'}`;
      }
      if (pctEl) {
        pctEl.textContent = `${isUp ? '+' : ''}${chg.toFixed(2)}%`;
        pctEl.className = `gloss-pct ${isUp ? 'up' : 'down'}`;
      }

      const changeEl = card.querySelector('.gloss-change');
      if (changeEl) changeEl.className = `gloss-change ${isUp ? 'up' : 'down'}`;
    });
  }

  // ---- Dynamic header date ----
  function updateHeaderDate() {
    const now = new Date();
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const h = now.getHours(), m = now.getMinutes();
    let session = (h < 11 || (h === 11 && m < 30)) ? '早盘' : (h < 15) ? '午盘' : '收盘';
    if (h < 9 || (h === 9 && m < 30)) session = '盘前';
    if (h >= 15 && h < 20) session = '盘后';
    const dateStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日（${days[now.getDay()]}）${session}`;
    const el = document.getElementById('headerDate');
    if (el) el.textContent = dateStr;
    document.title = `A 股投资看板 — ${dateStr}`;
  }
  updateHeaderDate();
  setInterval(updateHeaderDate, 60000);

  // ---- Scheduled refresh: 开盘 9:30, 午盘 11:30, 收盘 15:00 ----
  function checkSchedule() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const day = now.getDay();
    if (day === 0 || day === 6) return; // weekends

    const isRefreshWindow =
      (h === 9 && m >= 30 && m <= 35) ||
      (h === 11 && m >= 30 && m <= 35) ||
      (h === 15 && m >= 0 && m <= 5);

    if (!isRefreshWindow) return;

    // Only refresh once per window
    if (lastIndexRefresh) {
      const minutesSince = (now - lastIndexRefresh) / 60000;
      if (minutesSince < 2) return;
    }

    fetchAndRenderIndexes();
  }

  // Check every 30 seconds
  setInterval(checkSchedule, 30000);

  // ==================================================================
  // 8. INITIAL RENDER + AUTO REFRESH
  // ==================================================================
  renderPortfolio();
  renderEventTimeline();

  // Fetch indexes on page load
  fetchAndRenderIndexes();

  // ---- 刷新行情按钮 ----
  document.getElementById('refreshQuoteBtn')?.addEventListener('click', async () => {
    const statusEl = document.getElementById('quoteStatus');
    const btn = document.getElementById('refreshQuoteBtn');
    if (!statusEl || !btn) return;
    statusEl.textContent = '🔄 获取中...';
    btn.disabled = true;
    await refreshAllQuotes();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const cacheLen = Object.keys(priceCache).length;
    if (cacheLen > 0) {
      statusEl.textContent = `🟢 实时 ${timeStr} (${cacheLen}只)`;
    } else {
      statusEl.textContent = `⚠️ API不可用，使用静态数据`;
    }
    btn.disabled = false;
  });

  // ---- 页面加载后自动刷新行情 ----
  setTimeout(async () => {
    const statusEl = document.getElementById('quoteStatus');
    await refreshAllQuotes();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const cacheLen = Object.keys(priceCache).length;
    if (statusEl) {
      if (cacheLen > 0) {
        statusEl.textContent = `实时 ${timeStr}`;
      } else {
        statusEl.textContent = `静态数据`;
      }
    }
  }, 500);

  // ---- 每30秒自动刷新一次 ----
  setInterval(async () => {
    const statusEl = document.getElementById('quoteStatus');
    if (portfolio.length > 0) {
      await refreshAllQuotes();
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const cacheLen = Object.keys(priceCache).length;
      if (statusEl && cacheLen > 0) statusEl.textContent = `实时 ${timeStr}`;
    }
  }, 30000);

  // ==================================================================
  // 8. PRESERVE ALL EXISTING FEATURES (from v1)
  // ==================================================================

  // ---- 持仓卡片展开/收起 ----
  const holdingCards = document.querySelectorAll('.holding-card');

  holdingCards.forEach(card => {
    const detail = card.querySelector('.holding-detail');
    if (!detail) return;

    detail.style.maxHeight = '0';
    detail.style.overflow = 'hidden';
    detail.style.transition = 'max-height 0.35s ease, opacity 0.3s ease';
    detail.style.opacity = '0';

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const isOpen = detail.dataset.open === 'true';

      if (isOpen) {
        detail.style.maxHeight = '0';
        detail.style.opacity = '0';
        detail.dataset.open = 'false';
        card.classList.remove('expanded');
      } else {
        holdingCards.forEach(c => {
          const d = c.querySelector('.holding-detail');
          if (d && d !== detail && d.dataset.open === 'true') {
            d.style.maxHeight = '0';
            d.style.opacity = '0';
            d.dataset.open = 'false';
            c.classList.remove('expanded');
          }
        });
        detail.style.maxHeight = detail.scrollHeight + 'px';
        detail.style.opacity = '1';
        detail.dataset.open = 'true';
        card.classList.add('expanded');
      }
    });
  });

  // ---- 持仓筛选 ----
  const filterBar = document.createElement('div');
  filterBar.className = 'holding-filters';
  filterBar.innerHTML = `
    <button class="filter-btn active" data-filter="all">全部</button>
    <button class="filter-btn" data-filter="green">🟢 积极</button>
    <button class="filter-btn" data-filter="yellow">🟡 中性</button>
    <button class="filter-btn" data-filter="red">🔴 谨慎</button>
  `;

  const hs = document.querySelector('.holding-grid')?.closest('.section');
  if (hs) {
    const hg = hs.querySelector('.holding-grid');
    hs.insertBefore(filterBar, hg);

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      holdingCards.forEach(card => {
        if (filter === 'all') { card.style.display = ''; }
        else { card.style.display = card.dataset.signal === filter ? '' : 'none'; }
      });
    });
  }

  // ---- 指数动画计数 ----
  function animateValue(el, start, end, duration = 800) {
    const isPct = typeof end === 'string' && end.includes('%');
    const isSigned = typeof end === 'string' && (end.startsWith('+') || end.startsWith('-'));
    let target = parseFloat(String(end).replace(/[+,%]/g, ''));
    if (isNaN(target)) return;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      let text;
      if (isPct) text = (current >= 0 ? '+' : '') + current.toFixed(2) + '%';
      else if (isSigned) text = (current >= 0 ? '+' : '') + current.toFixed(2);
      else text = current.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      el.textContent = text;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const valueEl = card.querySelector('.gloss-price');
        const changeEl = card.querySelector('.gloss-change');
        if (valueEl && !valueEl.dataset.animated) {
          valueEl.dataset.animated = 'true';
          const rawText = valueEl.textContent.replace(/,/g, '');
          const val = parseFloat(rawText);
          if (!isNaN(val)) {
            valueEl.textContent = '0';
            setTimeout(() => animateValue(valueEl, 0, val, 900), 100);
          }
        }
        if (changeEl && !changeEl.dataset.animated) {
          changeEl.dataset.animated = 'true';
          const pctSpan = changeEl.querySelector('.gloss-pct');
          if (pctSpan) {
            const pctRaw = pctSpan.textContent.replace(/[+%]/g, '');
            const pctVal = parseFloat(pctRaw);
            if (!isNaN(pctVal)) {
              pctSpan.textContent = '+0.00%';
              setTimeout(() => animateValue(pctSpan, 0, pctVal, 700), 300);
            }
          }
        }
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.index-gloss').forEach(card => observer.observe(card));

  // ---- Back to Top ----
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', '回到顶部');
  document.body.appendChild(backToTop);
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- Live time ----
  const timeEls = document.querySelectorAll('.live-time');
  if (timeEls.length > 0) {
    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      timeEls.forEach(el => { el.textContent = timeStr; });
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ---- Risk card click ----
  document.querySelectorAll('.risk-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('risk-expanded'));
  });

  // ---- Hot bar animation ----
  const hotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.hot-bar-fill');
        if (bar && !bar.dataset.animated) {
          bar.dataset.animated = 'true';
          bar.style.width = bar.dataset.width || '0%';
        }
        hotObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.hot-bar-card').forEach(card => hotObserver.observe(card));

  // ---- Keyboard shortcuts ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      holdingCards.forEach(card => {
        const detail = card.querySelector('.holding-detail');
        if (detail && detail.dataset.open === 'true') {
          detail.style.maxHeight = '0';
          detail.style.opacity = '0';
          detail.dataset.open = 'false';
          card.classList.remove('expanded');
        }
      });
    }
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.target.closest('input,textarea')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ---- Touch optimizations ----
  if ('ontouchstart' in window) {
    document.querySelectorAll('.holding-card').forEach(card => { card.style.cursor = 'pointer'; });
  }

  // ---- Console welcome ----
  console.log('%cA- Investment Dashboard v4.0', 'font-size:20px; font-weight:bold; color:#448aff');
  console.log('%cData: 2026-06-03 11:07 CST', 'color:#8892a6');
  
  

  const indexData = [];
  document.querySelectorAll('.index-gloss').forEach(card => {
    const name = card.querySelector('.gloss-label')?.textContent?.trim();
    const value = card.querySelector('.gloss-price')?.textContent;
    const change = card.querySelector('.gloss-change')?.textContent?.trim();
    if (name) indexData.push({ name, value, change });
  });
  console.table(indexData);

});
