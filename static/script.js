// DOM Elements
const navBar = document.getElementById('navBar');
const chartForm = document.getElementById('chartForm');
const generateBtn = document.getElementById('generateBtn');
const chartImage = document.getElementById('chartImage');
const placeholder = document.getElementById('placeholder');
const assetSearch = document.getElementById('assetSearch');
const searchSuggestions = document.getElementById('searchSuggestions');
const tickerInput = document.getElementById('ticker');
const compareTickerInput = document.getElementById('compareTicker');
const categoryTabs = document.getElementById('categoryTabs');
const assetGrid = document.getElementById('assetGrid');

// Sections for scrolling
const sectionAsset = document.getElementById('section-asset');
const sectionTimeframe = document.getElementById('section-timeframe');
const sectionCustomize = document.getElementById('section-customize');
const sectionBackground = document.getElementById('section-background');
const sectionChart = document.getElementById('section-chart');

// Asset Data
const assetData = [
    // Crypto
    { ticker: 'BTC-USD', name: 'Bitcoin', icon: '₿', category: 'Crypto' },
    { ticker: 'ETH-USD', name: 'Ethereum', icon: 'Ξ', category: 'Crypto' },
    { ticker: 'SOL-USD', name: 'Solana', icon: '◎', category: 'Crypto' },
    { ticker: 'XRP-USD', name: 'XRP', icon: '✕', category: 'Crypto' },
    { ticker: 'ADA-USD', name: 'Cardano', icon: '₳', category: 'Crypto' },
    { ticker: 'DOGE-USD', name: 'Dogecoin', icon: 'Ð', category: 'Crypto' },
    { ticker: 'AVAX-USD', name: 'Avalanche', icon: '🔺', category: 'Crypto' },
    { ticker: 'DOT-USD', name: 'Polkadot', icon: '●', category: 'Crypto' },
    { ticker: 'MATIC-USD', name: 'Polygon', icon: 'Ⓜ', category: 'Crypto' },
    { ticker: 'LTC-USD', name: 'Litecoin', icon: 'Ł', category: 'Crypto' },
    { ticker: 'UNI-USD', name: 'Uniswap', icon: '🦄', category: 'Crypto' },
    { ticker: 'LINK-USD', name: 'Chainlink', icon: '🔗', category: 'Crypto' },
    { ticker: 'ATOM-USD', name: 'Cosmos', icon: '⚛', category: 'Crypto' },
    { ticker: 'XMR-USD', name: 'Monero', icon: 'ɱ', category: 'Crypto' },
    { ticker: 'BCH-USD', name: 'Bitcoin Cash', icon: 'Ƀ', category: 'Crypto' },
    { ticker: 'ALGO-USD', name: 'Algorand', icon: 'Ⱥ', category: 'Crypto' },

    // Stocks
    { ticker: 'AAPL', name: 'Apple', icon: '', category: 'Stocks' },
    { ticker: 'MSFT', name: 'Microsoft', icon: '⊞', category: 'Stocks' },
    { ticker: 'GOOGL', name: 'Google', icon: 'G', category: 'Stocks' },
    { ticker: 'AMZN', name: 'Amazon', icon: 'a', category: 'Stocks' },
    { ticker: 'TSLA', name: 'Tesla', icon: '⚡', category: 'Stocks' },
    { ticker: 'NVDA', name: 'NVIDIA', icon: '◆', category: 'Stocks' },
    { ticker: 'META', name: 'Meta', icon: '∞', category: 'Stocks' },
    { ticker: 'NFLX', name: 'Netflix', icon: 'N', category: 'Stocks' },
    { ticker: 'AMD', name: 'AMD', icon: '∰', category: 'Stocks' },
    { ticker: 'INTC', name: 'Intel', icon: 'i', category: 'Stocks' },
    { ticker: 'COIN', name: 'Coinbase', icon: 'C', category: 'Stocks' },
    { ticker: 'HOOD', name: 'Robinhood', icon: '🏹', category: 'Stocks' },
    { ticker: 'PLTR', name: 'Palantir', icon: 'P', category: 'Stocks' },
    { ticker: 'UBER', name: 'Uber', icon: 'U', category: 'Stocks' },
    { ticker: 'ABNB', name: 'Airbnb', icon: '🏠', category: 'Stocks' },
    { ticker: 'SQ', name: 'Block', icon: '□', category: 'Stocks' },

    // Indices
    { ticker: '^GSPC', name: 'S&P 500', icon: '🇺🇸', category: 'Indices' },
    { ticker: '^DJI', name: 'Dow Jones', icon: '🏭', category: 'Indices' },
    { ticker: '^IXIC', name: 'Nasdaq', icon: '💻', category: 'Indices' },
    { ticker: '^RUT', name: 'Russell 2000', icon: 'R', category: 'Indices' },
    { ticker: '^FTSE', name: 'FTSE 100', icon: '🇬🇧', category: 'Indices' },
    { ticker: '^N225', name: 'Nikkei 225', icon: '🇯🇵', category: 'Indices' },
    { ticker: '^GDAXI', name: 'DAX', icon: '🇩🇪', category: 'Indices' },
    { ticker: '^HSI', name: 'Hang Seng', icon: '🇭🇰', category: 'Indices' },

    // Forex
    { ticker: 'EURUSD=X', name: 'EUR/USD', icon: '🇪🇺', category: 'Forex' },
    { ticker: 'GBPUSD=X', name: 'GBP/USD', icon: '🇬🇧', category: 'Forex' },
    { ticker: 'JPY=X', name: 'USD/JPY', icon: '🇯🇵', category: 'Forex' },
    { ticker: 'CHF=X', name: 'USD/CHF', icon: '🇨🇭', category: 'Forex' },
    { ticker: 'AUDUSD=X', name: 'AUD/USD', icon: '🇦🇺', category: 'Forex' },
    { ticker: 'USDCAD=X', name: 'USD/CAD', icon: '🇨🇦', category: 'Forex' },

    // Commodities
    { ticker: 'GC=F', name: 'Gold Futures', icon: '🥇', category: 'Commodities' },
    { ticker: 'SI=F', name: 'Silver Futures', icon: '🥈', category: 'Commodities' },
    { ticker: 'CL=F', name: 'Crude Oil', icon: '🛢', category: 'Commodities' },
    { ticker: 'NG=F', name: 'Natural Gas', icon: '🔥', category: 'Commodities' },
    { ticker: 'HG=F', name: 'Copper', icon: '🥉', category: 'Commodities' },
    { ticker: 'ZC=F', name: 'Corn', icon: '🌽', category: 'Commodities' },

    // Economic Indicators (FRED)
    { ticker: 'fed_funds_rate', name: 'Fed Funds Rate', icon: '🏦', category: 'Economic' },
    { ticker: 'treasury_10y', name: '10Y Treasury Yield', icon: '📈', category: 'Economic' },
    { ticker: 'treasury_2y', name: '2Y Treasury Yield', icon: '📊', category: 'Economic' },
    { ticker: 'cpi_yoy', name: 'CPI YoY', icon: '💰', category: 'Economic' },
    { ticker: 'unemployment', name: 'Unemployment Rate', icon: '👥', category: 'Economic' },
    { ticker: 'dxy', name: 'Dollar Index (DXY)', icon: '💵', category: 'Economic' },
    { ticker: 'gdp', name: 'GDP Growth', icon: '📈', category: 'Economic' },
    { ticker: 'pmi', name: 'Manufacturing PMI', icon: '🏭', category: 'Economic' },
    { ticker: 'ism_services', name: 'ISM Services PMI', icon: '🏢', category: 'Economic' },
    { ticker: 'WDTGAL', name: 'Treasury General Account', icon: '🏛️', category: 'Economic' },
    { ticker: 'WTREGEN', name: 'Wilshire 5000', icon: '📊', category: 'Economic' },

    // On-Chain Metrics
    { ticker: 'BTC.D', name: 'Bitcoin Dominance', icon: '👑', category: 'On-Chain' },
    { ticker: 'USDT.D', name: 'Tether Dominance', icon: '💎', category: 'On-Chain' },
    { ticker: 'ETH-BTC', name: 'ETH/BTC Ratio', icon: '⚖️', category: 'On-Chain' },
    { ticker: 'TOTAL2', name: 'Total2 Market Cap', icon: '📊', category: 'On-Chain' },
    { ticker: 'TOTAL3', name: 'Total3 Market Cap', icon: '📈', category: 'On-Chain' },
    { ticker: 'OTHERS.D', name: 'Others Dominance', icon: '🔄', category: 'On-Chain' },
    { ticker: 'USDC-USD', name: 'USDC (Stablecoin)', icon: '💰', category: 'On-Chain' },
    { ticker: 'USDT-USD', name: 'USDT (Stablecoin)', icon: '💵', category: 'On-Chain' },
    { ticker: 'BTC-USD', name: 'Bitcoin Price', icon: '₿', category: 'On-Chain' },
    { ticker: 'ETH-USD', name: 'Ethereum Price', icon: 'Ξ', category: 'On-Chain' }
];

