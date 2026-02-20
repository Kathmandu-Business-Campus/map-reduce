# Word Counter - Map-Reduce Example

A practical implementation of the Map-Reduce pattern for counting word frequencies in text using Docker, Flask, and interactive visualizations.

---

## 📚 What is Map-Reduce?

Map-Reduce is a programming model for processing large datasets in parallel across distributed systems. It consists of three phases:

### **The Three Phases:**

1. **MAP Phase** - Transforms input into key-value pairs
2. **SHUFFLE & SORT Phase** - Groups pairs by key
3. **REDUCE Phase** - Combines values for each key

### **In This Example:**

The application counts word frequencies in text:

- **MAP:** Extract each word and create `(word, 1)` pairs
  - Input: `"hello world hello"`
  - Output: `[("hello", 1), ("world", 1), ("hello", 1)]`

- **SHUFFLE:** Group all 1s by word
  - Input: `[("hello", 1), ("world", 1), ("hello", 1)]`
  - Output: `{"hello": [1, 1], "world": [1]}`

- **REDUCE:** Sum counts per word
  - Input: `{"hello": [1, 1], "world": [1]}`
  - Output: `{"hello": 2, "world": 1}`

---

## ✅ Advantages of Map-Reduce

| Advantage | Description |
|-----------|-------------|
| **Scalability** | Processes massive datasets across multiple machines |
| **Parallelism** | Independent tasks run simultaneously |
| **Fault Tolerance** | If a node fails, tasks can be reassigned |
| **Simplicity** | Developer focuses on map/reduce logic, framework handles distribution |
| **Cost-Effective** | Uses commodity hardware, not expensive servers |
| **Language Agnostic** | Works with any programming language |

---

## ❌ Disadvantages of Map-Reduce

| Disadvantage | Description |
|--------------|-------------|
| **Latency** | High overhead; slow for small datasets or real-time processing |
| **Complexity** | Difficult to express non-map-reduce problems |
| **Memory Intensive** | Shuffle phase requires storing all data in memory |
| **Disk I/O Heavy** | Frequent reads/writes to disk between phases |
| **Iterative Processing** | Hard to chain multiple map-reduce jobs efficiently |
| **Learning Curve** | Requires rethinking algorithms in map-reduce terms |

---

## 🏗️ How This Example Works

### **Frontend (React + TypeScript/Vite)**
- React components manage state and UI updates
- User enters text in TextInput component which triggers debounced API calls
- Results displayed in 3 tab components: ListView, ChartView (Chart.js), CloudView (WordCloud.js)
- TypeScript provides type safety and better IDE support

### **Backend (Python/Flask)**
- Receives text via POST request to `/api/analyze`
- Executes map-reduce pipeline (map → shuffle → reduce)
- Returns unique words, repeated words, and total counts as JSON

### **Docker (Multi-stage Build)**
- **Build Stage:** Compiles React + TypeScript frontend with Node.js/TypeScript/Vite
- **Runtime Stage:** Python backend serves both REST API and static frontend files
- Frontend is pre-built during Docker build, so runtime container requires only Python

---

## 🚀 How to Run This Example

### **Step 1: Install Docker**
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) for your OS.

### **Step 2: Navigate to Project**
```powershell
git clone https://github.com/test/test "map-reduce-word-count"
cd "map-reduce-word-count"
```

### **Step 3: Build the Docker Image**
```powershell
docker build -t wordcount .
```

This builds your image with:
- Frontend compiled with Node.js/Vite
- Python dependencies installed
- Single optimized image (~300MB)

### **Step 4: Run the Container**
```powershell
docker run -p 5000:5000 wordcount
```

- Maps container port 5000 → local port 5000
- Starts Flask server inside container

### **Step 5: Open Browser**
Navigate to **http://localhost:5000**

You'll see:
- Text input area
- 3 visualization tabs: List, Bar Chart, Word Cloud
- Configurable "Top N Words" slider

### **Step 6: Test It**
Paste example text:
```
The quick brown fox jumps over the lazy dog.
The fox is quick and the dog is lazy.
```

Watch the analysis appear in real-time with word frequencies and visualizations!

### **To Stop:**
Press `Ctrl+C` in the terminal

---

## ⚡ Quick Start (One Command)

```powershell
docker build -t wordcount . && docker run -p 5000:5000 wordcount
```

---

## 📁 Project Structure

