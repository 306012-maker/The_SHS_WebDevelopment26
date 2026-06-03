<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PastelPaper | Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="index.php">🎨 PastelPaper</a>
            <div class="navbar-nav ms-auto flex-row gap-3">
                <a class="nav-link active fw-bold text-primary" href="index.php">Home</a>
                <a class="nav-link text-dark" href="macbook.html">MacBook Canvas</a>
                <a class="nav-link text-dark" href="iphone.html">iPhone Canvas</a>
                <a class="nav-link text-dark" href="ipad.html">iPad Canvas</a>

                <ul class="navbar-nav">
    <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="weather.html">Weather & Packing Planner</a></li>
    <li class="nav-item"><a class="nav-link" href="dashboard.html">Travel Dashboard</a></li>
</ul>


<ul class="navbar-nav">
    <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="weather.html">Weather & Packing Planner</a></li>
    <li class="nav-item"><a class="nav-link" href="dashboard.html">Travel Dashboard</a></li>
</ul>
            </div>
        </div>
    </nav>

    <div class="container text-center my-5">
        <h1 class="display-4 fw-bold mb-3">Design Your Digital Space</h1>
        <p class="lead text-muted mb-4">Create beautiful minimalist pastel wallpapers.</p>
        <a class="btn btn-primary btn-lg mb-5" href="macbook.html">Start Layout Editor</a>

        <div class="card shadow-sm mx-auto p-4" style="max-width: 600px;">
            <h3 class="fw-bold mb-3">💡 Current Inspiration Weather</h3>
            <div class="input-group">
                <input type="text" id="city-input" class="form-control" placeholder="Enter City (e.g. Shakopee)">
                <button class="btn btn-dark" onclick="fetchWeather()">Get Weather Theme</button>
            </div>
            <div id="weather-display" class="mt-3"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>