// Allowed Candle Intervals per Period
const allowedIntervals = {
    '1d': ['1m', '5m', '15m', '1h'],
    '5d': ['5m', '15m', '1h', '1d'],
    '1mo': ['15m', '1h', '4h', '1d'],
    '3mo': ['1h', '4h', '1d'],
    '6mo': ['4h', '1d', '1wk'],
    '1y': ['1d', '1wk', '1mo'],
    '2y': ['1d', '1wk', '1mo'],
    '5y': ['1d', '1wk', '1mo'],
    '10y': ['1d', '1wk', '1mo'],
    'max': ['1d', '1wk', '1mo'],
    'ytd': ['1d', '1wk', '1mo'],
    'custom': ['1d', '1wk', '1mo']
};

// State
let selectedTickers = []; // Array to store selected tickers
let isMultiSelect = false;
let assetSettings = {}; // { ticker: { chartType, color, scale, priceAxis, timeAxis, candleInterval } }per-asset settings

// Default settings for an asset
function getDefaultSettings(ticker, isPrimary) {
    // Check if this is economic data
    const asset = assetData.find(a => a.ticker === ticker);
    const isEconomic = asset && asset.category === 'Economic';

    // Economic data should default to line charts (no OHLC data)
    const defaultChartType = isEconomic ? 'line' : (isPrimary ? 'candle' : 'line');

    return {
        ticker: ticker,
        chartType: defaultChartType,
        color: isPrimary ? '#0066FF' : '#FF9500',
        upColor: '#10B981',   // Green for bullish candles
        downColor: '#EF4444', // Red for bearish candles
        scale: 'linear', // linear, log, percentage
        priceAxis: isPrimary ? 'left' : 'right',
        timeAxis: 'bottom',
        timeAxis: 'bottom',
        candleInterval: '1wk', // For candle charts: 1m, 5m, 15m, 1h, 4h, 1d, 1wk, 1mo
        offsetValue: 0,
        offsetUnit: 'weeks'
    };
}