```
map-reduce-word-count/
├── dockerfile                 # Multi-stage: Node+TypeScript builds React, Python runs backend
├── docker-compose.yml         # Docker Compose configuration (alternative runtime)
├── backend/
│   ├── app.py                # Flask entry point - routes only, no business logic
│   ├── map_reduce_analyzer.py # MapReduceAnalyzer class implementing map-reduce pattern
│   ├── text_processor.py      # TextProcessor utility for text normalization
│   └── requirements.txt       # Python dependencies
└── frontend/
    ├── index.html            # React root element
    ├── package.json          # Node.js dependencies (React, TypeScript, Vite, etc.)
    ├── tsconfig.json         # TypeScript configuration
    ├── vite.config.ts        # Vite + React plugin configuration
    ├── postcss.config.js     # Tailwind CSS configuration
    ├── tailwind.config.js    # Tailwind theming
    └── src/
        ├── main.tsx          # React entry point
        ├── App.tsx           # Main App component with state management
        ├── style.css         # Tailwind CSS imports
        └── components/
            ├── TextInput.tsx         # Text input component
            ├── ConfigBar.tsx         # Top-N config component
            ├── TabNavigation.tsx     # Tab switcher component
            ├── Summary.tsx           # Statistics dashboard
            ├── ListView.tsx          # List view visualization
            ├── BarChartView.tsx      # Horizontal bar chart
            ├── PieChartView.tsx      # Pie chart visualization
            ├── DoughnutChartView.tsx # Doughnut chart visualization
            └── LoadingSpinner.tsx    # Animated loading indicator
```

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Chart.js, react-chartjs-2
- **Backend:** Python 3.12, Flask, Gunicorn (OOP architecture with separate analyzer & processor classes)
- **Containerization:** Docker, Multi-stage builds
- **Visualization:** Bar charts, Pie charts, Doughnut charts, Statistics dashboard with loading states

---

## 📖 Code Flow & Architecture

### Frontend (React + TypeScript)
1. App component manages state (text, topN, activeTab, isLoading)
2. User enters text → TextInput component onChange handler
3. Debounced API call to `/api/analyze` (300ms delay)
4. LoadingSpinner displays while processing
5. Response updates analysisData state
6. Summary component displays 4 key metrics
7. Active tab renders: ListView, BarChartView, PieChartView, or DoughnutChartView

### Backend (OOP Architecture)
1. **app.py** (Entry point)
   - Flask setup and routing only
   - No business logic
   - Imports MapReduceAnalyzer and delegates to it

2. **map_reduce_analyzer.py** (MapReduceAnalyzer class)
   - map_phase(): Transforms words into (word, 1) pairs
   - shuffle_and_sort(): Groups by word key
   - reduce_phase(): Sums counts per word
   - analyze(): Orchestrates complete pipeline

3. **text_processor.py** (TextProcessor utility)
   - extract_words(): Normalizes text and extracts words
   - Uses regex for word boundary detection

---

## 💻 Local Development

### **Frontend Development**
```bash
cd frontend
npm install
npm run dev
```
Opens http://localhost:5173 with React Hot Module Replacement (HMR)

### **Backend Development**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Runs Flask dev server on http://localhost:5000

### **Building for Production**
```bash
# Frontend
cd frontend
npm run build
# Creates dist/ folder with optimized React build

# Docker multi-stage build (includes frontend compilation)
docker build -t wordcount .
docker run -p 5000:5000 wordcount
```

---

## 🧪 Testing

Test inputs with varying word frequencies:

**Simple:** `hello hello world`  
**Complex:** Copy-paste an article or book excerpt  
**Edge case:** Enter special characters, numbers, punctuation

---

## 📝 Notes

- **React + TypeScript:** Modern component-based architecture with type safety, all in TSX
- **Backend OOP Architecture:** 
  - Separation of concerns: app.py (routing), MapReduceAnalyzer (logic), TextProcessor (utilities)
  - No business logic in app.py - purely Flask setup and route handling
  - Easy to test and extend individual components
- **Docker image optimization:** Multi-stage builds ensure no Node.js in final image
- **Fast UI:** Removed WordCloud (was slow), replaced with Pie & Doughnut charts
- **Loading states:** Animated spinner while analyzing text
- **Summary dashboard:** 4 key metrics displayed above visualizations
- **API debouncing:** 300ms delay in App.tsx to limit backend requests
- **Case-insensitive counting:** TextProcessor converts text to lowercase
- **Component composition:** Single responsibility with dedicated components for each feature
