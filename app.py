from flask import Flask, render_template, request, send_file, jsonify, session
import io
import base64
import json
import os
from generate_chart import generate_chart_buffer
from economic_data import get_economic_data

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev_key_for_charts')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_chart():
    try:
        # Basic Parameters
        ticker = request.form.get('ticker', 'AAPL')
        period = request.form.get('period', '1y')
        interval = request.form.get('interval', '1d')
        chart_type = request.form.get('chart_type', 'line')
        style = request.form.get('style', 'standard')
        
        # Advanced Parameters
        title = request.form.get('title')
        primary_color = request.form.get('primary_color')
        bg_color = request.form.get('bg_color')
        grid_opacity = float(request.form.get('grid_opacity', 0.1))
        
        # Comparison
        compare_ticker = request.form.get('compare_ticker')
        compare_color = request.form.get('compare_color')
        compare_type = request.form.get('compare_type', 'line')
        
        # Resolution
        resolution = request.form.get('resolution', '1080p')
        start = request.form.get('start')
        end = request.form.get('end')

        # Per-Asset Settings
        per_asset_settings = None
        per_asset_settings_json = request.form.get('per_asset_settings')
        if per_asset_settings_json:
            try:
                per_asset_settings = json.loads(per_asset_settings_json)
            except (json.JSONDecodeError, ValueError) as e:
                print(f"Error parsing per-asset settings: {e}")
        
        # Output Format
        output_format = request.form.get('output_format', 'png').lower()
        if output_format not in ['png', 'svg', 'jpg', 'pdf']:
            output_format = 'png'

        # Legacy/Primary Type Logic
        primary_type = request.form.get('primary_type')
        final_primary_type = primary_type if primary_type else chart_type

        # Edge Style
        edge_style = request.form.get('edge_style', 'standard')
        custom_edge_color = request.form.get('custom_edge_color')
        
        # Up/Down Colors
        up_color = request.form.get('up_color')
        down_color = request.form.get('down_color')

        # Check for download flag
        is_download = request.form.get('download') == 'true'

        buf = generate_chart_buffer(
            ticker, period, interval, start, end, resolution, style, title, 
            chart_type=final_primary_type, 
            compare_ticker=compare_ticker,
            primary_color=primary_color,
            compare_color=compare_color,
            compare_type=compare_type,
            bg_color=bg_color,
            grid_opacity=grid_opacity,
            per_asset_settings=per_asset_settings,
            output_format=output_format,
            up_color=up_color,
            down_color=down_color,
            edge_style=edge_style,
            custom_edge_color=custom_edge_color,
            # New Customization Params
            x_axis_color=request.form.get('x_axis_color'),
            y_axis_color=request.form.get('y_axis_color'),
            show_x_axis=request.form.get('show_x_axis') != 'false',
            show_y_axis=request.form.get('show_y_axis') != 'false',
            show_border=request.form.get('show_border') != 'false',
            border_color=request.form.get('border_color')
        )
        
        if is_download:
            # Return file directly for download
            buf.seek(0)
            mimetype = 'image/png'
            if output_format == 'svg': mimetype = 'image/svg+xml'
            elif output_format == 'pdf': mimetype = 'application/pdf'
            elif output_format in ['jpg', 'jpeg']: mimetype = 'image/jpeg'
            
            filename = f"{ticker}_{period}.{output_format}"
            return send_file(buf, mimetype=mimetype, as_attachment=True, download_name=filename)
        
        # Store image data in session (Legacy/Fallback)
        img_bytes = buf.getvalue()
        session['chart_image'] = base64.b64encode(img_bytes).decode('utf-8')
        session['chart_ticker'] = ticker
        
        # Return JSON response for AJAX
        return jsonify({
            'status': 'success',
            'image': session['chart_image'],
            'ticker': ticker,
            'format': output_format
        })

    except Exception as e:
        print(f"Error generating chart: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400

@app.route('/economic-data')
def economic_data():
    try:
        data = get_economic_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET', 'POST'])
def handle_history():
    # Simple in-memory history for demo/deployment (or use session)
    if 'history' not in session:
        session['history'] = []
        
    if request.method == 'POST':
        item = request.json
        # Add timestamp
        import datetime
        item['timestamp'] = datetime.datetime.now().isoformat()
        # Add to start of list
        session['history'].insert(0, item)
        # Keep last 50
        session['history'] = session['history'][:50]
        session.modified = True
        return jsonify({'status': 'success'})
        
    return jsonify(session['history'])

@app.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    session['history'] = []
    session.modified = True
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