function updateHiddenInputs() {
    if (selectedTickers.length > 0) {
        // First selected is primary
        tickerInput.value = selectedTickers[0];

        // Rest are comparisons
        if (selectedTickers.length > 1) {
            compareTickerInput.value = selectedTickers.slice(1).join(',');
        } else {
            compareTickerInput.value = '';
        }
    } else {
        tickerInput.value = '';
        compareTickerInput.value = '';
    }

    // Update customization sections and header
    renderCustomizationSections();
    updateCustomizationHeader();
    renderSelectedAssetsBar();
}

function removeTicker(ticker) {
    selectedTickers = selectedTickers.filter(t => t !== ticker);
    updateHiddenInputs();
    // Re-render asset grid to update active states
    const activeCategory = document.querySelector('.cat-tab.active') ? document.querySelector('.cat-tab.active').dataset.category : 'All';
    renderAssets(activeCategory);
}

function renderSelectedAssetsBar() {
    const bar = document.getElementById('selectedAssetsBar');
    if (selectedTickers.length === 0) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');
    bar.innerHTML = selectedTickers.map(ticker => {
        const asset = assetData.find(a => a.ticker === ticker);
        const name = asset ? asset.name : ticker;
        const icon = asset ? asset.icon : '📊';

        return `
            <div class="asset-chip">
                <span class="asset-chip-icon">${icon}</span>
                <span class="asset-chip-name">${name}</span>
                <button type="button" class="asset-chip-remove" data-ticker="${ticker}" title="Remove">✕</button>
            </div>
        `;
    }).join('');

    // Attach listeners
    bar.querySelectorAll('.asset-chip-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeTicker(btn.dataset.ticker);
        });
    });
}

function updateCustomizationHeader() {
    const headerElement = document.getElementById('customizingAssets');

    if (selectedTickers.length === 0) {
        headerElement.textContent = 'Select an asset to begin';
        return;
    }

    // Build display string with asset names and icons
    const assetNames = selectedTickers.map(ticker => {
        const asset = assetData.find(a => a.ticker === ticker);
        if (asset) {
            // For short display, use icon + short name
            const shortName = asset.ticker.split('-')[0];
            return `${asset.icon} ${shortName}`;
        }
        return ticker;
    });

    if (assetNames.length === 1) {
        headerElement.textContent = assetNames[0];
    } else {
        headerElement.textContent = assetNames.join(' + ');
    }
}

