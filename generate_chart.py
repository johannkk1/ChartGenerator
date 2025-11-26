import io
import argparse
import matplotlib
matplotlib.use('Agg')
import matplotlib.colors
import matplotlib.pyplot as plt
import mplfinance as mpf
import yfinance as yf
import pandas as pd
import numpy as np
import sys
import warnings
warnings.filterwarnings("ignore")
import matplotlib.lines as mlines
import matplotlib.patches as mpatches

def parse_arguments():
    parser = argparse.ArgumentParser(description="Generate high-res financial charts for DaVinci Resolve.")
    parser.add_argument("--ticker", type=str, required=True, help="Stock/Crypto ticker (e.g., AAPL, BTC-USD)")
    parser.add_argument("--period", type=str, default="1y", help="Data period (e.g., 1y, 6mo, max)")
    parser.add_argument("--start", type=str, default=None, help="Start date (YYYY-MM-DD)")
    parser.add_argument("--end", type=str, default=None, help="End date (YYYY-MM-DD)")
    parser.add_argument("--interval", type=str, default="1d", help="Data interval (e.g., 1d, 1h)")
    parser.add_argument("--resolution", type=str, choices=["1080p", "4k", "custom"], default="1080p", help="Output resolution")
    parser.add_argument("--style", type=str, choices=["default", "pink"], default="default", help="Chart style")
    parser.add_argument("--title", type=str, default=None, help="Chart title")
    parser.add_argument("--output", type=str, default=None, help="Output filename (default: ticker_chart.png)")
    return parser.parse_args()

def get_data(ticker, period, interval, start=None, end=None):
    # print(f"Downloading data for {ticker}...")
    
    # Check if this is an on-chain metric ticker
    onchain_tickers = ['BTC.D', 'USDT.D', 'TOTAL2', 'TOTAL3', 'OTHERS.D']
    if ticker in onchain_tickers:
        try:
            from onchain_data import get_onchain_metric_data
            df = get_onchain_metric_data(ticker, period)
            if df is not None and not df.empty:
                # Data is already indexed by Date, just return it
                return df
            else:
                raise ValueError(f"No on-chain data available for {ticker}")
        except Exception as e:
            print(f"Error fetching on-chain data: {e}")
            raise ValueError(f"Failed to fetch on-chain data for {ticker}: {str(e)}")
    
            print(f"Error fetching on-chain data: {e}")
            raise ValueError(f"Failed to fetch on-chain data for {ticker}: {str(e)}")
    
    # Check if this is an economic data ticker (FRED)
    from economic_data import FRED_SERIES, fetch_fred_historical
    # Invert the dictionary to check values (tickers)
    fred_tickers = list(FRED_SERIES.values())
    
    if ticker in fred_tickers:
        print(f"DEBUG: Detected economic ticker {ticker}")
        try:
            df = fetch_fred_historical(ticker, period=period, interval=interval)
            if df is not None and not df.empty:
                # Economic data only has 'Close' - add synthetic OHLC for candle chart compatibility
                if 'Open' not in df.columns:
                    df['Open'] = df['Close']
                    df['High'] = df['Close']
                    df['Low'] = df['Close']
                    df['Volume'] = 0
                return df
            else:
                raise ValueError(f"No economic data available for {ticker}")
        except Exception as e:
            print(f"Error fetching economic data: {e}")
            raise ValueError(f"Failed to fetch economic data for {ticker}: {str(e)}")

    # Standard yfinance download for regular tickers
    try:
        import traceback
        
        # Default interval if not provided
        if interval is None:
            interval = '1d'
            
        print(f"DEBUG: Downloading {ticker} with period={period}, interval={interval}")
        if start:
            df = yf.download(ticker, start=start, end=end, interval=interval, progress=False)
        else:
            df = yf.download(ticker, period=period, interval=interval, progress=False)
        
        print(f"DEBUG: Downloaded {ticker}. Type: {type(df)}")
        if df is not None:
            print(f"DEBUG: df.shape: {df.shape}")
            print(f"DEBUG: df.columns: {df.columns}")
            print(f"DEBUG: df.head(): {df.head()}")

        if df is None or df.empty:
            raise ValueError(f"No data returned for {ticker}")

        # Handle MultiIndex columns if present (common in recent yfinance versions)
        if isinstance(df.columns, pd.MultiIndex):
            print("DEBUG: Handling MultiIndex columns")
            df.columns = df.columns.get_level_values(0)
            print(f"DEBUG: New columns: {df.columns}")
            
        # Basic cleaning
        # Ensure columns exist
        required_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
             # Try to be flexible if Volume is missing (e.g. some indices)
             if 'Volume' in missing_cols and len(missing_cols) == 1:
                 df['Volume'] = 0
             else:
                 raise ValueError(f"Missing columns {missing_cols} for {ticker}")

        df = df[required_cols]
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.dropna()
        
        # Ensure numeric types
        for col in required_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')
            
        df = df.dropna()
        
        if df.empty:
            raise ValueError("No data found for the given parameters.")
            
        return df
    except Exception as e:
        print(f"Error downloading data for {ticker}: {e}")
        traceback.print_exc()
        raise e

