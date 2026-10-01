<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use function Orchestra\Testbench\workbench_path;

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

// A form with each field type that a fill handles, and a log of the input and change events of the form.
Route::get('/form', fn () => <<<'HTML'
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Workbench form</title>
    </head>
    <body>
        <h1>Workbench form</h1>
        <form id="form">
            <div hidden>
                <label>Hidden name <input type="text" id="hidden-name" name="name"></label>
            </div>
            <label>Name <input type="text" id="name" name="name"></label>
            <label>Email <input type="email" name="email"></label>
            <label>Password <input type="password" name="password"></label>
            <label>Age <input type="number" name="age"></label>
            <label>Birthday <input type="date" name="birthday"></label>
            <label>Bio <textarea name="bio"></textarea></label>
            <label>Country
                <select name="country">
                    <option value="">Choose</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="mx">Mexico</option>
                </select>
            </label>
            <label>Languages
                <select name="languages[]" multiple>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </label>
            <fieldset>
                <legend>Plan</legend>
                <label><input type="radio" name="plan" value="free"> Free</label>
                <label><input type="radio" name="plan" value="pro"> Pro</label>
                <label><input type="radio" name="plan" value="team"> Team</label>
            </fieldset>
            <fieldset>
                <legend>Roles</legend>
                <label><input type="checkbox" name="roles[]" value="admin"> Admin</label>
                <label><input type="checkbox" name="roles[]" value="editor"> Editor</label>
                <label><input type="checkbox" name="roles[]" value="viewer"> Viewer</label>
            </fieldset>
            <label><input type="checkbox" name="terms" value="1"> Accept the terms</label>
            <label>Avatar <input type="file" name="avatar"></label>
            <label>Nickname <input type="text" id="nickname"></label>
            <label>First phone <input type="text" id="phone-first" name="phone"></label>
            <label>Second phone <input type="text" id="phone-second" name="phone"></label>
        </form>
        <ol id="events"></ol>
        <script>
            const log = document.getElementById('events');
            ['input', 'change'].forEach((type) => {
                document.getElementById('form').addEventListener(type, (event) => {
                    const item = document.createElement('li');
                    item.textContent = `${type} ${event.target.name || event.target.id}`;
                    log.append(item);
                });
            });
        </script>
    </body>
    </html>
    HTML);

// A form of controlled React inputs. The bundle is built with `npm run build:workbench`.
Route::get('/react-form', fn () => <<<'HTML'
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Workbench React form</title>
    </head>
    <body>
        <h1>Workbench React form</h1>
        <div id="root"></div>
        <script src="/react-form.js"></script>
    </body>
    </html>
    HTML);

Route::get('/react-form.js', fn () => response()->file(workbench_path('resources/dist/react-form.js'), ['Content-Type' => 'text/javascript']));