function renderCustomizationSections() {
    const container = document.getElementById('perAssetCustomization');

    if (selectedTickers.length === 0) {
        container.innerHTML = '';
        return;
    }

    // Ensure settings exist for all selected tickers
    selectedTickers.forEach((ticker, index) => {
        if (!assetSettings[ticker]) {
            assetSettings[ticker] = getDefaultSettings(ticker, index === 0);
        }
    });

    // Remove settings for unselected tickers
    Object.keys(assetSettings).forEach(ticker => {
        if (!selectedTickers.includes(ticker)) {
            delete assetSettings[ticker];
        }
    });

    // Render sections for each asset
    container.innerHTML = selectedTickers.map((ticker, index) => {
        const asset = assetData.find(a => a.ticker === ticker);
        const settings = assetSettings[ticker];
        const isPrimary = index === 0;

        const assetName = asset ? asset.name : ticker;
        const assetIcon = asset ? asset.icon : '📊';

        return `
            <div class="asset-customization-section" data-ticker="${ticker}">
                <div class="asset-section-header">
                    <div class="header-left">
                        <span class="asset-section-icon">${assetIcon}</span>
                        <span class="asset-section-name">${assetName}</span>
                        ${isPrimary ? '<span class="asset-section-badge">Primary</span>' : '<span class="asset-section-badge" style="background: #FF9500;">Overlay</span>'}
                    </div>
                    <button type="button" class="remove-asset-btn" data-ticker="${ticker}" title="Remove Asset">✕</button>
                </div>
                
                <div class="customization-grid">
                    <!-- Chart Type -->
                    <div class="control-card">
                        <label>Chart Type</label>
                        <div class="segmented-control asset-chart-type" data-ticker="${ticker}">
                            ${(() => {
                const isEconomic = asset && asset.category === 'Economic';
                const disabledStyle = isEconomic ? ' style="opacity:0.4; pointer-events:none; cursor:not-allowed;"' : '';
                const tooltip = isEconomic ? ' title="Economic data only supports Line and Area charts"' : '';

                return `
                                    <button type="button" class="segment ${settings.chartType === 'candle' ? 'active' : ''}" data-value="candle"${disabledStyle}${tooltip}>Candle</button>
                                    <button type="button" class="segment ${settings.chartType === 'line' ? 'active' : ''}" data-value="line">Line</button>
                                    <button type="button" class="segment ${settings.chartType === 'ohlc' ? 'active' : ''}" data-value="ohlc"${disabledStyle}${tooltip}>OHLC</button>
                                    <button type="button" class="segment ${settings.chartType === 'area' ? 'active' : ''}" data-value="area">Area</button>
                                    <button type="button" class="segment ${settings.chartType === 'hollow_and_filled' ? 'active' : ''}" data-value="hollow_and_filled"${disabledStyle}${tooltip}>Hollow</button>
                                    <button type="button" class="segment ${settings.chartType === 'renko' ? 'active' : ''}" data-value="renko"${disabledStyle}${tooltip}>Renko</button>
                                    <button type="button" class="segment ${settings.chartType === 'pnf' ? 'active' : ''}" data-value="pnf"${disabledStyle}${tooltip}>PnF</button>
                                `;
            })()}
                        </div>
                    </div>
                    
                    <!-- Candle Interval (shown only for candle charts) -->
                    ${settings.chartType === 'candle' || settings.chartType === 'ohlc' || settings.chartType === 'hollow_and_filled' ? (() => {
                const currentPeriod = document.getElementById('period').value || '1y';
                const validIntervals = allowedIntervals[currentPeriod] || allowedIntervals['1y'];
                const intervals = ['1m', '5m', '15m', '1h', '4h', '1d', '1wk', '1mo'];

                return `
                        <div class="control-card candle-interval-card" data-ticker="${ticker}">
                            <label>Candle Timeframe</label>
                            <div class="segmented-control asset-candle-interval" data-ticker="${ticker}">
                                ${intervals.map(int => `
                                    <button type="button" class="segment ${settings.candleInterval === int ? 'active' : ''}" 
                                            data-value="${int}" 
                                            ${!validIntervals.includes(int) ? 'disabled style="opacity:0.3; pointer-events:none;"' : ''}>
                                        ${int}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        `;
            })() : ''}
                    
                    <!-- Color -->
                    <!-- Color (Hidden for Candle/OHLC) -->
                    ${settings.chartType !== 'candle' && settings.chartType !== 'ohlc' && settings.chartType !== 'hollow_and_filled' ? `
                    <div class="control-card">
                        <label>Color</label>
                        <div class="color-picker-wrapper">
                            <input type="color" class="asset-color-picker" data-ticker="${ticker}" value="${settings.color}">
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Candlestick Colors (shown only for candle charts) -->
                    ${settings.chartType === 'candle' || settings.chartType === 'ohlc' || settings.chartType === 'hollow_and_filled' ? `
                    <div class="control-card candle-colors-card" data-ticker="${ticker}">
                        <label>Candle Colors</label>
                        <div class="candle-color-grid">
                            <div class="candle-color-item">
                                <label class="candle-color-label">🟢 Up (Bullish)</label>
                                <input type="color" class="asset-up-color-picker" data-ticker="${ticker}" value="${settings.upColor || '#10B981'}">
                            </div>
                            <div class="candle-color-item">
                                <label class="candle-color-label">🔴 Down (Bearish)</label>
                                <input type="color" class="asset-down-color-picker" data-ticker="${ticker}" value="${settings.downColor || '#EF4444'}">
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Scale -->
                    <div class="control-card">
                        <label>Scale</label>
                        <div class="segmented-control asset-scale" data-ticker="${ticker}">
                            <button type="button" class="segment ${settings.scale === 'linear' ? 'active' : ''}" data-value="linear">Linear</button>
                            <button type="button" class="segment ${settings.scale === 'log' ? 'active' : ''}" data-value="log">Log</button>
                            <button type="button" class="segment ${settings.scale === 'percentage' ? 'active' : ''}" data-value="percentage">%</button>
                        </div>
                    </div>
                    
                    <!-- Price Axis -->
                    <div class="control-card">
                        <label>Price Axis</label>
                        <div class="segmented-control asset-price-axis" data-ticker="${ticker}">
                            <button type="button" class="segment ${settings.priceAxis === 'left' ? 'active' : ''}" data-value="left">Left</button>
                            <button type="button" class="segment ${settings.priceAxis === 'right' ? 'active' : ''}" data-value="right">Right</button>
                        </div>
                    </div>
                    
                    <!-- Time Axis -->
                    <div class="control-card">
                        <label>Time Axis</label>
                        <div class="segmented-control asset-time-axis" data-ticker="${ticker}">
                            <button type="button" class="segment ${settings.timeAxis === 'bottom' ? 'active' : ''}" data-value="bottom">Bottom</button>
                            <button type="button" class="segment ${settings.timeAxis === 'top' ? 'active' : ''}" data-value="top">Top</button>
                        </div>
                    </div>

                    <!-- Time Offset -->
                    <div class="control-card">
                        <label>Time Offset</label>
                        <div class="offset-control-wrapper" style="display: flex; gap: 8px; align-items: center;">
                            <select class="asset-offset-direction" data-ticker="${ticker}" style="padding: 4px; border-radius: 4px; border: 1px solid #333; background: #222; color: #fff;">
                                <option value="1" ${settings.offsetValue >= 0 ? 'selected' : ''}>Forward (+)</option>
                                <option value="-1" ${settings.offsetValue < 0 ? 'selected' : ''}>Backward (-)</option>
                            </select>
                            <input type="number" class="asset-offset-value" data-ticker="${ticker}" value="${Math.abs(settings.offsetValue || 0)}" min="0" style="width: 60px; padding: 4px; border-radius: 4px; border: 1px solid #333; background: #222; color: #fff;">
                            <select class="asset-offset-unit" data-ticker="${ticker}" style="flex: 1; padding: 4px; border-radius: 4px; border: 1px solid #333; background: #222; color: #fff;">
                                <option value="days" ${settings.offsetUnit === 'days' ? 'selected' : ''}>Days</option>
                                <option value="weeks" ${settings.offsetUnit === 'weeks' ? 'selected' : ''}>Weeks</option>
                                <option value="months" ${settings.offsetUnit === 'months' ? 'selected' : ''}>Months</option>
                                <option value="years" ${settings.offsetUnit === 'years' ? 'selected' : ''}>Years</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Attach event listeners
    attachCustomizationListeners();

    // Update hidden input with serialized settings
    updatePerAssetSettingsInput();
}

function attachCustomizationListeners() {
    // Remove Asset Listeners
    document.querySelectorAll('.remove-asset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const ticker = btn.dataset.ticker;
            removeTicker(ticker);
        });
    });

    // Chart type listeners
    document.querySelectorAll('.asset-chart-type').forEach(control => {
        const ticker = control.dataset.ticker;
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                assetSettings[ticker].chartType = e.target.dataset.value;
                updatePerAssetSettingsInput();
                // Re-render to show/hide candle interval selector
                renderCustomizationSections();
            }
        });
    });

    // Candle interval listeners
    document.querySelectorAll('.asset-candle-interval').forEach(control => {
        const ticker = control.dataset.ticker;
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                assetSettings[ticker].candleInterval = e.target.dataset.value;
                updatePerAssetSettingsInput();
            }
        });
    });

    // Color picker listeners
    document.querySelectorAll('.asset-color-picker').forEach(picker => {
        const ticker = picker.dataset.ticker;
        picker.addEventListener('input', (e) => {
            assetSettings[ticker].color = e.target.value;
            updatePerAssetSettingsInput();
        });
    });

    // Up color picker listeners
    document.querySelectorAll('.asset-up-color-picker').forEach(picker => {
        const ticker = picker.dataset.ticker;
        picker.addEventListener('input', (e) => {
            assetSettings[ticker].upColor = e.target.value;
            updatePerAssetSettingsInput();
        });
    });

    // Down color picker listeners
    document.querySelectorAll('.asset-down-color-picker').forEach(picker => {
        const ticker = picker.dataset.ticker;
        picker.addEventListener('input', (e) => {
            assetSettings[ticker].downColor = e.target.value;
            updatePerAssetSettingsInput();
        });
    });

    // Scale listeners
    document.querySelectorAll('.asset-scale').forEach(control => {
        const ticker = control.dataset.ticker;
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                assetSettings[ticker].scale = e.target.dataset.value;
                updatePerAssetSettingsInput();
            }
        });
    });

    // Price axis listeners
    document.querySelectorAll('.asset-price-axis').forEach(control => {
        const ticker = control.dataset.ticker;
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                assetSettings[ticker].priceAxis = e.target.dataset.value;
                updatePerAssetSettingsInput();
            }
        });
    });

    // Time axis listeners
    document.querySelectorAll('.asset-time-axis').forEach(control => {
        const ticker = control.dataset.ticker;
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                assetSettings[ticker].timeAxis = e.target.dataset.value;
                updatePerAssetSettingsInput();
            }
        });
    });

    // Offset Value listeners
    document.querySelectorAll('.asset-offset-value').forEach(input => {
        const ticker = input.dataset.ticker;
        input.addEventListener('input', (e) => {
            const container = input.closest('.offset-control-wrapper');
            const direction = parseInt(container.querySelector('.asset-offset-direction').value);
            const val = Math.abs(parseInt(e.target.value) || 0);
            assetSettings[ticker].offsetValue = val * direction;
            updatePerAssetSettingsInput();
        });
    });

    // Offset Direction listeners
    document.querySelectorAll('.asset-offset-direction').forEach(select => {
        const ticker = select.dataset.ticker;
        select.addEventListener('change', (e) => {
            const container = select.closest('.offset-control-wrapper');
            const val = Math.abs(parseInt(container.querySelector('.asset-offset-value').value) || 0);
            const direction = parseInt(e.target.value);
            assetSettings[ticker].offsetValue = val * direction;
            updatePerAssetSettingsInput();
        });
    });

    // Offset Unit listeners
    document.querySelectorAll('.asset-offset-unit').forEach(select => {
        const ticker = select.dataset.ticker;
        select.addEventListener('change', (e) => {
            assetSettings[ticker].offsetUnit = e.target.value;
            updatePerAssetSettingsInput();
        });
    });
}