def get_chart_style(style_name="classic", custom_color=None, up_color=None, down_color=None, grid_opacity=0.1, line_width=1.0,
                    x_axis_color=None, y_axis_color=None, show_x_axis=True, show_y_axis=True, show_border=True, border_color=None):
    """
    Returns mplfinance style based on preset or custom colors.
    up_color: Color for bullish (up) candles
    down_color: Color for bearish (down) candles
    custom_color: Legacy single color parameter (applies to both up and edge/wick)
    """
    styles = {
        "pink": {
            "up": "#FF80A0", "down": "#FF80A0",
            "edge": "#FF80A0", "wick": "#FF80A0",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },
        "blue": {
            "up": "#5AB9EA", "down": "#5AB9EA",
            "edge": "#5AB9EA", "wick": "#5AB9EA",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },
        "purple": {
            "up": "#A78BFA", "down": "#A78BFA",
            "edge": "#A78BFA", "wick": "#A78BFA",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },
        "green": {
            "up": "#34D399", "down": "#34D399",
            "edge": "#34D399", "wick": "#34D399",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },
        "orange": {
            "up": "#FB923C", "down": "#FB923C",
            "edge": "#FB923C", "wick": "#FB923C",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },
        "gold": {
            "up": "#FCD34D", "down": "#FCD34D",
            "edge": "#FCD34D", "wick": "#FCD34D",
            "label": "#E0E0E0", "tick": "#E0E0E0",
            "axes_edge": "#606060"
        },

        "classic": {
            "up": "#26A69A", "down": "#EF5350",
            "edge": "#26A69A", "wick": "#26A69A",
            "label": "#000000", "tick": "#000000",
            "axes_edge": "#000000"
        },
        "dark_mode": {
            "up": "#00E676", "down": "#FF5252",
            "edge": "#00E676", "wick": "#00E676",
            "label": "#FFFFFF", "tick": "#FFFFFF",
            "axes_edge": "#FFFFFF"
        },
        "neon": {
            "up": "#00FF00", "down": "#FF00FF",
            "edge": "#00FF00", "wick": "#00FF00",
            "label": "#00FF00", "tick": "#00FF00",
            "axes_edge": "#00FF00"
        },
        "apple_2026": {
            "up": "#34C759", "down": "#FF3B30",
            "edge": "inherit", "wick": "inherit",
            "label": "#86868B", "tick": "#86868B",
            "axes_edge": "#808080"
        },
        "default": {
            "up": "#10B981", "down": "#EF4444",  # Green (up) and Red (down)
            "edge": "inherit", "wick": "inherit",
            "label": "#000000", "tick": "#000000",
            "axes_edge": "#CCCCCC"
        }
    }
    
    # Default to classic if style not found
    style = styles.get(style_name, styles["classic"])
    
    # Override with custom up/down colors if provided
    if up_color:
        style["up"] = up_color
        # Don't override edge/wick - let them stay as 'inherit'
    
    if down_color:
        style["down"] = down_color
    
    # Legacy custom_color support (applies to up, edge, wick)
    if custom_color and not up_color:
        style["up"] = custom_color
        style["edge"] = custom_color
        style["wick"] = custom_color
        # Only override down if it wasn't white/transparent and down_color wasn't explicitly set
        if not down_color and style["down"] not in ["#FFFFFF", "white"]:
            style["down"] = custom_color

    # Calculate grid color with opacity
    # Use a simple base color and control opacity via RC params
    base_grid = "#808080"
    if style_name in ["dark_mode", "neon"]:
        base_grid = "#505050"
    elif style_name == "apple_2026":
        base_grid = "#E5E5E7"
        
    # If grid_opacity is 0, disable grid entirely
    grid_opacity = max(0.0, min(1.0, float(grid_opacity)))
    if grid_opacity <= 0:
        grid_color = "none"
        gridstyle = ""
    else:
        # Use base color as string, opacity controlled by RC params
        grid_color = base_grid
        gridstyle = "-"

    # Prepare RC params
    rc_params = {
        "figure.facecolor": "none",
        "axes.facecolor": "none",
        "axes.labelcolor": style["label"],
        "xtick.color": x_axis_color if x_axis_color else style["tick"],
        "ytick.color": y_axis_color if y_axis_color else style["tick"],
        "axes.edgecolor": border_color if border_color else style["axes_edge"],
        "axes.linewidth": 1.0,
        "font.family": "sans-serif",
        "grid.alpha": grid_opacity,
        "lines.linewidth": line_width,
    }

    # Axis Visibility Logic
    if not show_x_axis:
        rc_params["xtick.bottom"] = False
        rc_params["xtick.labelbottom"] = False
        rc_params["xtick.major.size"] = 0
        
    if not show_y_axis:
        rc_params["ytick.left"] = False
        rc_params["ytick.labelleft"] = False
        rc_params["ytick.major.size"] = 0
        
    if not show_border:
        rc_params["axes.spines.bottom"] = False
        rc_params["axes.spines.top"] = False
        rc_params["axes.spines.left"] = False
        rc_params["axes.spines.right"] = False

    return mpf.make_mpf_style(
        base_mpl_style="seaborn-v0_8-darkgrid",
        marketcolors=mpf.make_marketcolors(
            up=style["up"], down=style["down"],
            edge=style["edge"], wick=style["wick"]
        ),
        gridstyle=gridstyle,
        gridcolor=grid_color,
        rc=rc_params
    )

