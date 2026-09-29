<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// A plain HTML page that shows the current user, so the panel can be seen and a login checked.
Route::get('/', function (Request $request) {
    $user = e($request->user()->email ?? 'guest');

    return <<<HTML
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Workbench</title>
        </head>
        <body>
            <h1>Workbench</h1>
            <p>Logged in as: <span id="current-user">{$user}</span></p>
            <label>An app text field <input id="app-field" type="text"></label>
        </body>
        </html>
        HTML;
});