function updatePerAssetSettingsInput() {
    const input = document.getElementById('perAssetSettings');
    input.value = JSON.stringify(assetSettings);
}

function renderAssets(category) {
    // Filter assets based on category, or show all if 'All' is selected
    const assets = category === 'All'
        ? assetData
        : assetData.filter(a => a.category === category);

    assetGrid.innerHTML = assets.map(asset => {
        // For economic indicators, show a clean version of the ticker
        let displayTicker = asset.ticker;
        if (asset.category === 'Economic') {
            displayTicker = asset.name.split(' ').slice(0, 2).join(' ');
        } else {
            displayTicker = asset.ticker.split('-')[0];
        }

        const isActive = selectedTickers.includes(asset.ticker) ? 'active' : '';

        return `
        <div class="asset-card ${isActive}" 
             data-ticker="${asset.ticker}" 
             data-name="${asset.name}">
             <div class="asset-icon">${asset.icon}</div>
             <div class="asset-ticker">${displayTicker}</div>
             <div class="asset-name">${asset.name}</div>
        </div>
    `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.asset-card').forEach(card => {
        card.addEventListener('click', () => {
            const ticker = card.dataset.ticker;
            const isMultiSelect = document.getElementById('multiSelectToggle').checked;

            if (isMultiSelect) {
                // Multi-Select Mode: Toggle selection
                if (selectedTickers.includes(ticker)) {
                    selectedTickers = selectedTickers.filter(t => t !== ticker);
                    card.classList.remove('active');
                } else {
                    selectedTickers.push(ticker);
                    card.classList.add('active');
                }
            } else {
                // Single Select Mode: Replace selection
                selectedTickers = [ticker];
                // Update visual state for all cards
                document.querySelectorAll('.asset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            }

            updateHiddenInputs();

            // Scroll to next section only on first selection (if single select or first of multi)
            if (selectedTickers.length === 1 && !isMultiSelect) {
                sectionTimeframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// Category Switching
categoryTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-tab')) {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderAssets(e.target.dataset.category);
    }
});

// Initialize with 'All'
// Sync selectedTickers with input values
if (tickerInput.value) {
    selectedTickers = [tickerInput.value];
    if (compareTickerInput.value) {
        const compares = compareTickerInput.value.split(',');
        selectedTickers = selectedTickers.concat(compares);
    }
} else {
    // Default fallback
    selectedTickers = ['AAPL'];
    updateHiddenInputs();
}
renderAssets('All');

// Search Logic
assetSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        return;
    }

    const matches = assetData.filter(asset =>
        asset.ticker.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        searchSuggestions.innerHTML = matches.map(asset => `
            <div class="suggestion-item" data-ticker="${asset.ticker}">
                <span class="suggestion-name">${asset.name}</span>
                <span class="suggestion-ticker">${asset.ticker}</span>
            </div>
        `).join('');
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.classList.remove('active');
    }
});

searchSuggestions.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
        const ticker = item.dataset.ticker;
        const isMultiSelect = document.getElementById('multiSelectToggle').checked;

        if (isMultiSelect) {
            if (!selectedTickers.includes(ticker)) {
                selectedTickers.push(ticker);
            }
        } else {
            selectedTickers = [ticker];
        }
        updateHiddenInputs();

        assetSearch.value = '';
        searchSuggestions.classList.remove('active');

        // Re-render to show active state if visible
        // Or find card and activate
        const card = document.querySelector(`.asset-card[data-ticker="${ticker}"]`);
        if (card) {
            if (!isMultiSelect) {
                document.querySelectorAll('.asset-card').forEach(c => c.classList.remove('active'));
            }
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // If not in current view, maybe switch category? 
            // For simplicity, just re-render 'All' to show it.
            document.querySelector('.cat-tab[data-category="All"]').click();
            setTimeout(() => {
                const newCard = document.querySelector(`.asset-card[data-ticker="${ticker}"]`);
                if (newCard) {
                    if (!isMultiSelect) {
                        document.querySelectorAll('.asset-card').forEach(c => c.classList.remove('active'));
                    }
                    newCard.classList.add('active');
                    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }

        if (selectedTickers.length === 1 && !isMultiSelect) {
            sectionTimeframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// --- Timeframe Logic ---
const periodToggle = document.getElementById('periodToggle');
const periodInput = document.getElementById('period');
const customDateContainer = document.getElementById('customDateContainer');

periodToggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        // Update UI
        periodToggle.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const value = e.target.dataset.value;
        periodInput.value = value;

        // Handle Custom Date
        if (value === 'custom') {
            customDateContainer.classList.remove('hidden');
        } else {
            customDateContainer.classList.add('hidden');
        }

        // Update allowed intervals in customization
        renderCustomizationSections();
        attachCustomizationListeners();
    }
});

// --- Customization Logic ---

// Helper for segmented controls
function setupSegmentedControl(controlId, inputId) {
    const control = document.getElementById(controlId);
    const input = document.getElementById(inputId);

    if (control && input) {
        control.addEventListener('click', (e) => {
            if (e.target.classList.contains('segment')) {
                control.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                input.value = e.target.dataset.value;
            }
        });
    }
}

setupSegmentedControl('primaryTypeControl', 'primaryType');

// Theme Control
const themeControl = document.getElementById('themeControl');
const styleInput = document.getElementById('style');
if (themeControl && styleInput) {
    themeControl.addEventListener('click', (e) => {
        const option = e.target.closest('.theme-option');
        if (option) {
            themeControl.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            styleInput.value = option.dataset.value;
        }
    });
}

// Background Color
const bgColorButtons = document.querySelectorAll('.bg-option');
const bgColorInput = document.getElementById('bgColor');

bgColorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        bgColorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bg = btn.dataset.bg;
        bgColorInput.value = bg;

        // Smart Axis Colors: Auto-switch to white if background is dark
        const darkBackgrounds = ['#000000', '#1C1C1E', '#000033'];
        const isDark = darkBackgrounds.includes(bg);

        const axisColor = isDark ? '#FFFFFF' : '#000000';
        const borderColor = isDark ? '#FFFFFF' : '#CCCCCC';

        const xAxisInput = document.querySelector('input[name="x_axis_color"]');
        const yAxisInput = document.querySelector('input[name="y_axis_color"]');
        const borderInput = document.querySelector('input[name="border_color"]');

        if (xAxisInput) xAxisInput.value = axisColor;
        if (yAxisInput) yAxisInput.value = axisColor;
        if (borderInput) borderInput.value = borderColor;
    });
});