def create_notice_image(text, width=1920, height=1080, style_name="default", output_format="png"):
    """
    Creates an image with a centered notice message.
    """
    # Get style colors
    style = get_chart_style(style_name)
    bg_color = style.get("axes.facecolor", "#0E1117")
    text_color = style.get("label", "#E0E0E0")
    
    # Create figure
    dpi = 100
    fig = matplotlib.pyplot.figure(figsize=(width/dpi, height/dpi), dpi=dpi)
    
    # Set background color
    fig.patch.set_facecolor(bg_color)
    
    # Add text
    ax = fig.add_subplot(111)
    ax.set_facecolor(bg_color)
    ax.axis('off')
    
    # Add centered text
    ax.text(0.5, 0.5, text, 
            horizontalalignment='center',
            verticalalignment='center',
            transform=ax.transAxes,
            color=text_color,
            fontsize=24,
            fontweight='bold')
            
    # Save to buffer
    buf = io.BytesIO()
    if output_format == 'svg':
        fig.savefig(buf, format='svg', facecolor=bg_color, edgecolor='none')
    else:
        fig.savefig(buf, format='png', facecolor=bg_color, edgecolor='none')
    buf.seek(0)
    matplotlib.pyplot.close(fig)
    
    return buf

def apply_date_offset(df, value, unit):
    """
    Applies a time offset to the DataFrame index.
    value: Number of units to offset (can be negative)
    unit: 'days', 'weeks', 'months', 'years'
    """
    if not value or value == 0:
        return df
    
    try:
        if unit == 'days':
            offset = pd.DateOffset(days=value)
        elif unit == 'weeks':
            offset = pd.DateOffset(weeks=value)
        elif unit == 'months':
            offset = pd.DateOffset(months=value)
        elif unit == 'years':
            offset = pd.DateOffset(years=value)
        else:
            return df
            
        print(f"Applying offset: {value} {unit}")
        df.index = df.index + offset
        return df
    except Exception as e:
        print(f"Error applying offset: {e}")
        return df

