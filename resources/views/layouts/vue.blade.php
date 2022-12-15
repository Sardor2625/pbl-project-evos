<!doctype html>
<html lang="en">
<head>
    <title>EVOS PBL</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="/vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet"/><!-- v6.2.1 free -->

    <script src="/vendor/jquery/jquery-3.2.1.slim.min.js"></script><!-- v3.2.1 slim -->
    <script src="/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script><!-- v5.2 -->

    <link href="/assets/css/pricing.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">

    @vite(['resources/js/app.js'])

</head>
<body>

    <div id="app">
        <main-app></main-app>
    </div>

</body>
</html>