// Output Format Control
const formatControl = document.getElementById('formatControl');
const outputFormatInput = document.getElementById('outputFormat');

if (formatControl) {
    const segments = formatControl.querySelectorAll('.segment');
    segments.forEach(seg => {
        seg.addEventListener('click', () => {
            segments.forEach(s => s.classList.remove('active'));
            seg.classList.add('active');
            outputFormatInput.value = seg.dataset.value;
        });
    });
}

// Candle Outline Control
const edgeStyleControl = document.getElementById('edgeStyleControl');
const edgeStyleInput = document.getElementById('edgeStyle');
const customEdgeColorContainer = document.getElementById('customEdgeColorContainer');

if (edgeStyleControl) {
    const segments = edgeStyleControl.querySelectorAll('.segment');
    segments.forEach(seg => {
        seg.addEventListener('click', () => {
            segments.forEach(s => s.classList.remove('active'));
            seg.classList.add('active');
            edgeStyleInput.value = seg.dataset.value;

            if (seg.dataset.value === 'custom') {
                customEdgeColorContainer.classList.remove('hidden');
            } else {
                customEdgeColorContainer.classList.add('hidden');
            }
        });
    });
}

// --- Templates & History Logic ---

function collectCurrentConfig() {
    // Derive primary chart type from first asset
    let primaryChartType = 'candle';
    if (selectedTickers.length > 0 && assetSettings[selectedTickers[0]]) {
        primaryChartType = assetSettings[selectedTickers[0]].chartType;
    }

    return {
        ticker: tickerInput.value,
        compare_ticker: compareTickerInput.value,
        period: periodInput.value,
        chart_type: primaryChartType,
        style: document.getElementById('style').value,
        bg_color: document.getElementById('bgColor').value,
        per_asset_settings: JSON.stringify(assetSettings)
    };
}