def generate_chart_buffer(ticker, period="1y", interval="1d", start=None, end=None, 
                          resolution="1080p", style="default", title=None, chart_type="line", compare_ticker=None,
                          primary_color=None, compare_color=None, compare_type="line", bg_color=None,
                          grid_opacity=0.1, per_asset_settings=None, output_format="png",
                          up_color=None, down_color=None, edge_style="standard", custom_edge_color=None,
                          x_axis_color=None, y_axis_color=None, show_x_axis=True, show_y_axis=True, show_border=True, border_color=None):
    
    # Default line width
    line_width = 1.5
    print(f"DEBUG: generate_chart_buffer called with up_color={up_color}, x_axis_color={x_axis_color}")
    
    # Extract settings for primary ticker
    primary_settings = {}
    if per_asset_settings and ticker in per_asset_settings:
        primary_settings = per_asset_settings[ticker]
        chart_type = primary_settings.get('chartType', chart_type)
        primary_color = primary_settings.get('color', primary_color)
        # Extract candlestick colors if present
        up_color = primary_settings.get('upColor', up_color)
        down_color = primary_settings.get('downColor', down_color)
        # Use candleInterval if available and type is candle-like, otherwise use global interval
        if chart_type in ['candle', 'ohlc', 'hollow_and_filled']:
            interval = primary_settings.get('candleInterval', interval)
            
        # Extract Offset
        offset_value = primary_settings.get('offsetValue', 0)
        offset_unit = primary_settings.get('offsetUnit', 'weeks')
    
    print(f"Generating chart for {ticker} with interval {interval}, type {chart_type}, up={up_color}, down={down_color}")

    # Fetch Primary Data
    try:
        df = get_data(ticker, period, interval, start, end)
    except ValueError as e:
        print(f"Generating notice image for error: {e}")
        return create_notice_image("Insufficient data for this timeframe.\nPlease choose a shorter timeframe.", style_name=style)
    except Exception as e:
        print(f"Unexpected error fetching data: {e}")
        return create_notice_image(f"Error: {str(e)}", style_name=style)

    # Apply Scale to Primary Data
    # First apply offset if any
    if primary_settings:
        df = apply_date_offset(df, offset_value, offset_unit)

    primary_scale = primary_settings.get('scale', 'linear')
    if primary_scale == 'percentage':
        # Normalize to percentage change from start
        first_close = df['Close'].iloc[0]
        if first_close != 0:
            df = (df - df.iloc[0]) / df.iloc[0] * 100
    elif primary_scale == 'log':
        # Log scale handled by plot argument usually, but for consistency with overlays we might need care.
        # mpf.plot supports yscale='log'
        pass

    # Axis Positioning for Primary
    primary_price_axis = primary_settings.get('priceAxis', 'left')
    ylabel_position = primary_price_axis
    
    # Check if this is an economic ticker and set default color if not set
    from economic_data import FRED_SERIES
    fred_tickers = list(FRED_SERIES.values())
    if ticker in fred_tickers and not primary_color:
        primary_color = '#007AFF'  # Blue for economic indicators
    
    # Time Axis (Top/Bottom) - mpf doesn't support x-axis on top easily via arguments.
    # We might need to manipulate axes after plotting.
    primary_time_axis = primary_settings.get('timeAxis', 'bottom')

    # Comparison Data & Overlays
    addplot = []
    legend_items = [] # List of (label, color)
    
    # Add primary to legend
    legend_items.append((ticker, primary_color if primary_color else 'black'))

    if compare_ticker:
        tickers_to_compare = compare_ticker if isinstance(compare_ticker, list) else [compare_ticker]
        
        # Color cycle
        overlay_colors = ['#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#FFCC00', '#00C7BE']
        if compare_color:
            overlay_colors = [compare_color] + overlay_colors

        for i, comp_ticker in enumerate(tickers_to_compare):
            try:
                # Settings
                comp_settings = {}
                if per_asset_settings and comp_ticker in per_asset_settings:
                    comp_settings = per_asset_settings[comp_ticker]
                
                comp_type = comp_settings.get('chartType', compare_type)
                comp_color = comp_settings.get('color', overlay_colors[i % len(overlay_colors)])
                comp_interval = comp_settings.get('candleInterval', interval) # Default to primary interval
                comp_scale = comp_settings.get('scale', 'linear')
                comp_price_axis = comp_settings.get('priceAxis', 'right') # Default opposite to typical primary
                comp_offset_value = comp_settings.get('offsetValue', 0)
                comp_offset_unit = comp_settings.get('offsetUnit', 'weeks')
                
                # Fetch Data
                print(f"Fetching overlay {comp_ticker} with interval {comp_interval}")
                comp_df = get_data(comp_ticker, period, comp_interval, start, end)
                
                if not comp_df.empty:
                    # Apply Offset BEFORE reindexing
                    comp_df = apply_date_offset(comp_df, comp_offset_value, comp_offset_unit)

                    # Align index
                    comp_df = comp_df.reindex(df.index, method='nearest')
                    
                    # Apply Scale
                    if comp_scale == 'percentage':
                        first_val = comp_df['Close'].iloc[0]
                        if first_val != 0:
                            comp_df['Close'] = (comp_df['Close'] - first_val) / first_val * 100
                    
                    # Log scale for overlay? 
                    # If primary is log, usually whole chart is log. Mixing log and linear is hard.
                    # We'll assume if user wants log, they set it on primary or we rely on yscale='log' affecting all?
                    # Actually secondary_y has its own scale.
                    
                    # Determine secondary_y
                    # If primary is left, and overlay is right -> secondary_y=True
                    # If overlay wants same side as primary, secondary_y=False?
                    # mpf logic: secondary_y=True puts it on right.
                    is_secondary = (comp_price_axis == 'right')
                    
                    print(f"Adding overlay {comp_ticker}: color={comp_color}, type={comp_type}, axis={comp_price_axis}")
                    ap = mpf.make_addplot(comp_df['Close'], color=comp_color, width=1.5, secondary_y=is_secondary, type=comp_type)
                    addplot.append(ap)
                    legend_items.append((comp_ticker, comp_color))
                    
            except Exception as e:
                print(f"Error adding comparison for {comp_ticker}: {e}")

    # Resolution settings
    if resolution == "4k":
        figsize = (19.2, 10.8)
        dpi = 200
    elif resolution == "custom":
        figsize = (15.66, 10.8)
        dpi = 100
    else: # 1080p
        figsize = (19.2, 10.8)
        dpi = 100 

    # Theme / Style Handling
    axisoff = False
    if style == 'minimalistic':
        axisoff = True
        style_name = 'classic' # Simple base
    elif style == 'aesthetic':
        style_name = 'apple_2026'
    elif style == 'standard':
        style_name = 'default'
    else:
        style_name = style # Fallback to existing logic

    # Background
    is_transparent = bg_color == "transparent"
    fig_bgcolor = "none" if is_transparent else (bg_color if bg_color else "none")
    
    # Plot Arguments
    plot_kwargs = dict(
        type=chart_type,
        style=get_chart_style(style_name, custom_color=primary_color, up_color=up_color, down_color=down_color, 
                              grid_opacity=grid_opacity, line_width=line_width,
                              x_axis_color=x_axis_color, y_axis_color=y_axis_color,
                              show_x_axis=show_x_axis, show_y_axis=show_y_axis,
                              show_border=show_border, border_color=border_color),
        volume=False,
        figsize=figsize,
        datetime_format='%b %Y',
        xrotation=0,
        axisoff=axisoff,
        ylabel='',
        ylabel_lower='',
        returnfig=True, # Important for legend
    )
    
    if primary_scale == 'log':
        plot_kwargs['yscale'] = 'log'

    if chart_type == 'line' and primary_color:
        plot_kwargs['linecolor'] = primary_color

    if chart_type == 'area':
        plot_kwargs['type'] = 'line'
        if primary_color:
            plot_kwargs['linecolor'] = primary_color
        plot_kwargs['fill_between'] = dict(y1=df['Close'].values, y2=df['Close'].min(), alpha=0.3)
    
    if title:
        plot_kwargs['title'] = title
    
    if addplot:
        plot_kwargs['addplot'] = addplot

    # Apply background to style rc
    if not is_transparent and bg_color:
        import copy
        modified_style = copy.deepcopy(plot_kwargs["style"])
        if hasattr(modified_style, 'rc'):
            modified_style.rc['figure.facecolor'] = bg_color
            modified_style.rc['axes.facecolor'] = bg_color
        plot_kwargs["style"] = modified_style

    # Generate Plot
    try:
        fig, axlist = mpf.plot(df, **plot_kwargs)
        
        # Handle Axis Positions
        # axlist[0] is the main axis
        main_ax = axlist[0]
        
        # Price Axis (Left/Right)
        if primary_price_axis == 'left':
            main_ax.yaxis.tick_left()
            main_ax.yaxis.set_label_position("left")
        else:
            main_ax.yaxis.tick_right()
            main_ax.yaxis.set_label_position("right")
            
        # Time Axis (Top/Bottom)
        if primary_time_axis == 'top':
            main_ax.xaxis.tick_top()
            main_ax.xaxis.set_label_position('top')
        else:
            main_ax.xaxis.tick_bottom()
            main_ax.xaxis.set_label_position('bottom')
        
        # Add Legend
        # Create custom handles
        handles = []
        labels = []
        for name, color in legend_items:
            # Create a line handle for the legend
            line = mlines.Line2D([], [], color=color, linewidth=2, label=name)
            handles.append(line)
            labels.append(name)
            
        # Add legend to the figure
        # Position: Bottom center, outside the plot
        fig.legend(handles=handles, labels=labels, loc='lower center', ncol=len(handles), frameon=False, fontsize='large', bbox_to_anchor=(0.5, 0.02))
        
        # Adjust layout to make room for legend
        plt.subplots_adjust(bottom=0.15)
        # Save to buffer
        buf = io.BytesIO()
        
        print(f"DEBUG: Saving chart with output_format={output_format}")
        
        # Choose format based on output_format parameter
        if output_format == 'svg':
            # Save as SVG for infinite zoom with ultra-sharp quality
            fig.savefig(buf, format='svg', transparent=is_transparent, 
                       facecolor=fig_bgcolor if not is_transparent else 'none', 
                       bbox_inches='tight')
        else:
            # Save as PNG (default)
            fig.savefig(buf, dpi=dpi, format='png', transparent=is_transparent, 
                       facecolor=fig_bgcolor if not is_transparent else 'none', 
                       bbox_inches='tight')
        
        buf.seek(0)
        plt.close(fig)
        return buf
        
    except Exception as e:
        print(f"Error generating chart: {e}")
        import traceback
        traceback.print_exc()
        return create_notice_image(f"Error generating chart: {str(e)}", style_name=style_name, output_format=output_format)

def main():
    args = parse_arguments()
    
    print(f"Generating chart for {args.ticker}...")
    try:
        buf = generate_chart_buffer(args.ticker, args.period, args.interval, args.start, args.end,
                                    args.resolution, args.style, args.title)
        
        # Output filename
        output_filename = args.output if args.output else f"{args.ticker}_{args.period}.png"
        
        with open(output_filename, "wb") as f:
            f.write(buf.getbuffer())
            
        print(f"Success! Chart saved to {output_filename}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
