<?php

use App\Http\Controllers\CsvController;
use App\Mail\NotificacionAlumnado;
use App\Models\Csv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
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
Route::post('/register', [AuthController::class, 'register']);

/* Route::post('/logout', [AuthController::class, 'logout']); */

Route::group(['middleware' => ['auth:api', 'role:secretaria,jefatura']], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/su', function () {
        return 'hola';
    });
    Route::post('/subirCsv', [CsvController::class, 'subirCsv']);
});
Route::group(['middleware' => ['auth:api', 'role:jefatura']], function(){
    Route::get('/su2', function () {
        // Lista de emails
        $mails = Csv::pluck('DESTINO_EMAIL')->unique();
        // Envío de emails
        foreach ($mails as $mail){
            Mail::to($mail)->send(new NotificacionAlumnado((Csv::where('DESTINO_EMAIL', '=', $mail)->first())->DESTINO_NOM));
        }
        /* Mail::to('3333325256dfsdg.arg@gmail.com')->send(new NotificacionAlumnado("Juan Pablo")); */
        dd($mail);
    });
});

/* Route::group(['middleware' => ['role:jefatura']], function () {
    // aquí van las rutas que requieren autenticación y permisos de administrador
    
}); */

/* Route::get('/pruebas', function(Request $request){
    $user = $request->user()->rol->nombre;
    User::where('id', '=', 4)->first();
    return $user;
    dd($user->rol); 
}); */

/* Route::get('/admin', function () {
    return 'hola';
})->middleware('auth', 'role:admin'); */



/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 */

?>