// Save Template
const saveTemplateBtn = document.getElementById('saveTemplateBtn');
const templateNameInput = document.getElementById('templateNameInput');
const templatesList = document.getElementById('templatesList');

saveTemplateBtn.addEventListener('click', () => {
    const name = templateNameInput.value.trim();
    if (!name) {
        alert('Please enter a template name');
        return;
    }

    const config = collectCurrentConfig();
    const template = {
        id: Date.now(),
        name: name,
        config: config,
        timestamp: new Date().toISOString()
    };

    let templates = JSON.parse(localStorage.getItem('chartTemplates') || '[]');
    templates.push(template);
    localStorage.setItem('chartTemplates', JSON.stringify(templates));

    templateNameInput.value = '';
    renderTemplates();
});

function renderTemplates() {
    const templates = JSON.parse(localStorage.getItem('chartTemplates') || '[]');
    if (templates.length === 0) {
        templatesList.innerHTML = '<div class="empty-state">No templates saved yet</div>';
        return;
    }

    templatesList.innerHTML = templates.map(t => `
        <div class="template-item">
            <span class="template-name">${t.name}</span>
            <div class="template-actions">
                <button class="template-btn load" onclick="loadTemplate(${t.id})">Load</button>
                <button class="template-btn delete" onclick="deleteTemplate(${t.id})">✕</button>
            </div>
        </div>
    `).join('');
}

window.loadTemplate = function (id) {
    const templates = JSON.parse(localStorage.getItem('chartTemplates') || '[]');
    const template = templates.find(t => t.id === id);
    if (!template) return;

    applyConfig(template.config);
};

window.deleteTemplate = function (id) {
    let templates = JSON.parse(localStorage.getItem('chartTemplates') || '[]');
    templates = templates.filter(t => t.id !== id);
    localStorage.setItem('chartTemplates', JSON.stringify(templates));
    renderTemplates();
};

