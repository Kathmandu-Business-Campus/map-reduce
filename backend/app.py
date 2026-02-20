"""
Word Counter Application using Map-Reduce Pattern
Entry point for the Flask application.
"""
from flask import Flask, request, jsonify, send_from_directory
import os
import logging

from map_reduce_analyzer import MapReduceAnalyzer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__, static_folder='static', static_url_path='/')

# Initialize analyzer
analyzer = MapReduceAnalyzer()


@app.route("/api/analyze", methods=["POST"])
def analyze():
    """REST API endpoint for text analysis."""
    try:
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        text = request_data.get("text", "").strip()
        
        if not text:
            return jsonify({
                "unique": [],
                "repeated": [],
                "counts": {},
                "totalWords": 0,
                "uniqueWordCount": 0,
                "repeatedWordCount": 0
            }), 200
        
        # Run analysis
        result = analyzer.analyze(text)
        
        # Convert counts dict for JSON serialization
        result['counts'] = {str(k): v for k, v in result['counts'].items()}
        
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path: str):
    """Serve static frontend files with SPA routing."""
    static_folder = app.static_folder
    
    if static_folder is None:
        logger.error("Static folder not configured")
        return "Static folder not configured", 500
    
    full_path = os.path.join(static_folder, path)
    
    # Serve specific file if it exists
    if path and os.path.exists(full_path):
        return send_from_directory(static_folder, path)
    
    # Serve index.html for all other routes (SPA)
    return send_from_directory(static_folder, "index.html")


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({"error": "Resource not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)