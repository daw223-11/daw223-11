<?php

use App\Http\Controllers\CsvController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\TablonAnunciosController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::get('/obtenerTablonAnuncios/{tablonAnuncios}', [TablonAnunciosController::class, 'obtenerTablonAnuncios']);


// Rutas a las que solo puede 
Route::group(['middleware' => ['auth:api', 'role:secretaria,jefatura']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/subirCsv', [CsvController::class, 'subirCsv']);
    Route::post('/actualizarTablonAnuncios/{tablonAnuncios}', [TablonAnunciosController::class, 'actualizarTablonAnuncios']);
});

// Rutas a las que solo puede acceder el rol jefatura
Route::group(['middleware' => ['auth:api', 'role:jefatura']], function () {

    Route::post('/enviarEmails', [EmailController::class, 'enviarEmails']);
    Route::post('/register', [AuthController::class, 'register']);

});

?>