function applyConfig(config) {
    // Apply logic to restore state from config
    // This is complex because we need to restore selectedTickers, assetSettings, etc.
    // For MVP, we'll just reload the page with query params or similar?
    // Or manually set inputs and trigger events.

    // 1. Set Tickers
    tickerInput.value = config.ticker;
    compareTickerInput.value = config.compare_ticker;

    selectedTickers = [config.ticker];
    if (config.compare_ticker) {
        selectedTickers = selectedTickers.concat(config.compare_ticker.split(','));
    }

    // 2. Set Period
    periodInput.value = config.period;
    periodToggle.querySelectorAll('.toggle-btn').forEach(btn => {
        if (btn.dataset.value === config.period) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // 3. Set Style
    document.getElementById('style').value = config.style;
    themeControl.querySelectorAll('.theme-option').forEach(opt => {
        if (opt.dataset.value === config.style) opt.classList.add('active');
        else opt.classList.remove('active');
    });

    // 4. Set BG
    document.getElementById('bgColor').value = config.bg_color;
    bgColorButtons.forEach(btn => {
        if (btn.dataset.bg === config.bg_color) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // 5. Restore Asset Settings
    if (config.per_asset_settings) {
        assetSettings = JSON.parse(config.per_asset_settings);
    }

    updateHiddenInputs();
    renderAssets('All'); // Refresh grid
}

renderTemplates();

// History Logic
function addToHistory() {
    const config = collectCurrentConfig();
    const item = {
        id: Date.now(),
        ticker: config.ticker,
        type: config.chart_type,
        timestamp: new Date().toISOString(),
        config: config
    };

    let history = JSON.parse(localStorage.getItem('chartHistory') || '[]');
    history.unshift(item);
    if (history.length > 20) history.pop();
    localStorage.setItem('chartHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('chartHistory') || '[]');

    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-state">No history yet</div>';
        return;
    }

    historyList.innerHTML = history.map(h => `
        <div class="history-item" onclick="loadTemplate(${h.id})"> <!-- We can reuse loadTemplate logic if we store it similarly -->
            <div class="history-info">
                <span class="history-ticker">${h.ticker}</span>
                <span class="history-meta">${h.type} • ${new Date(h.timestamp).toLocaleTimeString()}</span>
            </div>
            <button class="history-load-btn">Load</button>
        </div>
    `).join('');

    // Hack: We need a way to load history items. 
    // Let's temporarily store history items in a way loadTemplate can access, or make a separate loadHistory function.
    // For now, let's just make loadTemplate work with history items if we pass the object directly? No, onclick passes ID.
    // Let's attach listeners instead.

    historyList.querySelectorAll('.history-item').forEach((el, index) => {
        el.addEventListener('click', () => {
            applyConfig(history[index].config);
            sectionChart.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
renderHistory();


// --- Chart Generation ---
chartForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoading = generateBtn.querySelector('.btn-loading');
    generateBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    placeholder.classList.remove('hidden');
    chartImage.classList.add('hidden');
    document.getElementById('chartActions').classList.add('hidden');

    const formData = new FormData(chartForm);

    // Explicitly handle checkboxes for Axes & Border
    // FormData ignores unchecked boxes, so we must set them manually
    const showX = chartForm.querySelector('[name="show_x_axis"]');
    const showY = chartForm.querySelector('[name="show_y_axis"]');
    const showBorder = chartForm.querySelector('[name="show_border"]');

    if (showX) formData.set('show_x_axis', showX.checked);
    if (showY) formData.set('show_y_axis', showY.checked);
    if (showBorder) formData.set('show_border', showBorder.checked);

    // Handle Custom Date
    if (periodInput.value === 'custom') {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        if (startDate) formData.append('start', startDate);
        if (endDate) formData.append('end', endDate);
    }

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Display Chart
        // Check format. If SVG, we might need to handle differently if we want it interactive?
        // For now, standard img tag works for SVG too.
        const format = data.format || 'png';

        // Always use img tag with proper data URL
        const mimeType = format === 'svg' ? 'image/svg+xml' :
            format === 'pdf' ? 'application/pdf' :
                format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/png';

        chartImage.src = `data:${mimeType};base64,${data.image}`;
        chartImage.classList.remove('hidden');
        chartImage.style.display = 'block';
        placeholder.classList.add('hidden');

        if (format === 'svg') {
            // SVG - no special handling needed, img tag handles it
            console.log('SVG loaded via data URL');
        }

        // Show download button by revealing the chartActions wrapper
        const chartActions = document.getElementById('chartActions');
        if (chartActions) {
            chartActions.classList.remove('hidden');
        }

        // Scroll to chart
        sectionChart.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add to History
        addToHistory();
    } catch (err) {
        alert('Error generating chart: ' + err.message);
    } finally {
        generateBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
});

// --- Economic Data (Horizontal Ticker) ---


// --- Download Logic ---
window.downloadGeneratedChart = function (format) {
    const form = document.getElementById('chartForm');
    const formData = new FormData(form);

    // Add download flag and format (Use set to overwrite existing hidden input)
    formData.set('download', 'true');
    formData.set('output_format', format);

    // Explicitly handle checkboxes for Axes & Border (same as main submit)
    // FormData ignores unchecked boxes, so we must set them manually
    const showX = form.querySelector('[name="show_x_axis"]');
    const showY = form.querySelector('[name="show_y_axis"]');
    const showBorder = form.querySelector('[name="show_border"]');

    if (showX) formData.set('show_x_axis', showX.checked);
    if (showY) formData.set('show_y_axis', showY.checked);
    if (showBorder) formData.set('show_border', showBorder.checked);

    // Add custom dates if needed (same logic as main submit)
    const periodInput = document.getElementById('period');
    if (periodInput.value === 'custom') {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        if (startDate) formData.append('start', startDate);
        if (endDate) formData.append('end', endDate);
    }

    // Show loading state on button
    const btn = document.getElementById('genDownloadTrigger');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Downloading...</span>';
    btn.disabled = true;

    // Submit via fetch to get blob
    fetch('/generate', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Download failed');
        })
        .then(blob => {
            // Create download link with proper blob type
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Get ticker for filename
            const ticker = document.getElementById('ticker').value || 'chart';
            const timestamp = new Date().toISOString().split('T')[0];
            a.download = `${ticker}_Chart_${timestamp}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            alert('Download failed: ' + err.message);
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
};

// Toggle Download Menu
const downloadTrigger = document.getElementById('genDownloadTrigger');
const downloadMenu = document.getElementById('genDownloadMenu');

if (downloadTrigger && downloadMenu) {
    downloadTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        downloadMenu.classList.remove('active');
    });
}
